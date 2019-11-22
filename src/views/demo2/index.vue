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
    >
      <template slot="userCode" slot-scope="scopeHeader">
        <el-table-column align="right" :prop="scopeHeader.data.name">
          <template slot="header">
            <el-tooltip content="详细提示信息" placement="top">
              <span style="text-align: center;display:inline-block;width: 100%"
                >{{ scopeHeader.data.title }}<i class="el-icon-question"></i
              ></span>
            </el-tooltip>
          </template>
        </el-table-column>
      </template>
    </tableDom>
  </div>
</template>
<script>
import { layout } from "./indexData";
import searchDom from "@/components/searchDom/searchDom.vue";
import tableDom from "@/components/tableDom/index.vue";
import { login } from "@/api/login";
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
  async created() {
    let {
      model: { token }
    } = await this.$utils.errorCaptured(login)();
    console.log(token);
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
