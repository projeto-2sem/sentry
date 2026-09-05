var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController")

const auth = require("../autorizacao/auth");

router.get("/listar/:idEmpresa", function (req, res) {
    servidorController.listar(req, res);
});

router.get("/listarSO", function (req, res) {
    servidorController.listarSO(req, res);
});

router.delete("/deletar/:idServer",auth , function (req, res) {
    servidorController.deletar(req, res);
});

router.put("/editar/:idServer",auth, function (req, res) {
    servidorController.editar(req, res);
});

router.post("/adicionar/:idEmpresa",auth, function(req, res){
    servidorController.adicionar(req, res);
});


module.exports = router;