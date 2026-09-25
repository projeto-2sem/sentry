var express = require("express");
var router = express.Router();

var emailController = require("../controllers/emailController");

//Recebendo os dados do html e direcionando para a função cadastrar de emailController.js
router.get("/enviar-email/:emailServer", function (req, res) {
    emailController.enviarEmail(req, res);
});

module.exports = router;