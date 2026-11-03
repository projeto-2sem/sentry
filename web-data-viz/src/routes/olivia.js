const express = require("express");
const router = express.Router();

const oliviaController = require("../controllers/oliviaController");

router.post("/perguntar", oliviaController.perguntar);

module.exports = router;