var servidorModel = require("../models/servidorModel")

function listar(req, res) {
    idEmpresa = req.params.idEmpresa;

    servidorModel.listar(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function modelos(req, res) {
    servidorModel.modelos().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function deletar(req, res) {
    idServer = req.params.idServer;

    servidorModel.deletar(idServer).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function editar(req, res) {
    var idServer = req.params.idServer;
    var hostName = req.body.hostName;
    var modeloId = req.body.modeloId;
    var situacao = req.body.situacao;
    var apelido = req.body.apelido;

    servidorModel.editar(idServer, hostName, modeloId, situacao, apelido)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a edição: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function adicionar(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var hostName = req.body.hostName;
    var modeloId = req.body.modeloId;
    var situacao = req.body.situacao;
    var apelido = req.body.apelido;

    servidorModel.adicionar(idEmpresa, hostName, modeloId, situacao, apelido)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a criação: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    deletar,
    editar,
    modelos,
    adicionar
}