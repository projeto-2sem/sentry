var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha, cargo, empresaId 
        FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cargo, email, codigo_ativacao, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,cargo, email, codigo_ativacao, senha);
    
    //      O insert não da certo por conta da subquery
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, empresaId, cargo, responsavel)
        SELECT
            '${nome}', '${email}', "${senha}", emp.idEmpresa, '${cargo}', resp.idUsuario
            FROM empresa emp
            JOIN codigo_ativacao cod
            ON emp.idEmpresa = cod.empresaId
            JOIN usuario resp
            ON resp.empresaId = emp.idEmpresa
            AND resp.responsavel IS NULL
            WHERE cod.codigo_ativacao = '${codigo_ativacao}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email);
    
    //      O insert não da certo por conta da subquery
    var instrucaoSql = `
        SELECT email, idUsuario FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function trocarSenha(id, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);
    
    //      O insert não da certo por conta da subquery
    var instrucaoSql = `
        UPDATE
            usuario
        SET senha = '${senha}'
        WHERE
            idUsuario = '${id}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarEmail,
    trocarSenha
};