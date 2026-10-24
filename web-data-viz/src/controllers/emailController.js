var emailModel = require("../models/emailModel");

function enviarEmail(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.params.emailServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        
        emailModel.enviarEmail(email)
            .then(
                function (resultado) {
                    console.log(resultado)
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function emailFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("aq")
    var emailDestinatario = req.body.emailServer;
    var emailRemetente = req.body.emailUsuario;
    var nome = req.body.nomeServer;
    var mensagem = req.body.mensagemServer;
    var senha = req.body.senhaUsuario;

    // Faça as validações dos valores
    if (emailDestinatario == undefined || emailRemetente == undefined || nome == undefined || mensagem == undefined || senha == undefined) {
        res.status(400).send("Informações do email estão undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        
        emailModel.emailFuncionario(emailDestinatario, emailRemetente, nome, mensagem, senha)
            .then(
                function (resultado) {
                    console.log(resultado)
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao mandar emaill! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    enviarEmail,
    emailFuncionario
}