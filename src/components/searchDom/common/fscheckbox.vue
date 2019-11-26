<template>
  <div class="fe-checked">
    <el-form-item
      v-if="mode === 'checkbox'"
      :label="title + ':'"
      :label-width="labelWidth"
    >
      <div>
        <el-checkbox-group v-model="defaultValue">
          <el-checkbox
            v-for="item in dataOptions"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>
    <el-form-item
      v-if="mode === 'radio'"
      :label="title + ':'"
      :label-width="labelWidth"
    >
      <div>
        <el-radio-group v-model="defaultValue">
          <el-radio
            v-for="item in dataOptions"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import request from "@/utils/http";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    // 默认参数
    staticParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 用来判断是复选还是单选
    mode: {
      type: String,
      default: "checkbox" // radio // 是单选
    },
    path: {
      type: String,
      default: ""
    },
    staticArr: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [String, Number, Array],
      default: ""
    },
    mapData: {
      type: String,
      default: ""
    },
    paramsMaping: {
      type: Object,
      default() {
        return {
          label: "label",
          value: "value"
        };
      }
    },
    labelWidth: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultValue: this.mode === "checkbox" ? [] : "",
      dataOptions: []
    };
  },
  watch: {
    defaultValue(val) {
      this.$emit("input", val);
    },
    staticArr(val) {
      this.dealData(val);
    },
    value() {
      // 不加此判断条件的话，当value为0时，会被置为""
      if (this.defaultValue !== this.value) {
        this.defaultValue = this.value ? this.value : "";
      }
    }
  },
  created() {},
  mounted() {
    if (this.path) {
      this.getData();
    } else {
      this.dealData(this.staticArr);
    }
  },
  methods: {
    getData(objs = {}) {
      let endParams = {};
      endParams = Object.assign({}, this.staticParams, objs);
      return request
        .get(this.path, {
          params: { ...endParams },
          noloding: true
        })
        .then(res => {
          if (res.success) {
            if (this.mapData) {
              this.dealData(res.model[this.mapData]);
            } else if (res.code === undefined) {
              this.dealData(res);
            } else {
              this.dealData(res.model);
            }
          }
        });
    },
    dealData(data) {
      data.map(item => {
        item.label = item[this.paramsMaping.label];
        item.value = item[this.paramsMaping.value];
      });
      this.dataOptions = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.fe-checked {
  .el-form-item {
    margin-bottom: 4px !important;
  }
}
</style>
