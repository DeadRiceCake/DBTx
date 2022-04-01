const router = require("express").Router();

const txCtrl = require("./tx.controller");
router.use("/tx", txCtrl);

module.exports = router;