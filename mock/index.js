let nodemon = require("nodemon");

module.exports = () => {
  nodemon({
    script: "./mock/server.js",
    ext: "js json",
    watch: ["mock/"],
    ignore: ["./mock/index.js", "./mock/server.js"]
  });
  nodemon
    .on("start", () => {
      console.log("Mock server is running... 🚀");
    })
    .on("quit", () => {
      console.log(">_ Mock server is quit");
    })
    .on("restart", files => {
      console.log(`Mock server restarted due to: ${files}`);
    });
};
