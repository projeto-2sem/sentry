var analyticsModel = require("../models/analyticsModel");

async function buscarKpis(req, res) {
    var empresaId = req.user.empresaId;
    var regiao = req.query.regiao;

    if (!empresaId) {
        return res.status(401).json({ erro: "Usuario não encontrado." })
    }


    try {
        const servidores = await analyticsModel.buscarServidoresPorEmpresaERegiao(empresaId, regiao);

        if (!servidores || servidores.length === 0) {
            return res.status(200).json({
                servidoresCriticos: 0,
                taxaPerdidos: "0.00",
                variacaoAtrasos: "0 ms"
            })
        }
    

    let totalCriticos=0;
    let totalPerdidos=0;
    let somaBytesRecebidos=0;
    let somaTempoAtraso=0;
    let contadorRegistro=0;


     for(let i=0; i<servidores.length;i++){

        const servidor=servidores[i];

        if(servidor.status===0){
            totalCriticos++;
        }

        try{
            const dadosGold= await analyticsModel.buscarDadosS3(empresaId,servidor.idServidor);

             if(Array.isArray(dadosGold) && dadosGold.length>0){
                dadosGold.forEach(registro =>{
                    totalPerdidos+= Number(registro.net_drops_out||0)+ Number(registro.net_drops_in||0);
                    
                }
             }
        }
     }
    }
}

function listarServidores(req, res) {
    var empresaId = req.user.empresaId;

    if (!empresaId) {
        return res.status(401).json({ erro: "Usuário não autenticado ou sessão expirada." });
    }

    analyticsModel.listarServidores(empresaId)
        .then(function (resultado) {
            res.status(200).json(resultado || []);
        })
        .catch(function (erro) {
            console.error("Erro ao listar servidores", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro interno" });
        });
}
function buscarEvolucaoTrafego(req, res) {
    var empresaId = req.user.empresaId;
    var regiao = req.query.regiao;

    if (!empresaId) {
        return res.status(401).json({ erro: "Usuário não autenticado ou sessão expirada." });
    }

    analyticsModel.buscarEvolucaoTrafego(empresaId, regiao)
        .then(function (resultado) {
            res.status(200).json(resultado || []);
        })
        .catch(function (erro) {
            console.error("Erro ao buscar evolução de tráfego:", erro);
            res.status(500).json([]); // Retorna array vazio em JSON para não quebrar o front
        });
}

function buscarTopServidores(req, res) {
    var empresaId = req.user.empresaId;
    var regiao = req.query.regiao;

    analyticsModel.buscarTopServidores(regiao)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao buscar top servidores:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

async function buscarDadosS3(req, res) {

    var empresaId = req.user.empresaId;
    const servidorId = req.query.servidorId;

    if (!empresaId || !servidorId) {
        return res.status(400).json({ erro: "Parâmetros empresaId e servidorId são obrigatórios." });
    }
    try {
        const dados = await analyticsModel.buscarDadosS3(empresaId, servidorId);
        res.status(200).json(dados);
    } catch (erro) {
        console.error("Erro no controller ao buscar dados do S3:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados do S3" });
    }
}

module.exports = {
    buscarKpis,
    buscarEvolucaoTrafego,
    buscarTopServidores,
    buscarDadosS3,
    listarServidores
};