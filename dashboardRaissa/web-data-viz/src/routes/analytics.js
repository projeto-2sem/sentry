var express = require("express");
var router = express.Router();
var database = require("../database/config"); 


// indicador latencia media de todos os servidores da empresa logada
router.get("/latencia-global", function (req, res) {
    const idEmpresa = req.query.empresaId || 1;

    const instrucaoSql = `
        SELECT 
            ROUND(AVG(m.limiteAtencao), 0) AS latencia 
        FROM servidor_medicao m
        JOIN servidor s ON m.servidorId = s.idServidor
        WHERE s.empresaId = ${idEmpresa}
         AND m.tipoMedicaoId=1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    database.executar(instrucaoSql) 
      .then(function (resultados) {
            if (resultados.length > 0) {
                res.json(resultados[0]); // Envia o primeiro resultado (ex: { latencia: 42 })
            } else {
                res.status(404).json({ latencia: 0 });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
});



// grafico de top 5 processos que mais consomem rede 

router.get("/ranking-rede", function (req,res){

    var instrucaoSql=`
    SELECT
    nomeProcesso,
    Sum(mbTransferido) AS totalMB
    FROM processo_rede
    GROUP BY nomeProcesso
    ORDER BY totalMB DESC
    LIMIT 5`;
    
    console.loh("Executando a instrução SQL: \n" + instrucaoSql);

     database.executar(instrucaoSql)

      .then(function(resultado){
        if(resultado.length>0){
            res.status(200).json(resultado)
        } else{
            res.status(204).json({mensagem: "Nenhum dado encontrado!"});
        }
      })
      .catch(function(erro){
         console.error("Erro ao buscar ranking de processos :"+ erro.sqlMessage);
         res.status(500).json(erro.sqlMessage)
      });
});

// grafico de regioes de servidoress que mais consomem rede

router.get("/consumo-regiao-rede", function (req,res){

    var instrucaoSql=`
    SELECT 
    s.regiao,
    SUM(sm.limiteAtencao) AS totalConsumo
    FROM servidor s 
    JOIN servidor_medicao sm ON s.idServidor =sm.servidorId
    WHERE sm.tipoMedicaoId=3
    GROUP BY s.regiao
    ORDER BY totalConsumo DESC`;

    console.log("Executando SQL (Consumo por Região): \n" + instrucaoSql);

    database.executar(instrucaoSql)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao buscar consumo por região: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

});


// rota para grafico de regioes que mais perdem pacotes


router.get("/perda-pacotes-regiao", function(req, res){
    var instrucaoSql = `
        SELECT 
            s.regiao, 
            AVG(sm.limiteAtencao) AS mediaPerda
        FROM servidor s 
        JOIN servidor_medicao sm ON s.idServidor = sm.servidorId
        WHERE sm.tipoMedicaoId = 2
        GROUP BY s.regiao
        ORDER BY mediaPerda DESC;
    `;

    console.log("Executando SQL (perda de pacotes): \n"+instrucaoSql);

    database.executar(instrucaoSql)
     .then(function (resultado){
        res.status(200).json(resultado)
     })
     .catch(function (erro){
        console.error("Erro ao buscar perda de pacotes",erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
     });

});

// grafico de protocolos 




router.get("/distribuicao-protocolos", function (req, res) {
    var instrucaoSql = `
        SELECT 
            protocolo, 
            SUM(volumePacotes) AS totalVolume
        FROM trafego_protocolo
        GROUP BY protocolo
        ORDER BY totalVolume DESC;
    `;

    console.log("Executando SQL (Distribuição por Protocolo): \n" + instrucaoSql);

    database.executar(instrucaoSql)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).json({ mensagem: "Nenhum dado de protocolo encontrado!" });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar distribuição de protocolos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
});
  

 




module.exports = router;