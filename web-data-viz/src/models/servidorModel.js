var database = require("../database/config")

function listar(idEmpresa) {
    var instrucao = `
        SELECT s.idServidor, s.apelido, s.hostname, s.modelo, so.nome, status, DATE_FORMAT(s.data_criacao, '%d/%m/%Y') data_criacao
        FROM servidor s
        JOIN sistema_operacional so
        on  s.sistemaOperacionalId = so.idSistemaOperacional
        WHERE empresaId = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarSO() {
    var instrucao = `
        SELECT * FROM sistema_operacional;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idServer) {
    idServer = Number(idServer);

    var instrucao1 = `
        DELETE FROM servidor_medicao
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
        SET hostname = '${hostName}', modelo = '${modeloId}', apelido = '${apelido}'
        WHERE idServidor = ${idServer};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionar(idEmpresa,hostName, modelo, situacao, apelido, so) {
    console.log("ACESSEI O servidor MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",idEmpresa, hostName, modelo, situacao, apelido);
    var instrucaoSql = `
        INSERT INTO servidor (hostName, mac, empresaId, modelo, sistemaOperacionalId, apelido) 
        VALUES ("${hostName}", "A1:B2:C3:D4:E5:F6", ${idEmpresa}, '${modelo}', '${so}', '${apelido}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    deletar,
    editar,
    listarSO,
    adicionar
};