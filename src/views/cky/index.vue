<template>
  <div class="common_test">
    <!-- 查询条件 -->
    <searchDom
      v-model="valueClone"
      :search-from="searchFrom"
      labelWidth="110px"
      path="/select"
      style="margin-top:20px;"
    >
      <template slot="selfdingyi" slot-scope="scope">
        <el-form-item
          :label="scope.data.title + '：'"
          :label-width="scope.data.labelWidth"
        >
          <el-input
            style="width: 200px"
            v-model="valueClone[scope.data.name]"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </template>
      <el-button type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
    </searchDom>
    <!-- 表格 -->
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
