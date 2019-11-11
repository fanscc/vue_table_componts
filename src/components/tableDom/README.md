
### 此组件是查询下面对应的table的共用组件

## 使用方法
`
/**
   tableDom 支持配置JSON文件来实现显示不同的表格
   @realTableColumns: 用来表示有哪些查询条件组成的实例看下面的searchFrom数组
   @realTableData: 用来表示查询条件的参数
   @childmethods 用来接收子组件广播上的方法有下一页,页面大小切换，功能按钮的一些方法
   @total 总计数量
   @slot-scope 自定义的时候外层的scope为我们自己配置的js里面的数据,内层的scopeRow对应的是后台返回的那一行的数据
*/
     <tableDom
      :realTableColumns="realTableColumns"
      :realTableData="realTableData"
      @childmethods="childmethods"
      :total="total"
    >
      <template slot="slotName" slot-scope="scope"> 
        <el-table-column
          :label="scope.data.title"
          :prop="scope.data.name"
        >
         <template slot-scope="scopeRow">
          <div>{{scopeRow.row.name}}</div>
          <div>{{scopeRow.row.id}}</div> 
         </template>
        </el-table-column>
      </template>
    </tableDom>
    
   // 表格样式
  realTableColumns: [
    // 配置表格
    {
      align: "center", // 对应数据是否居中
      name: "",        // 对应后端返回的字段名字 
      title: "序号",   // tableHeader上显示的名称
      type: "index",   // 序号跟复现框有
      width: "50"      // 当前列的宽度
    },
    {
      name: "orgName",
      title: "汽修厂"
      type: "slot" // 支持自定义
    },
    {
      name: "provinceName",
      title: "区域"
    },
    {
      name: "contactPerson",
      title: "联系人"
    },
    {
      name: "contactMobile",
      title: "联系电话"
    },
    {
      name: "address",
      title: "联系地址"
    },
    {
      name: "balance",
      title: "汽配余量"
    },
    {
      name: "orgId2BalanceUpdateTimeStrMap",
      title: "最近更新时间"
    },
    {
      name: "",
      title: "明细列表",
      fixed: "right",
      type: "button",
      buttons: [   // 用来控制操作栏的 
        // 配置操作栏   
        {
          name: "查看",  // 按钮名字
          icon: null,   // 按钮前面的icon
          event: {
            type: "routerMethod", // 用来控制是什么类型的按钮功能现有弹窗跟路由跳转
            params: ["balanceRecordType", "orgId"], // 路由跳转的时候需要带到下个页面去的参数
            url: "/financial/balanceEnquiryDetail"  // 路由跳转的路径
          }
        }
      ]
    }
  ]
`
# 具体可以参考财务统计汽配宝管理组件。
