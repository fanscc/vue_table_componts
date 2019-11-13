import searchDom from "@/components/searchDom/searchDom.vue";
import tableDom from "@/components/tableDom/index.vue";

let myplugin = {
  install: function(Vue) {
    //在这里写插件需要实现的功能
    Vue.component("searchDom", searchDom);
    Vue.component("tableDom", tableDom);
  }
};

export default myplugin;
