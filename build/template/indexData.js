export const layout = {
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
      title: "自定义",
      name: "selfValue",
      type: "slot",
      slotName: "selfdingyi"
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
      labelWidth: "120px"
    },
    {
      inputModel: "fsmultiTime",
      title: "认领时间",
      name: "claimTime",
      placeholder: "请选择时间",
      lastFirstToToday: true
    }
  ],
  // 表格样式
  realTableColumns: [
    // 配置表格
    {
      title: "#",
      width: "55",
      ishidden: true,
      type: "selection"
    },
    {
      title: "序号",
      width: "55",
      ishidden: true,
      type: "index"
    },
    {
      name: "orgName",
      title: "用户编号"
    },
    {
      name: "provinceName",
      type: "dialog",
      isShowClick: function(row) {
        if (row.status) return true;
      },
      title: "用户名"
    },
    {
      name: "contactMobile",
      title: "电话号",
      type: "tooltip",
      width: "80"
    },
    {
      name: "balance",
      type: "formatter",
      formatterType: function(row) {
        if (row.balance === "0") {
          return "启用";
        } else {
          return "停用";
        }
      },
      title: "状态"
    },
    {
      name: "money",
      title: "金额",
      type: "formatter"
    },
    {
      name: "orgId2BalanceUpdateTimeStrMap",
      title: "时间",
      type: "multColumns",
      slotName: [
        { label: "创建人", name: "created" },
        { label: "时间", name: "orgId2BalanceUpdateTimeStrMap" }
      ]
    },
    {
      name: "active",
      title: "操作",
      width: "180",
      fixed: "right",
      type: "button",
      buttons: [
        // 配置操作栏
        {
          name: "编辑",
          icon: null,
          event: {
            type: "routerMethod",
            params: ["status", "orgName"],
            url: "/edit"
          }
        },
        {
          name: "删除",
          icon: null,
          typeIcon: "danger",
          isShow: function(index, row) {
            if (row.status === 1) {
              return true;
            } else {
              return false;
            }
          },
          event: {
            type: "delete",
            params: ["status", "orgName"],
            request_method: "post",
            url: "/mock_autoTreasure"
          }
        }
      ]
    }
  ]
};
