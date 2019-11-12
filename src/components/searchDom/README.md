
# searchDom搜索公共组件

> 用于配置table上的查询条件的公用组件

## 使用方法

```HTML
 <searchDom
      v-model="valueClone"
      :search-from="searchFrom"
      staticParams={id: 1}
      methodRequest="get"
      labelWidth="110px"
      path="/select"
      style="margin-top:20px;"
    >
    // 自定义查询框,没自定义的时候template内容可以去掉
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
```    
### searchDom Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| path | 下拉框请求接口 | String | - | - |  
| labelWidth | 输入框前面的文字描述宽度 | String | - | 80px |
| methodRequest | 下拉框请求方法 | String | - | get |

### searchFrom Attributes

配置的一段json来实现不同的json渲染出不同的组件例子如下：

```javascript
 // 搜索的样式
  searchFrom: [
    {
      inputModel: "fsInput", 
      title: "用户名",        
      name: "username", 
      placeholder: "精准查询"  
    },
    {
      inputModel: "fsSelect",
      title: "退换货类型",
      placeholder: "请选择",
      name: "orderType",
      value: "0",
      staticArr: [
        { label: "退货", value: "0" },
        { label: "换货", value: "1" }
      ],
      defaultArr: true
    },
    {
      inputModel: "fsSelect",
      title: "退货",
      placeholder: "请选择",
      name: "orderStatusList1",
      mapName: "退货",
      paramsMaping: {
        label: "desc",
        value: "type"
      }
    },
    {
      inputModel: "fsSelect",
      title: "退换货状态",
      placeholder: "请选择",
      multiple: true,
      name: "orderStatusList",
      value: [],
      mapName: "退换货状态",
      paramsMaping: {
        label: "desc",
        value: "type"
      }
    },
     {
      inputModel: "fsSelect",
      title: "省",
      placeholder: "请选择",
      multiple: true,
      name: "provide",
      mapName: "省",
      sublevel: "city",
      paramsMaping: {
        label: "desc",
        value: "type"
      }
    },
    {
      inputModel: "fsSelect",
      title: "市",
      placeholder: "请选择",
      name: "city",
      mapName: "市",
      parent: "provide",
      path: "/getCity",
      paramsMaping: {
        label: "desc",
        value: "type"
      }
    },
    {
      title: "自定义的查询",
      name: 'selfValue',
      type: "slot",
      slotName: "selfdingyi",
    },
    {
      inputModel: "fsTime",
      title: "开始时间",
      name: "stratTimeValue"
    },
    {
      inputModel: "fsDoubleTime",
      title: "申请退换时间",
      name: "retrunTimeValue",
      value: ["", ""],
      labelWidth: "120px"
    },
    {
      inputModel: "fsmultiTime",
      title: "认领时间",
      name: "claimTime",
      placeholder: "请选择",
      lastFirstToToday: true
    }
  ],
```
> ### 通用参数 

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| inputModel | 输入框的类型,支持input输入框<br>select下拉框单个时间与时间区间 | String | fsInput,fsSelect,<br>fsTime,fsDoubleTime,fsmultiTime | - | 
| title | 输入框前面的文字描述 | String | - | - |
| name | 对应传给后台的参数 | String | - | - |
| value | 设置输入框的默认值<br>注：时间区间与下拉框多选是数组 | String | - | - |
| labelWidth | 控制自身输入框前文字的宽度 | String | - | 80px |
| clearable | 有内容的时候支持点击清空 | Boolean | - | true |

---

> ### input输入框自身参数配置  

无

-----

> ### select下拉框自身参数配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| multiple | 是否支持是多选 | Boolean | true,false | false | 
| mapName | 后台返回的下拉框数据对应的key<br>如返回{a:[],b:[]};a对应一个下拉框的值b对应另外一个下拉框,这里的a就是mapName对应的配置字段 | String | - | - |
| paramsMaping | 用于转换后台返回的下拉框的字段如返回a:[{desc:cc,type:1},只需配置paramsMaping：{label: "desc", value: "type"}] | Object | - | null |
| staticArr | 使用自己写死的下拉框的值如staticArr: [{ label: "退货", value: "0" }, { label: "换货", value: "1" }]需与defaultArr配合使用, | Array | - | - |
| defaultArr | 是否用自己写死的下拉框需与staticArr配合使用 | Boolean | - | false |
| sublevel | 联动下拉框下级与后台对应的字段名,如省市联动对应市的字段名,需与parent联合起来使用 | Boolean | - | false |
| parent | 联动下拉框上级与后台对应的字段名,如省市联动对应省的字段名,需与sublevel联合起来使用 | Boolean | - | false |
| staticParams | 下拉框请求的默认参数 | Object | - | {} |
| path | 此下拉框对应的接口请求路径 | String | - | - |

---

> ### fsTime时间自身参数配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| dateType | 时间显示类型 | String | date,dateTime。data显示yyyy 年 MM 月 dd 日dataTime显示yyyy 年 MM 月 dd 日 HH时：mm分：ss秒 | date | 
| valueFormat | 可选,绑定值的格式。不指定则绑定值为 Date 对象 | String | - | yyyy-MM-dd |
| disabled | 是否可以编辑 | Boolean | - | false |

---

> ### fsDoubleTime区间时间参数配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| dateType | 时间显示类型 | String | year/month/date/week/ datetime/datetimerange/daterange | daterange | 
| format | 可选,绑定值的格式。不指定则绑定值为 Date 对象 | String | - | yyyy-MM-dd HH:mm:ss |
| disabled | 是否可以编辑 | Boolean | - | false |
| startPlaceholder | 开始时间的默认显示提示信息 | String | - | 开始日期 |
| endPlaceholder | 结束时间的默认显示提示信息 | String | - | 结束日期 |

> ### fsmultiTime组合时间区间参数配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| format | 可选,绑定值的格式。不指定则绑定值为 Date 对象,时间类型也由此值的长度决定长度为7对应month类型,大于7小于12为date类型其他为datetime类型 | String | - | yyyy-MM-dd |
| lastAllMonth | 默认值为上月全月 | Boolean | - | false |
| lastFirstToToday | 默认值为上月第一天到今天 | Boolean | - | false |
| before | 代表结束日期是当前日期,开始日期是由当前日期减timeLag,需与timeLag配合使用 | Boolean | - | false |
| after | 代表开始时间是当前日期,结束日期是由开始日期算出来的,由开始日期加上timeLag,需与timeLag配合使用 | Boolean | - | false |
| timeLag | 代表默认的开始时间跟结束时间相隔多少 | Number | - | 2592000000(30天) |
| disabled | 是否可以编辑 | Boolean | - | false |
 
---

> ### 自定义查询参数配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |  
| :-:| :-: | :-: |:-: | :-: |
| type | slot代表此输入框自定义 | String | slot | - |
| slotName | 控制自定义输入框的位子 | String | - | - |

# <font color='red'> 注意：</font>
  * 此组件依赖element-ui,跟axios 
  * 下拉框判断请求成功与否需要后台返回success字段true成功false失败，返回的下拉框数组参数需要在model里面 获取下拉框的请求如下：
```javascript
.then(res => {
  if (res.success) {
    if (this.mapData) {
      this.dealData(res.model[this.mapData]);
    } else if (res.code === undefined) {
      this.dealData(res);
    } else {
      this.dealData(res.model);
    }
  }
});

dealData方法无需理会,我们需要的参数需要在res.model里面
```


> ### 查询组件searchDom展示
<img src="../../assets/search.jpg" width="100%">






















