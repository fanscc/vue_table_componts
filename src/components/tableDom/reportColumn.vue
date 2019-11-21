<template>
  <el-table-column
    v-if="type === 'print'"
    :label="title"
    :prop="name"
    :align="align"
    :width="width"
    :fixed="fixed"
  >
    <template slot-scope="scope">
      <span v-if="scope" class="print_check" />
    </template>
  </el-table-column>

  <el-table-column
    v-else-if="type === 'selection'"
    :type="type"
    :label="title"
    :prop="name"
    :align="align"
    :fixed="fixed"
    :selectable="selectAble.bind(this)"
    :width="55"
  />

  <el-table-column
    v-else-if="type === 'formatter'"
    :label="title"
    :prop="name"
    :fixed="fixed"
    :align="align"
    :width="width"
    :type="type"
    :formatter="formatterMethods"
  />

  <el-table-column
    v-else-if="type === 'dialog'"
    :label="title"
    :prop="name"
    :align="align"
  >
    <template slot-scope="scope">
      <span
        v-if="isShowClickMethods(scope.row)"
        style="text-decoration: underline;color: #0e90d2;cursor: pointer;"
        @click="dialog_show(scope.row)"
        >{{ scope.row[name] }}</span
      >
      <span v-else>
        {{ scope.row[name] }}
      </span>
    </template>
  </el-table-column>

  <el-table-column
    v-else-if="type === 'button'"
    :label="title"
    :prop="name"
    :align="align"
    :fixed="fixed"
    :width="buttonWidth"
  >
    <template slot-scope="scope">
      <div style="display:flex;justify-content: center;margin-right:10px">
        <span v-for="(button, idx) in buttons" :key="idx">
          <el-button
            v-if="buttonShow(scope.$index, scope.row, button)"
            class="miniBtn"
            style="margin-left: 10px"
            size="mini"
            :type="button.typeIcon || 'primary'"
            :disabled="!!button.disabled"
            @click.native.prevent.stop="handleButton(idx, scope.row, button)"
            >{{ button.name }}
          </el-button>
        </span>
      </div>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'tooltip'"
    :label="title"
    :prop="name"
    :align="align"
    :width="width"
  >
    <template slot-scope="scope">
      <el-tooltip
        effect="light"
        :content="scope.row[name]"
        :disabled="!scope.row[name]"
      >
        <div class="tooltip">
          {{ scope.row[name] }}
        </div>
      </el-tooltip>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'multColumns'"
    :label="title"
    align="center"
    :fixed="fixed"
    :width="width"
  >
    <template slot-scope="scope">
      <div v-for="(item, index) in slotName" :key="index" class="textLeft">
        <span v-if="fieldShow(item, scope.row)">
          {{ item.label }}：{{ scope.row[item.name] }}
        </span>
      </div>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="title"
    :prop="name"
    :fixed="fixed"
    :align="align"
    :width="width"
    :type="type"
  />
</template>
<script>
export default {
  name: "ReportColumn",
  props: {
    type: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    hidden: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "center"
    },
    buttons: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Function,
      default: () => () => {}
    },
    isShowClick: {
      type: Function,
      default: () => () => {}
    },
    formatterType: {
      type: [String, Function],
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: () => false
    },
    iconName: {
      // 传表头需要自定义添加的icon名
      type: String,
      default: ""
    },
    // 提示内容
    tooltipContent: {
      type: String,
      default: ""
    },
    // 字段内展示多个字段
    slotName: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    buttonWidth() {
      if (!this.width) {
        return this.buttons.length * 80;
      }
      return this.width;
    }
  },
  watch: {},
  created() {},
  methods: {
    renderHeader(h, { column }) {
      const className = this.iconName ? this.iconName : "";
      const content = this.tooltipContent;
      return h(
        "el-tooltip",
        {
          props: {
            content: content,
            placement: "top",
            effect: "light",
            disabled: !content
          },
          domProps: {
            innerHTML: `${column.label}<span class=${className}></span>`
          }
        },
        [h("p")]
      );
    },
    formatterMethods(row, column) {
      if (this.formatterType) {
        return this.formatterType(row);
      }
      const nums = parseFloat(row[column.property] || 0).toFixed(2);
      // const nums = row[column.property]; // 若后端金额不是两位小数，则无法转换
      const tostringNum = nums.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return `${tostringNum}`;
    },
    isShowClickMethods(row) {
      if (this.isShowClick) {
        return this.isShowClick(row);
      }
    },
    buttonShow(index, row, button) {
      if (button.isShow) {
        return button.isShow(index, row, button);
      }
      return true;
    },
    fieldShow(field, row) {
      if (field.isShow) {
        return field.isShow(row);
      }
      return true;
    },
    handleButton(idx, itemRow, button) {
      this.$emit("childmethods", button, itemRow);
    },
    selectAble(row, index) {
      if (this.selectable) {
        return this.selectable(row, index);
      }
      return true;
    },
    dialog_show(row) {
      this.$emit("childmethods", "dialog", row);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.print_check {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid #ddd;
}
.tooltip {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
}
.textLeft {
  text-align: left;
}
</style>
