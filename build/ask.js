var inquirer = require("inquirer");
var spawn = require("child_process").spawn;
var jetpack = require("fs-jetpack");
let dev = process.env.npm_config_env;
var mapHost = jetpack.read("./build/host-map.json", "json");
var list = [];
for (const i in mapHost) {
  list.push({
    name: i,
    value: mapHost[i]
  });
}

var questions = [];

if (!dev) {
  questions.push({
    type: "list",
    name: "baseUrl",
    message: "选一个后台的地址",
    choices: list
  });
}

inquirer.prompt(questions).then(function(answers) {
  var cmd = "";
  var command = "npm run _dev";
  if (answers.baseUrl) {
    process.env.baseUrl = answers.baseUrl;
  }
  if (/^win/.test(process.platform)) {
    // cmd = spawn('cmd', ['/s', '/c', command], { stdio: 'inherit' });
    cmd = spawn("cmd", ["/s", "/c", command]);
  } else {
    cmd = spawn("/bin/sh", ["-c", command], { stdio: "inherit" });
  }
  cmd.stdout.on("data", function(data) {
    process.stdout.write(data);
  });

  cmd.stderr.on("data", function(data) {
    process.stderr.write(data);
  });
});
