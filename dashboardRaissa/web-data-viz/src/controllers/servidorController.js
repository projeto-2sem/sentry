var servidorModel = require("../models/servidorModel")

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    servidorModel.listar(idEmpresa).then(function (servidores) {
        let promessas = servidores.map(servidor => {
            return servidorModel.listarMedicoesServidor(servidor.idServidor).then(medicoes => {
                let limites = { atencao: { cpu: 70, ram: 40, disco: 60 }, critico: { cpu: 80, ram: 50, disco: 70 } };
                
                medicoes.forEach(m => {
                    if (m.tipoMetrica === 'cpu') {
                        limites.atencao.cpu = Number(m.limiteAtencao);
                        limites.critico.cpu = Number(m.limiteCritico);
                    } else if (m.tipoMetrica === 'ram') {
                        limites.atencao.ram = Number(m.limiteAtencao);
                        limites.critico.ram = Number(m.limiteCritico);
                    } else if (m.tipoMetrica === 'disco') {
                        limites.atencao.disco = Number(m.limiteAtencao);
                        limites.critico.disco = Number(m.limiteCritico);
                    }
                });

                servidor.limites = limites;

                if (servidor.hostname === 'SRV-APP-01') {
                    servidor.historico = {
                        horarios: ['22:15', '22:30', '22:45', '23:00', '23:30'],
                        cpu: [72.4, 78.1, 84.5, 89.6, 90.8],
                        ram: [40.1, 41.0, 41.8, 42.0, 42.7],
                        disco: [57.5, 57.6, 57.7, 57.8, 57.7],
                        perdaPacote: "4.8%",
                        processos: [
                            { nome: "svchost.exe", cpu: 45.5 },
                            { nome: "lsass.exe", cpu: 8.7 },
                            { nome: "System", cpu: 8.4 }
                        ]
                    };
                } else if (servidor.hostname === 'SRV-DB-01') {
                    servidor.historico = {
                        horarios: ['22:15', '22:30', '22:45', '23:00', '23:30'],
                        cpu: [45.2, 42.8, 39.0, 35.8, 27.1],
                        ram: [91.0, 91.5, 92.4, 93.1, 94.0],
                        disco: [69.2, 69.1, 69.0, 69.0, 68.9],
                        perdaPacote: "1.5%",
                        processos: [
                            { nome: "svchost.exe", cpu: 14.5 },
                            { nome: "lsass.exe", cpu: 3.0 },
                            { nome: "System", cpu: 3.8 }
                        ]
                    };
                } else {
                    servidor.historico = {
                        horarios: ['22:15', '22:30', '22:45', '23:00', '23:30'],
                        cpu: [10.5, 11.2, 12.0, 12.8, 16.7],
                        ram: [41.2, 41.5, 41.9, 42.1, 42.9],
                        disco: [94.8, 94.7, 94.6, 94.6, 94.5],
                        perdaPacote: "0.1%",
                        processos: [
                            { nome: "svchost.exe", cpu: 28.8 },
                            { nome: "System", cpu: 6.9 },
                            { nome: "lsass.exe", cpu: 3.5 }
                        ]
                    };
                }

                return servidor;
            });
        });

        Promise.all(promessas).then(servidoresEnriquecidos => {
            res.status(200).json(servidoresEnriquecidos);
        });

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

function listarSO(req, res) {
    servidorModel.listarSO().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function deletar(req, res) {
    var idServer = req.params.idServer;

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
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function adicionar(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var hostName = req.body.hostName;
    var modelo = req.body.modelo;
    var situacao = req.body.situacao;
    var apelido = req.body.apelido;
    var so = req.body.so;

    servidorModel.adicionar(idEmpresa, hostName, modelo, situacao, apelido, so)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    deletar,
    editar,
    listarSO,
    adicionar
}