var database = require("../database/config")

function autenticar(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha, fkEmpresa, nomeCargo FROM usuario
        join cargo c on idCargo = fkCargo
        WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, codigo_ativacao, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, codigo_ativacao, senha);

    //      O insert não da certo por conta da subquery
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, empresaId, responsavel)
        SELECT
            '${nome}', '${email}', "${senha}", emp.idEmpresa, resp.idUsuario
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

function verificarCodigo(cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cargo)
    var instrucaoSql = `
        select fkCargo, fkEmpresa from codigo_ativacao
        join cargo c on idCargo = fkCargo
        where codigoAtivacao like "${cargo}" and usado = 0;
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

function listarFuncionarios(empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", empresaId);

    var instrucaoSql = `
    select *, date_format(dataCriacao, '%d/%m/%Y') AS dataCriacao, c.* from usuario 
    join cargo c on idCargo = fkCargo
    where empresaId = ${empresaId}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarFuncionarios(id, nome, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", id, nome, cargo);

    if (cargo == "") {
        var instrucaoSql = `update usuario
                            set nome = "${nome}"
                            where idUsuario = ${id};`;
    } else if(nome == "") {
        var instrucaoSql = `update usuario
                            set cargo = "${cargo}"
                            where idUsuario = ${id};`;
    } else {
        var instrucaoSql = `update usuario
                            set nome = "${nome}", cargo = "${cargo}"
                            where idUsuario = ${id};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarEmail,
    trocarSenha,
    listarFuncionarios,
    editarFuncionarios,
    verificarCodigo
};