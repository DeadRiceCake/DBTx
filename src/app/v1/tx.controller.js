const router = require("express").Router();

const mTx = require("../../model/tx.models");

router
  .route("/")
  .post(async (req, res) => {
    try {
      let transaction = await mTx.useTransaction(11);

      if (transaction) { // 트랜잭션 중간에 오류 발생 시 
        return res.status(400).json({ code: 0, reason: "bad request" });
      }

      return res.status(200).json({
        success: true
      });
    } catch (e) {
      console.log(`!!! ERROR @/my: ${e.stack}`);

      res.status(400).json({ code: 0, reason: "bad request" });
    }
  });

module.exports = router;