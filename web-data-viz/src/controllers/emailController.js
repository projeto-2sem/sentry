var emailModel = require("../models/emailModel");

function gerarCodigo() {
    let codigo = ""
    let vetorPossibilidades = [
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    ];
    for (let i = 0; i < 6; i++) {
        let ternario = Math.floor(Math.random() * 3);
        if (ternario == 0) {
            codigo += vetorPossibilidades[0][Math.floor(Math.random() * 26)]
        } else if (ternario == 1) {
            codigo += vetorPossibilidades[1][Math.floor(Math.random() * 26)]
        } else {
            codigo += vetorPossibilidades[2][Math.floor(Math.random() * 10)]
        }
    }
    return codigo;
}

function enviarEmail(req, res) {
    var email = req.params.emailServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        emailModel.enviarEmail(email)
            .then(function (resultado) {
                console.log(resultado);
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function enviarCodigo(req, res) {
    var email = req.body.emailServer;

    var codigo = gerarCodigo();

    if (!email) {
        return res.status(400).send("O e-mail está vazio!");
    }

    emailModel.enviarCodigoAtivacao(email, codigo)
        .then(function (resultado) {
            console.log("Código gerado e enviado:", codigo);
            res.json({ mensagem: "Código gerado e enviado com sucesso!", codigo });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function emailFuncionario(req, res) {
    var emailDestinatario = req.body.emailServer;
    var emailRemetente = req.body.emailUsuario;
    var nome = req.body.nomeServer;
    var mensagem = req.body.mensagemServer;
    var senha = req.body.senhaUsuario;

    if (emailDestinatario == undefined || emailRemetente == undefined || nome == undefined || mensagem == undefined || senha == undefined) {
        res.status(400).send("Informações do email estão undefined!");
    } else {
        emailModel.emailFuncionario(emailDestinatario, emailRemetente, nome, mensagem, senha)
            .then(function (resultado) {
                console.log(resultado);
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function enviarCodigoAtivacaoFuncionario(req, res) {
    var email = req.body.emailServer;
    var codigo = req.body.codigo;
    var nome = req.body.nomeGestor;

    if (!email) {
        return res.status(400).send("O e-mail está vazio!");
    } else if (!codigo) {
        return res.status(400).send("O código está vazio!");
    } else if (!nome) {
        return res.status(400).send("Seu nome está vazio!");
    }

    emailModel.enviarCodigoAtivacaoFuncionario(email, codigo, nome)
        .then(function (resultado) {
            console.log("Código gerado e enviado:", codigo);
            res.json({ mensagem: "Código gerado e enviado com sucesso!", codigo });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    enviarEmail,
    emailFuncionario,
    enviarCodigo,
    enviarCodigoAtivacaoFuncionario
};