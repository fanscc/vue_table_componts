<template>
  <div class="fe-doubleTime">
    <el-form-item :label="title + ':'" :label-width="labelWidth">
      <el-date-picker
        ref="input"
        v-model="defaultValue"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :default-time="['00:00:00', '23:59:59']"
        :value-format="format"
        :type="dateType"
        :disabled="disabled"
        :picker-options="dataOptions"
        class="fe-double-data-picker-input-content"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
    },
    format: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss"
    },
    dateType: {
      type: String,
      default: "daterange"
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: [String, Array]
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
      defaultValue: []
    };
  },
  watch: {
    defaultValue(val) {
      this.$emit("input", val);
    }
    // value(val) {
    //   this.defaultValue = val || [];
    // }
  },
  created() {
    if (this.value) {
      this.defaultValue = this.value;
    }
  }
};
</script>
