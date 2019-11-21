// 打印类属性、方法定义
/* eslint-disable */
/**
 *
 * @param {*} styleStr 自定义的css
 * @param {*} dom 需要打印的dom
 * @param {*} ndomStr 需要替换的dom 会替换dom下面含.replace_table class的dom节点
 * @param {*} options // 可以配置不需要显示的dom默认.no-print 是否需要页眉页脚 不需要的话配置 {pagefooter: true}
 * 例子： Print(styleStr, this.$refs.shoppingList, ndomStr, { pagefooter: true })
 */

export const Print = function (dom, styleStr, ndomStr, options) {
    if (!(this instanceof Print)) return new Print(dom, styleStr, ndomStr, options);
    let domStr = '';
    this.options = this.extend({
        'noPrint': '.no-print'
    }, options);
    this.dom = dom;
    this.ndomStr = ndomStr;
    this.styleStr = styleStr || '';
    this.init();
};
Print.prototype = {
    init: function () {
        var content = this.getStyle() + this.getHtml();
        this.writeIframe(content);
    },
    extend: function (obj, obj2) {
        for (var k in obj2) {
            obj[k] = obj2[k];
        }
        return obj;
    },

    getStyle: function () {
        var str = "",
            styles = document.querySelectorAll('style,link');
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML.replace(/\[[a-zA-Z0-9-]*\]/g, "");
        }
        str += this.styleStr
        str += "<style>" + (this.options.noPrint ? this.options.noPrint : '.no-print') + "{display:none !important;}.print_show{display:block !important;}</style>";
        if (this.options.pagefooter) {
            str += `<style media="print">
                  @page {
                    size: auto;
                    margin: 0px;
                    }
              </style>`
        }
        return str;
    },

    getHtml: function () {
        var inputs = document.querySelectorAll('input');
        var textareas = document.querySelectorAll('textarea');
        var selects = document.querySelectorAll('select');

        for (var k = 0; k < inputs.length; k++) {
            if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
                if (inputs[k].checked == true) {
                    inputs[k].setAttribute('checked', "checked")
                } else {
                    inputs[k].removeAttribute('checked')
                }
            } else if (inputs[k].type == "text") {
                inputs[k].setAttribute('value', inputs[k].value)
            } else {
                inputs[k].setAttribute('value', inputs[k].value)
            }
        }

        for (var k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type == 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value
            }
        }

        for (var k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type == 'select-one') {
                var child = selects[k3].children;
                for (var i in child) {
                    if (child[i].tagName == 'OPTION') {
                        if (child[i].selected == true) {
                            child[i].setAttribute('selected', "selected")
                        } else {
                            child[i].removeAttribute('selected')
                        }
                    }
                }
            }
        }
        if (this.ndomStr) {
            this.Clonedom = this.dom.cloneNode(true)
            this.Clonedom.getElementsByClassName('replace_table')[0].innerHTML = this.ndomStr
        } else {
            this.Clonedom = this.dom
        }
        return this.Clonedom.outerHTML;
    },

    writeIframe: function (content) {
        var w, doc, iframe = document.createElement('iframe'),
            f = document.body.appendChild(iframe);
        iframe.id = "myIframe";
        //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
        iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
        var _this = this
        setTimeout(function () {
            _this.toPrint(w);
            setTimeout(function () {
                document.body.removeChild(iframe)
                this.Clonedom = null;
            }, 100)
        }, 1000)
    },

    toPrint: function (frameWindow) {
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        } catch (err) {
            console.log('err', err);
        }
    },
    isDOM: (typeof HTMLElement === 'object') ?
        function (obj) {
            return obj instanceof HTMLElement;
        } :
        function (obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        }
};
  // const MyPlugin = {}
  // MyPlugin.install = function (Vue, options) {
  //   // 4. 添加实例方法
  //   Vue.prototype.$print = Print
  // }
  //export default MyPlugin
