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
      :value-clone="valueClone"
      :table_control="true"
      :real-table-columns="realTableColumns"
      @childmethods_out="childmethods_out"
    >
      <template slot="expandSlot">
        <el-table-column type="expand" label="详情" width="1">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.orgName }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </template>
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

    <popUp ref="popUpDom">
      <div slot="content" class="conten-slot">
        订单详情
      </div>
      <div slot="rightContent" class="conten-right-slot">
        <div class="block">
          <p class="nav_conten_right">订单详情</p>
          <el-timeline>
            <el-timeline-item color="#0bbd87" v-for="ite in 26" :key="ite">
              <div class="conten-right-item">
                <p><span>订单新建</span><span>2018/4/12 20:46</span></p>
                <p><span>未审核</span><span>张三</span></p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </popUp>
  </div>
</template>
<script>
import { layout } from "./indexData";
import searchDom from "@/components/searchDom/searchDom.vue";
import tableDom from "@/components/tableDom/index.vue";
import popUp from "@/components/popUp";
import { login } from "@/api/login";
export default {
  components: {
    tableDom,
    searchDom,
    popUp
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
        // this.$message.success(`弹窗参数${JSON.stringify(val)}`);
        this.$refs.popUpDom.open();
      } else if (button.event.type === "expand") {
        this.toogleExpand(val);
      }
    },
    toogleExpand(row) {
      let $table = this.$refs.tableCommon.$refs.tableDom;
      this.$refs.tableCommon.realTableData.map(item => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    }
  }
};
</script>
<style lang="scss" scoped>
.common_test {
  height: 100%;
  display: flex;
  flex-direction: column;
  & ::v-deep .el-table__expand-icon > .el-icon {
    font-size: 0 !important;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.conten-slot {
  width: 500px;
  background: #fff;
}
.conten-right-slot {
  width: 300px;
  padding-top: 10px;
  .nav_conten_right {
    padding-left: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  .conten-right-item {
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
      margin: 0px;
    }
    p:nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
}
</style>
