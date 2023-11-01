let express = require("express");

let app = express();

// 1) 简单请求
// 只要同时满足以下两大条件，就属于简单请求
// 条件1：使用下列方法之一：
// GET
// HEAD
// POST
// 条件2：Content-Type 的值仅限于下列三者之一：
// text/plain
// multipart/form-data
// application/x-www-form-urlencoded

// 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。

let whitList = ["http://localhost:52330"]; //设置白名单
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader("Access-Control-Allow-Origin", origin);
    // 允许携带哪个头访问我 用于预检请求(非简单请求在跨域时会先发起一次预检请求)
    res.setHeader("Access-Control-Allow-Headers", "x-custom-header");
    // 允许哪个方法访问我 用于预检请求
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    // 允许携带cookie
    res.setHeader("Access-Control-Allow-Credentials", true);
    // 预检的存活时间
    res.setHeader("Access-Control-Max-Age", 6);
    // 允许返回的头
    res.setHeader("Access-Control-Expose-Headers", "x-custom-header");
    if (req.method === "OPTIONS") {
      res.end(); // OPTIONS请求不做任何处理
    }
  }
  next();
});

app.put("/getData", function (req, res) {
  console.log(req);
  res.end("server data");
});

app.listen(4000);
