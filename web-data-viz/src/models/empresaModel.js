var database = require("../database/config")

function buscarCodigoAtivacao(codigo) {
    var instrucaoSql = `
        SELECT idCodigo FROM codigo_ativacao 
        WHERE codigoAtivacao = '${codigo}' AND usado = 0 AND fkCargo IS NULL;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desativarCodigo(idCodigo, idEmpresa) {
    var instrucaoSql = `
        UPDATE codigo_ativacao 
        SET usado = 1, fkEmpresa = ${idEmpresa} 
        WHERE idCodigo = ${idCodigo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEndereco(cep, numero) {
    var instrucaoSql = `
        SELECT idEndereco FROM endereco WHERE cep = '${cep}' AND numero = '${numero}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEmpresa(idEndereco) {
    var instrucaoSql = `
        SELECT idEmpresa FROM empresa WHERE enderecoId = '${idEndereco}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj, idEndereco) {
    var instrucaoSql = `
        INSERT INTO empresa (nomeFantasia, razaoSocial, cnpj, enderecoId) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}', '${idEndereco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEndereco(cep, estado, cidade, bairro, logradouro, numero, complemento) {
    var instrucaoSql = `
        INSERT INTO endereco (cep, estado, cidade, bairro, logradouro, numero, complemento) VALUES ('${cep}', '${estado}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarAdm(nome, email, senha, idEmpresa) {
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkcargo, fkempresa) VALUES ('${nome}', '${email}', '${senha}', 2, ${idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarAdm,
    buscarEndereco,
    buscarEmpresa,
    buscarCodigoAtivacao,
    desativarCodigo
};