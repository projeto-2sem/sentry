var empresa2Model = require("../models/empresa2Model");

async function cadastrar(req, res) {
    try{

    
    // empresa
    var nome_fantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    var razao_social = req.body.razaoSocialServer;

    //endereço
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    //adm
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    

    // Faça as validações dos valores
    if(nome_fantasia == undefined){
        res.status(400).send("Seu nome_fantasia está undefined!");
    }
     else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (razao_social == undefined) {
        res.status(400).send("Seu razao_social está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    }
    else if (logradouro == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    }
    else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }
    else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    }
    else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } 
    else {
        await empresa2Model.cadastrarEndereco(cep, estado, cidade, bairro, logradouro, numero, complemento)
        const resultado = await empresa2Model.buscarEndereco(cep, numero);
        const idEndereco = resultado[0].idEndereco;
        
        await empresa2Model.cadastrarEmpresa(nome_fantasia, razao_social, cnpj, idEndereco)
        const resultado2 = await empresa2Model.buscarEmpresa(idEndereco)
        const idEmpresa = resultado2[0].idEmpresa
        await empresa2Model.cadastrarAdm(nome, email, senha, idEmpresa)
    }

    }
    catch (erro) {

        console.error("Erro no controller:", erro);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar empresa.",
            erro: erro.message
        });

    }
}

module.exports = {
    cadastrar
}