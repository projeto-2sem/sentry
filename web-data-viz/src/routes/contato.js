const express = require("express");
const router = express.Router();
const {enviarContato} = require("../controllers/contatoController");

// Chama a função para entrar em contato com o cliente
router.post("/enviarContato", enviarContato);

module.exports = router;