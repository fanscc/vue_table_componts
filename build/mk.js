const shelljs_1 = require("shelljs");
const Path = require("path");
const fs = require("fs");
let folderName = process.argv[2];
let url = Path.join(__dirname, "..", `src/views/${folderName}`);

try {
  let _stat = fs.statSync(url);
  let hasMkdir = _stat && _stat.isDirectory();
  if (hasMkdir) {
    console.log(`文件${url}已经存在，不能重复创建，请重新创建`);
  }
} catch (error) {
  shelljs_1.mkdir(url);

  /**
   * 获取模板里面的indexData.js内容
   */

  const readIndexData = filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject("ReadFail");
        resolve(data);
      });
    });
  };

  /**
   * 获取模板里面的index.vue内容
   */

  const readIndexVue = filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject("ReadFail");
        resolve(data);
      });
    });
  };

  /**
   *  吧indexData写入组件内
   */
  const writeIndexData = async () => {
    const readIndexDataJson = await readIndexData(
      Path.join(__dirname, "./template/indexData.js")
    );
    if (readIndexDataJson !== "ReadFail") {
      fs.writeFile(`${url}/indexData.js`, readIndexDataJson, function(error) {
        console.log(error);
      });
    }
  };

  /**
   *  吧index.vue写入组件内
   */
  const writeIndexVue = async () => {
    const readIndexDataJson = await readIndexVue(
      Path.join(__dirname, "./template/index.vue")
    );
    if (readIndexDataJson !== "ReadFail") {
      fs.writeFile(`${url}/index.vue`, readIndexDataJson, function(error) {
        console.log(error);
      });
    }
  };

  writeIndexData();
  writeIndexVue();

  /**
   * 获取router.js里面的内容
   */
  //   const readRouter = filePath => {
  //     return new Promise((resolve, reject) => {
  //       fs.readFile(filePath, "utf8", (err, data) => {
  //         if (err) reject("ReadFail");
  //         resolve(data);
  //       });
  //     });
  //   };
}
