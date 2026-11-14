var express = require("express");
var router = express.Router();
var analyticsController =require("../controllers/analyticsController");
var validarJWT=require("../autorizacao/auth")


router.get("/dados-s3",validarJWT,function (req, res) {
    analyticsController.buscarDadosS3(req, res);
});

router.get("/listar",validarJWT, function (req,res){
    analyticsController.listarServidores(req,res)
})

// carrega as 3 kpis 

router.get("/kpis",validarJWT, function (req, res) {
    analyticsController.buscarKpis(req, res);
});

// primeiroGrafico

router.get("/evolucao-trafego",validarJWT, function (req, res) {
    analyticsController.buscarEvolucaoTrafego(req, res);
});

// segundo grafico

router.get("/top-servidores", validarJWT,function (req, res) {
    analyticsController.buscarTopServidores(req, res);
});





module.exports = router;
