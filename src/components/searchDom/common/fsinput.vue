<template>
  <div class="fe-input">
    <el-form-item
      :label="title + ':'"
      :label-width="labelWidth">
      <el-input
        ref="input"
        v-model="defaultValue"
        class="fe-input-content"
        :placeholder="placeholder"
        style="width:200px;"
        clearable />
    </el-form-item>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      labelWidth: {
        type: String,
        default: "",
      },
      value: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        defaultValue: "",
      };
    },
    watch: {
      value() {
        this.defaultValue = this.value ? this.value : "";
      },
      defaultValue(val) {
        this.$emit("input", val);
      },
    },
  };
</script>
