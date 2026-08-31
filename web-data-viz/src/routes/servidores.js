var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController")

router.get("/listar/:idEmpresa", function (req, res) {
    servidorController.listar(req, res);
});

router.get("/modelos", function (req, res) {
    servidorController.modelos(req, res);
});

router.delete("/deletar/:idServer", function (req, res) {
    servidorController.deletar(req, res);
});

router.put("/editar/:idServer", function (req, res) {
    servidorController.editar(req, res);
});

router.post("/adicionar/:idEmpresa", function(req, res){
    servidorController.adicionar(req, res);
});


module.exports = router;