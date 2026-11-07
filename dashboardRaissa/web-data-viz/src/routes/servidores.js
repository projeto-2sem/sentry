var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController")
// por enquanto essa é a unica parte do codigo que utiliza realmente o jwt, aqui ele faz a verificação do token enviado pelo front
// para validar a requisição, ou seja, caso o usuario tente trocar de token para acessar a conta de outra pessoa, ele vai barrar por aqui
// notem que por exemplo na função deletar é chamado o auth antes, que chama o arquivo de autorização para validar
// caso o token nao valide, ele nao consegue proceguir com a requisição
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