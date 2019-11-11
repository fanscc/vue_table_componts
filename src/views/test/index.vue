<template>
  <div class="common_test">
    <searchDom
      v-model="valueClone"
      :search-from="searchFrom"
      labelWidth="110px"
      path="/select"
      style="margin-top:20px;"
    >
      <el-button type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </searchDom>
    <tableDom
      ref="tableCommon"
      path="/mock_autoTreasure"
      request_method="post"
      :table_control="true"
      :real-table-columns="realTableColumns"
      @childmethods_out="childmethods_out"
    />
  </div>
</template>
<script>
import { layout } from "./data";
import searchDom from "@/components/searchDom/searchDom.vue";
import tableDom from "@/components/tableDom/index.vue";

export default {
  components: {
    tableDom,
    searchDom
  },
  data() {
    return {
      valueClone: {},
      searchFrom: layout.searchFrom,
      realTableColumns: layout.realTableColumns
    };
  },
  methods: {
    search() {
      this.$refs.tableCommon.pageIndex = 1;
      this.$refs.tableCommon.init(this.valueClone);
    },
    childmethods_out(button, val) {
      if (typeof button === "string" && button === "dialog") {
        this.$message.success(`弹窗参数${JSON.stringify(val)}`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.common_test {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
