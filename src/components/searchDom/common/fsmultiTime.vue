<template>
  <div class="fe-double-data-picker">
    <el-form-item
      :label="title + ':'"
      :label-width="labelWidth">
      <el-date-picker
        ref="input"
        v-model="defaultValue[0]"
        style="width: 200px;"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-format="format"
        :type="dateType"
        :picker-options="dataOptionsStart"
        class="fe-single-data-picker-input-content" />
    </el-form-item>
    <span class="spanTyle">至</span>
    <el-form-item class="endTimeDom">
      <el-date-picker
        ref="input"
        v-model="defaultValue[1]"
        style="width: 200px;"
        :placeholder="placeholder"
        :disabled="disabled"
        :value-format="format"
        :type="dateType"
        :picker-options="dataOptionsEnd"
        class="fe-single-data-picker-input-content" />
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: "FeSingleDatePicker",
    props: {
      format: {
        type: String,
        default: "yyyy-MM-dd",
      },
      placeholder: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
      },
      value: {
        type: [Array, String],
        default() {
          return ["", ""];
        },
      },
      title: {
        type: String,
        default: '',
      },
      before: {
        // 代表结束日期是当前日期
        type: Boolean,
      },
      after: {
        // 代表开始时间是当前日期
        type: Boolean,
      },
      lastAllMonth: {
        // 代表上月全月
        type: Boolean,
      },
      lastFirstToToday: {
        // 代表上月第一天-今天
        type: Boolean,
      },
      timeLag: {
        // 代表默认的开始时间跟结束时间相隔多少
        type: Number,
        default: 2592000000, // 默认30天
      },
      labelWidth: {
        type: String,
        default: "",
      },
    },
    data() {
      this.dataOptionsStart = {
        disabledDate: this.setDateRangeStart,
        firstDayOfWeek: 1,
      };
      this.dataOptionsEnd = {
        disabledDate: this.setDateRangeEnd,
        firstDayOfWeek: 1,
      };
      return {
        defaultValue: ["", ""],
      };
    },
    computed: {
      dateType() {
        if (this.format.length === 7) {
          return "month";
        }
        if (this.format.length < 12) {
          return "date";
        }
        return "datetime";
      },
    },
    watch: {
      value: {
        handler(val) {
          this.defaultValue = val || [];
          this.timeCycle();
        },
        deep: true,
        immediate: true,
      },
      defaultValue(val) {
        this.$emit("input", val);
      },
    },
    created() {
    // this.defaultValue = this.value;
    // this.timeCycle();
    },
    methods: {
      setDateRangeStart(time) {
        if (!this.defaultValue[1]) return false;
        const endTime = new Date(this.defaultValue[1]).getTime();
        // return time.getTime() > endTime || time.getTime() > new Date().getTime();
        return time.getTime() > endTime;
      },
      setDateRangeEnd(time) {
        if (!this.defaultValue[0]) return false;
        const startTime = new Date(this.defaultValue[0]).getTime();
        // return (
        //   time.getTime() < startTime || time.getTime() > new Date().getTime()
        // );
        return time.getTime() < startTime - 86400000;
      },
      timeCycle() {
        // 双层时间控件
        if (!this.value) {
          const newTime = new Date();
          const newfullTime = `${newTime.getFullYear()}-${newTime.getMonth()
            + 1}-${newTime.getDate()}`;
          if (this.after) {
            const othernewTime = new Date(
              new Date().getTime() - 0 + this.timeLag,
            );
            this.defaultValue[0] = newfullTime;
            this.defaultValue[1] = `${othernewTime.getFullYear()}-${othernewTime.getMonth()
              + 1}-${othernewTime.getDate()}`;
          } else if (this.before) {
            const othernewTime = new Date(new Date().getTime() - this.timeLag);
            this.defaultValue[1] = newfullTime;
            this.defaultValue[0] = `${othernewTime.getFullYear()}-${othernewTime.getMonth()
              + 1}-${othernewTime.getDate()}`;
          } else if (this.lastAllMonth) {
            //  当前月份的上一个月第一天
            this.defaultValue[0] = `${newTime.getFullYear()}-${newTime.getMonth()}-${1}`;
            // 当前月份的上一个月最后一天
            const lastMonthFinsh = new Date(
              new Date(
                newTime.getFullYear(),
                newTime.getMonth() + 1,
                1,
              ).getTime()
                - 24 * 3600 * 1000,
            );
            this.defaultValue[1] = `${lastMonthFinsh.getFullYear()
            }-${
              lastMonthFinsh.getMonth()
            }-${
              lastMonthFinsh.getDate()}`;
          } else if (this.lastFirstToToday) {
            this.defaultValue[0] = `${newTime.getFullYear()}-${newTime.getMonth()}-${1}`;
            this.defaultValue[1] = newfullTime;
          }
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fe-double-data-picker {
  .spanTyle {
    display: inline-block;
    margin-right: 8px;
    margin-left: 8px;
  }
  .el-form-item {
    display: inline-block;
  }
  .endTimeDom {
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
