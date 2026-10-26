var database = require("../database/config")

function listar(idEmpresa) {
    var instrucao = `
        SELECT 
            s.idServidor, 
            s.apelido, 
            s.hostname, 
            s.modelo, 
            s.mac,
            s.status, 
            so.nome as sistemaOperacional,
            DATE_FORMAT(s.dataCriacao, '%d/%m/%Y') dataCriacao
        FROM servidor s
        JOIN sistema_operacional so ON s.sistemaOperacionalId = so.idSistemaOperacional
        WHERE empresaId = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMedicoesServidor(idServidor) {
    var instrucao = `
        SELECT sm.servidorId, sm.tipoMedicaoId, sm.ativo, sm.limiteCritico, sm.limiteAtencao, tm.apelido as tipoMetrica
        FROM servidor_medicao sm
        JOIN tipo_medicao tm ON sm.tipoMedicaoId = tm.idTipoMedicao
        WHERE sm.servidorId = ${idServidor};
    `;
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
    var instrucaoSql = `
        UPDATE servidor
        SET hostname = '${hostName}', modelo = '${modeloId}', apelido = '${apelido}', status = ${situacao}
        WHERE idServidor = ${idServer};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionar(idEmpresa, hostName, modelo, situacao, apelido, so) {
    var instrucaoSql = `
        INSERT INTO servidor (hostname, mac, empresaId, modelo, sistemaOperacionalId, apelido, status) 
        VALUES ("${hostName}", "A1:B2:C3:D4:E5:F6", ${idEmpresa}, '${modelo}', '${so}', '${apelido}', ${situacao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarMedicoesServidor,
    deletar,
    editar,
    listarSO,
    adicionar
};