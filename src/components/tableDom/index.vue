<template>
  <div class="tableEment">
    <slot name="header" />
    <!-- 控制表头的显示隐藏 -->
    <div v-if="table_control">
      <el-popover
        v-model="headerControl"
        placement="bottom-start"
        width="400"
        trigger="manual"
      >
        <div class="commpone_nav">
          自定义列表项
        </div>
        <div>
          <span>
            <el-checkbox-group v-model="checkedTbale">
              <template v-for="(item, index) in realTableColumns">
                <span :key="index" class="mg_20r" v-if="!item.isVisibility">
                  <el-checkbox :label="item.name">{{ item.title }}</el-checkbox>
                </span>
              </template>
            </el-checkbox-group>
          </span>
          <span class="dialog-footer">
            <el-button @click="headerControl = false">取 消</el-button>
            <el-button type="primary" @click="saveCheckedTbale"
              >确 定</el-button
            >
          </span>
        </div>
        <el-button slot="reference" class="float_r">
          <i
            class="icon_table"
            :class="[
              headerControl ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
            ]"
            @click="headerControl = !headerControl"
          />
        </el-button>
      </el-popover>
    </div>
    <el-table
      ref="tableDom"
      v-loading="loading"
      :height="tableHeight"
      :data="realTableData"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      border
      style="margin-bottom: 10px;"
      :cell-style="bodyStyle"
      :header-cell-style="headerStyle"
      :span-method="spanMethod"
      @selection-change="pitchonChange"
    >
      <template v-for="(column, $index) in realTableColumns">
        <template v-if="column.showLine">
          <report-column
            v-if="column.type !== 'slot'"
            :key="$index"
            v-bind="column"
            @childmethods="childmethods"
            v-on="$listeners"
          />
          <slot v-else :name="column.slotName" :data="column" />
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="paginationShow"
      style="text-align:right;"
      background
      :current-page="pageIndex"
      :page-sizes="pageSizesList"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <slot name="footer" />
  </div>
</template>
<script>
import reportColumn from "./reportColumn.vue";
import request from "@/utils/http";
// 转为千分符
const millimeter = /(\d)(?=(\d{3})+\.)/g;
// import _ from 'lodash'
/* eslint-disable */
export default {
  name: "report-table",
  props: {
    realTableColumns: {
      type: Array
    },
    currentPage: {
      type: Number
    },
    path: {
      type: String,
      default: '',
    },
    totalPath: {
      // 合计行的合计数据接口url
      type: String
    },
    request_method: {
      type: String,
      default: "get"
    },
    paginationShow: {
      type: Boolean,
      default: true
    },
    realTableData_parent: {
      type: Array
    },
    totalRowMap: {
      type: Object
    },
    totalFormatterType: {
      // 合计的金额形式
      type: String,
      default: ""
    },
    pageSizesList: {
      type: Array,
      default() {
        return [20, 50, 100, 200];
      }
    },
    summaryTitle: {
      // 自定义统计行-合计:位置num，title内容
      type: Object,
      default: function() {
        return {};
      }
    },
    spanMethod: {
      type: Function
    },
    beforeSearch: {
      type: Function
    },
    valueClone: {
      type: Object,
      default: () => {}
    },
    // 控制是否显示动态控制表头的
    table_control: {
      type: Boolean,
      default: false
    },
    pagingWitch: {
      type: Boolean,
      default: false
    }
  },
  components: {
    reportColumn
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 20,
      bodyStyle: {
        "font-size": "12px",
        padding: "0",
        height: "40px"
      },
      headerStyle: {
        "font-size": "12px",
        "font-weight": "blod",
        color: "rgba(49, 65, 86, 0.82)",
        padding: "0",
        height: "40px"
      },
      loading: false,
      tableHeight: 0,
      realTableData: [],
      total: 0,
      multipleSelection: [],
      totalRow: {}, // 合计行的合计数据
      resolve_self: null,
      headerControl: false, // 显示控制动态表格的面板
      routerPath: this.$route.path,
      checkedTbale: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.init(this.valueClone);
    });
    /**
     * 从缓存中获取之前存的动态显示的列如果没有测默认全部显示
     */
    let headerControlArr = JSON.parse(localStorage.getItem(this.routerPath))
    if (headerControlArr && headerControlArr.length>0) {
       headerControlArr.map(item => {
        this.checkedTbale.push(item)
      })
    } else {
       // 默认列全部显示
      this.realTableColumns.map(item => {
        if (item.isVisibility) return
        this.checkedTbale.push(item.name)
      })
    }
    this.showControl()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.tableHeight === 0) {
        this.windowSizeChanged();
        window.addEventListener("resize", () => {
          this.windowSizeChanged();
        });
      }
    });
  },
  computed: {
    showSummary() {
      if (this.totalRowMap && Object.keys(this.totalRowMap).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    realTableData_parent: {
      handler(val) {
        if (val) {
          this.realTableData = val;
        }
      },
      deep: true,
      immediate: true
    },
     headerControl(val) {
      if (val) {
        /**启到回显作用 */
        this.checkedTbale = []
        this.realTableColumns.map(item => {
          if (item.isVisibility) return
          if (item.showLine) {
            this.checkedTbale.push(item.name)
          }
        })
      }
    }
  },
  methods: {
    read() {
      return new Promise((resolve, reject) => {
        this.resolve_self = resolve
      })
    },
    windowSizeChanged() {
      if (this.$refs.tableDom) {
        this.tableHeight =
          document.documentElement.clientHeight -
          this.$refs.tableDom.$el.offsetTop -
          40;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.init(this.valueClone, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init(this.valueClone, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
    },
    pitchonChange(val) {
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", this.multipleSelection);
    },
    init(valueClone, objs= {
       pageIndex: 1,
       pageSize: this.pageSize,
    }) {
       if (this.realTableData_parent) return; // 数据由父组件传进来
       let searchParams = Object.assign({}, valueClone, objs);
       if (typeof this.beforeSearch === 'function') {
          this.beforeSearch(searchParams, this.initSearch);
        } else {
          this.initSearch(searchParams)
        }
    },
    // 获取table数据
    initSearch(params = {}) {
      this.loading = true;
      // 当有path时,调用对应的接口获取table数据
       if (this.pagingWitch) {
        params.current = params.pageIndex
        params.size = params.pageSize
        delete params.pageIndex
        delete params.pageSize
      }
      request({
        method: this.request_method,
        url: this.path,
        params: this.request_method === 'get' ? params : '',
        data: this.request_method === 'get' ? '' : params,
        noloding: true
      })
        .then(res => {
          if (res.success) {
            this.realTableData = res.model.list || res.model.model || res.model.records || [];
            this.total = res.model.total;
            this.$nextTick(() => {
              this.$refs.tableDom.doLayout();
            });
          } 
        })
        .finally(() => {
          this.loading = false;
          if (this.resolve_self) {
            this.resolve_self(this.realTableData)
          }
        });
      // 因合计行跟表格数据是不同的接口,有合计行的时候还的调取合计行接口。 待优化
      if (this.totalPath) {
        request[this.request_method](this.totalPath, {
          params,
          noloding: true
        }).then(res => {
          if (res.success) {
            this.totalRow = res.model;
          }
        });
      }
    },
      // 表格里面的一些按钮
    childmethods(button, val) {
      if (typeof button !== "string" && button.event.type === "routerMethod") {
        // 跳转页面
        const params = {};
        button.event.params.map(item => {
          params[item] = val[item];
        });
        this.$router.push({
          path: button.event.url,
          query: params,
        });
      } else if (typeof button !== "string" && button.event.type === "delete") {
        this.$confirm('确定删除该条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  
         this.deleted(button, val)
        }).catch(() => {});
      } else {
        // 主要用来写一些弹窗这类的
        this.$emit('childmethods_out', button, val)
      }
    },
    deleted(button, val) {
      const params = {};
      button.event.params.map(item => {
        params[item] = val[item];
      });
       request({
        method: button.event.url.request_method || 'get',
        url: button.event.url,
        params: button.event.url.request_method === 'post' ? '' : params,
        data: button.event.url.request_method === 'post' ? params : '',
      }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.init(this.valueClone, {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          })
        }
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.map((item, index) => {
        if (index === 0) {
          let num = 0,
            title = "合计";

          if (this.summaryTitle && Object.keys(this.summaryTitle).length) {
            num = this.summaryTitle.num ? this.summaryTitle.num : 0;
            title = this.summaryTitle.title ? this.summaryTitle.title : "合计";
          }
          sums[index + num] = title;
          return;
        }
        if (Object.keys(this.totalRowMap).includes(item.property)) {
          // 金额-统一千分符
          if (this.totalFormatterType === "thousandMark") {
            sums[index] = String(
              this.totalRow[this.totalRowMap[item.property]]
            ).replace(millimeter, "$1,");
          } else {
            sums[index] = this.totalRow[this.totalRowMap[item.property]];
          }
        }
      });
      return sums;
    },
    /**
     * 根据选中的列来显示表头 
     */
    showControl() {
      this.realTableColumns.map(item => {
        if (item.isVisibility) {
          this.$set(item, 'showLine', true)
        } else {
          if (this.checkedTbale.includes(item.name)) {
            this.$set(item, 'showLine', true)
          } else {
            this.$set(item, 'showLine', false)
          }
        }
      })
      this.$nextTick(() => {
        this.$refs.tableDom.doLayout();
      });
    },
    /**
     * 保存表头控制
     */
    saveCheckedTbale() {
      this.headerControl = false;
      localStorage.setItem(this.routerName, JSON.stringify(this.checkedTbale))
      this.showControl();
    },
    clearSelection() {
      this.$refs.tableDom.clearSelection();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tableEment {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & /deep/ .el-table {
    width: 100%;
    flex: 1;
  }
}
 .mg_20r {
    margin-right: 20px !important;
  }
  .dialog-footer {
    display: block;
    margin-top: 20px;
  }
  .float_r {
    float: right;
    border: none;
    padding: 0;
  }
  .icon_table {
    font-size: 18px;
    background: #ddd;
  }
  .commpone_nav {
    height: 30px;
    border-bottom: 1px solid #333;
    margin-bottom: 10px;
  }
</style>
