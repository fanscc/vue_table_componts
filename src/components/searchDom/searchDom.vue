<template>
  <div class="search_conten">
    <el-form
      ref="ruleForm"
      :model="value"
      :label-width="labelWidth"
      class="demo-ruleForm"
    >
      <div
        v-for="(item, $index) in searchFrom"
        :key="$index"
        class="display_inline"
        :style="{ display: noshow ? 'none' : 'inline-block' }"
      >
        <component
          :is="getComponentName(item)"
          v-if="item.type !== 'slot'"
          ref="formComponents"
          v-model="value[item.name]"
          v-bind="item"
        />
        <slot v-else :name="item.slotName" :data="item" />
      </div>
      <p style="display:inline-block;margin:0 0 0 10px;">
        <slot />
        <el-button @click="noshow = !noshow">
          {{ noshow ? "显示" : "隐藏" }}
        </el-button>
      </p>
    </el-form>
  </div>
</template>

<script>
import fsInput from "./common/fsinput.vue";
import fsSelect from "./common/fsselect.vue";
import fsTime from "./common/fstime.vue";
import fsDoubleTime from "./common/fsdoubletime.vue";
import fsmultiTime from "./common/fsmultiTime.vue";
import fuzzySearch from "./common/fuzzySearch.vue";
import request from "@/utils/http";

export default {
  components: {
    fsInput,
    fsSelect,
    fsTime,
    fsDoubleTime,
    fsmultiTime,
    fuzzySearch
  },
  props: {
    // 控制布局的数组对象
    searchFrom: {
      type: Array,
      default: () => []
    },
    // valueClone整个查询条件的对象
    value: {
      type: Object,
      default: () => {}
    },
    // 查询条件处的label宽度
    labelWidth: {
      type: String,
      default: "80px"
    },
    // 请求接口的url主要是下拉框的接口
    path: {
      type: String,
      default: ""
    },
    // 请求的方法
    methodRequest: {
      type: String,
      default: "get"
    },
    // 默认的请求参数
    staticParams: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  data() {
    return {
      noshow: false // 控制搜索条件是否显示
    };
  },

  created() {
    this.dealQueryData(this.searchFrom);
    if (this.path) {
      this.getEmuns();
    }
  },
  methods: {
    dealQueryData(val) {
      const model = {};
      if (val) {
        val.forEach(item => {
          model[item.name] = item.value || item.value === 0 ? item.value : "";
        });
        const params = Object.assign({}, this.value, model);
        this.$emit("input", params);
      }
    },
    getEmuns() {
      console.log(this.staticParams);
      request({
        method: this.methodRequest,
        url: this.path,
        params: this.request_method === "get" ? { ...this.staticParams } : "",
        data: this.request_method === "get" ? "" : this.staticParams,
        noloding: true
      })
        .then(res => {
          if (res.success || res.success === undefined) {
            const enumData = res.model || res;
            this.searchFrom.map(item => {
              if (item.inputModel === "fsSelect" && !item.defaultArr) {
                this.$set(
                  item,
                  "staticArr",
                  item.mapName ? enumData[item.mapName] : enumData
                );
                // 设置默认值
                if (item.valueName) {
                  if (!item.staticArr) return;
                  if (item.paramsMaping) {
                    item.staticArr.forEach(i => {
                      if (i[item.paramsMaping.label] === item.valueName) {
                        this.$set(
                          this.value,
                          item.name,
                          i[item.paramsMaping.value]
                        );
                      }
                    });
                  } else {
                    item.staticArr.forEach(i => {
                      if (i.label === item.valueName) {
                        this.$set(
                          this.value,
                          item.name,
                          i[item.paramsMaping.value]
                        );
                      }
                    });
                  }
                }
              }
            });
            this.$emit("accomplish");
          }
        })
        .catch(() => {
          this.$emit("accomplish");
        });
    },
    getComponentName(item) {
      const componentName = item.inputModel;
      return componentName;
    }
  }
};
</script>

<style lang="scss" scoped>
.display_inline {
  display: inline-block;
}
</style>
