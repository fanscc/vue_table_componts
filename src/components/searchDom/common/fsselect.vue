<template>
  <div class="fe-selcet">
    <el-form-item :label="title + ':'" :label-width="labelWidth">
      <el-select
        ref="input"
        v-model="defaultValue"
        style="width: 200px"
        :placeholder="placeholder"
        class="fe-select-content"
        :clearable="clearable"
        data-options
        :multiple="multiple"
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
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean
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
    parent: {
      type: String, // 对应上级联动的name
      default: ""
    },
    sublevel: {
      type: String, // 对应下级联动的name
      default: ""
    },
    name: {
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
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      defaultValue: this.multiple ? [] : "",
      dataOptions: []
    };
  },
  watch: {
    defaultValue(val) {
      this.$emit("input", val);
      // 判断有联动的子级,如果有联动子级则通知它从新获取数据
      if (this.sublevel) {
        this.clearChild(val);
      }
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
    if (this.path && !this.parent) {
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
    },
    // 联动的更改父级的时候清空子级
    clearChild(val) {
      let guanliancompent = "";
      guanliancompent = this.$parent.$children.find(
        item => item.parent === this.name
      );
      if (guanliancompent) {
        guanliancompent.defaultValue = guanliancompent.multiple ? [] : "";
        guanliancompent.dataOptions = [];
        if (val !== "") {
          const objs = {};
          objs[this.name] = val;
          guanliancompent.getData(objs);
        }
      }
    }
  }
};
</script>
