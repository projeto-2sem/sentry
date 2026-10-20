var empresaModel = require("../models/empresaModel");

async function cadastrar(req, res) {

    try {
        var nome_fantasia = req.body.nomeFantasiaServer;
        var cnpj = req.body.cnpjServer;
        var razao_social = req.body.razaoSocialServer;
        var cep = req.body.cepServer;
        var estado = req.body.estadoServer;
        var cidade = req.body.cidadeServer;
        var bairro = req.body.bairroServer;
        var logradouro = req.body.logradouroServer;
        var numero = req.body.numeroServer;
        var complemento = req.body.complementoServer;
        var nome = req.body.nomeServer;
        var email = req.body.emailServer;
        var senha = req.body.senhaServer;

        if (!nome_fantasia || !cnpj || !razao_social || !cep || !estado || !logradouro || !numero || !cidade || !bairro || !nome || !email || !senha) {
            return res.status(400).send("Preencha todos os campos obrigatórios!");
        }

        await empresaModel.cadastrarEndereco(cep, estado, cidade, bairro, logradouro, numero, complemento);
        const resultado = await empresaModel.buscarEndereco(cep, numero);
        const idEndereco = resultado[0].idEndereco;
        
        await empresaModel.cadastrarEmpresa(nome_fantasia, razao_social, cnpj, idEndereco);
        const resultado2 = await empresaModel.buscarEmpresa(idEndereco);
        const idEmpresa = resultado2[0].idEmpresa;
        
        await empresaModel.cadastrarAdm(nome, email, senha, idEmpresa);

        return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });

    } catch (erro) {
        console.error("Erro no controller:", erro);
        return res.status(500).json({
            mensagem: "Erro ao cadastrar empresa.",
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar
};