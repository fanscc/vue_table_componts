<template>
  <div class="fe-input">
    <el-form-item :label="title + ':'" :label-width="labelWidth">
      <el-select
        ref="input"
        v-model="defaultValue"
        style="width: 200px"
        :placeholder="placeholder"
        class="fe-select-content"
        filterable
        remote
        :remote-method="remoteMethod"
        clearable
        :loading="loading"
      >
        <el-option
          v-for="item in dataOptions"
          :key="item.value"
          v-bind="item"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import request from "@/utils/http";

export default {
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    labelWidth: {
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
    path: {
      type: String,
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
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      defaultValue: "",
      dataOptions: []
    };
  },
  watch: {
    value() {
      this.defaultValue = this.value || this.value === 0 ? this.value : "";
    },
    defaultValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    remoteMethod(val) {
      if (val !== "") {
        this.getData({ key: val });
      } else {
        this.dataOptions = [];
      }
    },
    getData(obj = {}) {
      this.loading = true;
      let endParams = {};
      endParams = Object.assign({}, this.staticParams, obj);
      return request
        .get(this.path, {
          params: { ...endParams }
        })
        .then(res => {
          if (res.success) {
            if (this.mapData) {
              this.dealData(res.model[this.mapData]);
            } else {
              this.dealData(res.model);
            }
          } else {
            this.$message.error("获取下拉框数据错误");
          }
        })
        .finally(() => {
          this.loading = false;
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
