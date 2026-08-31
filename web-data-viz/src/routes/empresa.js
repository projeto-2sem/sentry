var express = require("express");
var router = express.Router();

var empresa2Controller = require("../controllers/empresa2Controller");

router.post("/cadastrarEmpresa", function (req, res) {
    empresa2Controller.cadastrar(req, res);
})

module.exports = router;