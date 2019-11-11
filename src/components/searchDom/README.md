
### 此组件是查询条件的共用组件

## 使用方法
```
/**
   searchDom现在有input查询select查询(支持联动),单个时间查询，时间区域查询(分2种一种连在一起的,一种分开的)
   @searchFrom: 用来表示有哪些查询条件组成的实例看下面的searchFrom数组
   @valueClone: 用来表示查询条件的参数
   @<searchDom><solt></solt></searchDom> 支持在父组件自定义一些按钮
*/
    <searchDom
      :search-from="searchFrom"
      v-model="valueClone"
      style="margin-top:20px;"
    >
      <template slot="slotName" slot-scope="scope">
        <el-form-item :label="title + ':'">
          <el-input
            ref="input"
            class="fe-input-content"
            v-model="valueClone[scope.data.name]"
            :placeholder="scope.data.placeholder"
            style="width:200px;"
            clearable
          />
        </el-form-item>
      </template>
      <el-button type="primary" icon="el-icon-search" @click="init()"
        >搜索</el-button
      >
    </searchDom>
    
    searchFrom: [
    {
      inputModel: "fsInput", // 表示input输入框的查询条件
      title: "退货单号",  // 表示输入框前面显示的文字信息
      name: "returnCode",   // 代表这传给后台的字段 
      placeholder: "请选择", // 提示用户的信息
      type: "slot" // 支持自定义
    },
    {
      inputModel: "fsSelect", // 表示select下拉框的查询条件
      title: "退款受理状态", 
      name: "regionId",
      placeholder: "请选择",
      staticParams: {      // 表示调取下拉框传给后台的默认参数
        enumIds: [17]
      },
      paramsMaping: {    // 表示吧后台返回的枚举的name传换成element的lable显示,id转换成value。name,跟value根据后台返回的参数决定
        label: "name",
        value: "id"
      },
      mapData: "17",  // 代表后台返回的参数是 res.model.17才是我们需要的数组
      path: "/enum/find/enumList" // 代表这个此下拉框的请求路径
    },
     {
      inputModel: "fsSelect", // 表示select下拉框的查询条件
      title: "退款受理状态", 
      name: "regionId",
      placeholder: "请选择",
      staticParams: {      // 表示调取下拉框传给后台的默认参数
        enumIds: [17]
      },
      paramsMaping: {    // 表示吧后台返回的枚举的name传换成element的lable显示,id转换成value。name,跟value根据后台返回的参数决定
        label: "name",
        value: "id"
      },
      mapData: "17",  // 代表后台返回的参数是 res.model.17才是我们需要的数组
      path: "/enum/find/enumList" // 代表这个此下拉框的请求路径
    },
    {
      inputModel: "fsTime", // 表示是单个时间的查询
      title: "时间节点",
      name: "times",
      placeholder: "请选择"
    },
    {
      inputModel: "fsDoubleTime", // 表示是时间区域的查询 连在一起的
      title: "最近更新时间",
      name: "returnTimeStartDate",
      placeholder: "请选择"
    },
     {
      inputModel: "fsmultiTime", // 开始时间至结束时间 分开的
      name: "doublequery", // 代表需要跟后台交互的时候
      placeholder: "请选择时间",
      title: "最近更新时间",
      before: true // 开始时间是结束时间算出来, after 结束时间是开始时间算出来
    }
```

# 具体可以参考财务统计汽配宝管理组件。