"use strict";
const path = require("path");
const webpack = require("webpack");
const url = require("./proxy");

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
    "/auth/login": proxyFun(true, url, "/login"),
    "/auth/info": proxyFun(true, url, "/getInfo"),
    "/api/menus/build": proxyFun(true, url, "/menus"),
    "/mock_autoTreasure": proxyFun(true, url, "/mock_autoTreasure"),
    "/select": proxyFun(true, url, "/menus")
  };
}

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   *
   */

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
    name: "模板系统",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
        moment: "moment"
      })
    ]
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
      args[0]["process.env"].ONLINE = JSON.stringify(
        process.env.npm_config_env === "online"
      );
      args[0]["process.env"].Environment = JSON.stringify(Environment);
      return args;
    });
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config => {
        config.devtool("cheap-source-map");
      });

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
