var database = require("../database/config")

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

function cadastrarEmpresa(nome_fantasia, razao_social, cnpj, idEndereco) {
    var instrucaoSql = `
        INSERT INTO empresa (nome_fantasia, razao_social, cnpj, enderecoId) VALUES ('${nome_fantasia}', '${razao_social}', '${cnpj}', '${idEndereco}');
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
        INSERT INTO usuario (nome, email, senha, cargo, responsavel, empresaId) VALUES ('${nome}', '${email}', '${senha}', 'Administrador', null, ${idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarAdm,
    buscarEndereco,
    buscarEmpresa
};