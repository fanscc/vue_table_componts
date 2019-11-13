"use strict";
const path = require("path");
const url = "http://docker34-finance.qipeipu.net";

// 用来判断是什么环境mock环境测走mock数据
const Environment = process.env.environment;
function resolve(dir) {
  return path.join(__dirname, dir);
}

function proxyFun(goMock, url, Rewrite) {
  if (goMock) {
    return {
      target: `http://localhost:3002`,
      host: `localhost:3002`,
      // pathRewrite: {"^/api" : ""} //请求 /api/home/index  就会变成 localhost:3000/home/index
      pathRewrite() {
        return Rewrite;
      }
    };
  } else {
    return {
      target: url,
      changeOrigin: true,
      pathRewrite: {
        "^/Api": ""
      }
    };
  }
}

// eslint-disable-next-line no-unused-vars
let proxyObj = {};
if (Environment !== "mock") {
  proxyObj = {
    "/Api": proxyFun(false, url)
  };
} else {
  proxyObj = {
    "/mock_autoTreasure": proxyFun(true, url, "/mock_autoTreasure"),
    "/select": proxyFun(true, url, "/select")
  };
}

module.exports = {
  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "development",
  productionSourceMap: process.env.NODE_ENV === "development",
  runtimeCompiler: true,
  devServer: {
    host: "localhost",
    port: 8888,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: proxyObj,
    after: Environment === "mock" ? require("./mock/index.js") : () => {}
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "table公共组件",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.resolve.symlinks(true);
    config.performance.set("hints", false);
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })

      .end();
    config.plugin("define").tap(args => {
      args[0]["process.env"] = {
        // 是否线上环境
        ONLINE: JSON.stringify(process.env.npm_config_env === "online")
      };
      return args;
    });
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config => {
        config.devtool("cheap-source-map");
      });
  }
};
