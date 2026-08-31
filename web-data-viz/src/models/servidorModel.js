var database = require("../database/config")

function listar(idEmpresa) {
    var instrucao = `
        SELECT s.idServidor, s.hostName, s.modeloId, DATE_FORMAT(s.data_criacao, '%d/%m/%Y') data_criacao, ms.nome nome_modelo 
        FROM servidor s
        join modelo_servidor ms
        on s.modeloId = ms.idModelo
        WHERE s.empresaId = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function modelos() {
    var instrucao = `
        SELECT idModelo, nome FROM modelo_servidor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idServer) {
    idServer = Number(idServer);

    var instrucao1 = `
        DELETE FROM metrica
        WHERE servidorId = ${idServer};
    `;

    var instrucao2 = `
        DELETE FROM servidor
        WHERE idServidor = ${idServer};
    `
    return database.executar(instrucao1)
        .then(function () {
            console.log("Métricas excluídas.");
            console.log("Excluindo servidor:", idServer);

            return database.executar(instrucao2);
        });
}

function editar(idServer, hostName, modeloId, situacao, apelido) {
    console.log("ACESSEI O servidor MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idServer, hostName, modeloId, situacao, apelido);
    var instrucaoSql = `
        UPDATE servidor
        SET hostName = '${hostName}', modeloId = ${modeloId}
        WHERE idServidor = ${idServer};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionar(idEmpresa,hostName, modeloId, situacao, apelido) {
    console.log("ACESSEI O servidor MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",idEmpresa, hostName, modeloId, situacao, apelido);
    var instrucaoSql = `
        INSERT INTO servidor (hostName, mac, empresaId, modeloId) 
        VALUES ("${hostName}", "A1:B2:C3:D4:E5:F6", ${idEmpresa}, ${modeloId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    deletar,
    editar,
    modelos,
    adicionar
};