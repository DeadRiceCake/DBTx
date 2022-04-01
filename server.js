const express = require("express");

const app = express();
const port = 3000;

const Router_V1 = require("./src/app/v1");

app.use("/api/v1", Router_V1);

app.use((req, res, next) => {
  const error = new Error("Not found");
  console.log(req.url);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log("서버 가동중... 포트번호", port);
})