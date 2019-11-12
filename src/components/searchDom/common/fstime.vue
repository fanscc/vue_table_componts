<template>
  <div>
    <el-form-item :label="title + ':'" :label-width="labelWidth">
      <el-date-picker
        v-model="defaultValue"
        :placeholder="placeholder"
        :picker-options="dataOptions"
        :format="formatEnum[dateType]"
        :value-format="valueFormat"
        :type="dateType"
        :disabled="disabled"
      />
    </el-form-item>
  </div>
</template>

<script>
const formatEnum = {
  date: "yyyy 年 MM 月 dd 日",
  dateTime: "yyyy 年 MM 月 dd 日 HH时：mm分：ss秒"
};
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    // format,valueFormat：两种格式--年月日，年月日时分秒
    // format:yyyy 年 MM 月 dd 日,yyyy 年 MM 月 dd 日
    format: {
      type: String,
      default: "yyyy 年 MM 月 dd 日"
    },
    valueFormat: { type: String, default: "yyyy-MM-dd" },

    dateType: {
      type: String,
      default: "date"
    },
    placeholder: {
      type: String,
      default: "请选择时间"
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: ""
    }
  },
  data() {
    this.dataOptions = {
      // disabledDate: this.setDateRange,
      firstDayOfWeek: 1
    };
    return {
      defaultValue: "",
      formatEnum
    };
  },
  watch: {
    defaultValue(val) {
      this.$emit("input", val);
    },
    value: {
      handler(val) {
        this.defaultValue = val || "";
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
