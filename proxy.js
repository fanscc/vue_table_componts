module.exports = (() => {
  let dev = process.env.npm_config_env;
  let protocol = "http://";
  if (!dev) {
    console.log("代理的地址是：" + `${process.env.baseUrl}`);
    return `${process.env.baseUrl}`;
  } else {
    let objProxy = {
      10: `docker10-finance.qipeipu.net`,
      30: `docker30-finance.qipeipu.net`,
      31: `docker31-finance.qipeipu.net`,
      32: `docker32-finance.qipeipu.net`,
      33: `docker33-finance.qipeipu.net`,
      34: `docker34-finance.qipeipu.net`,
      35: `docker35-finance.qipeipu.net`,
      36: `docker36-finance.qipeipu.net`,
      37: `docker37-finance.qipeipu.net`,
      38: `docker38-finance.qipeipu.net`,
      39: `docker39-finance.qipeipu.net`,
      40: `pre-finance.qipeipu.com`,
      online: `finance.qipeipu.com`
    };
    console.log("代理的地址是：" + `${protocol}${objProxy[dev]}`);
    return `${protocol}${objProxy[dev]}`;
  }
})();
