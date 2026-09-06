const transporter = require("../routes/mailer");
const baseUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;

async function enviarContato(req, res) {
    const {
        nomeServer,
        emailServer,
        mensagemServer
    } = req.body;

    if(!nomeServer || !emailServer || !mensagemServer){
        return res.status(400).json({erro: "Preencha todos os campos."})
    }

    try{
        const linkCadastro = `${process.env.baseUrl}/cadastro-empresa.html`;

        //Esse email avisa que chegou um novo contato de cliente
        await transporter.sendMail({
            from: `"Site - Contato" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Novo contato de ${nomeServer}`,
            html: `
            <h3>Novo contato recebido</h3>
            <p><b>Nome:</b> ${nomeServer}</p>
            <p><b>Email:</b> ${emailServer}</p>
            <p><b>Mensagem:</b> ${mensagemServer}</p>
            `,
        });

        //Email que irá responder o cliente com o link de cadastro
        await transporter.sendMail({
            from: `"SENTRY" <${process.env.EMAIL_USER}>`,
            to: emailServer,
            subject: "Agradecemos seu contato!",
            html: `
            <p>Olá ${nomeServer},</p>
            <p>Recebemos sua mensagem e agradecemos o interesse!</p>
            <p>Para dar continuidade, você pode se cadastrar através do link abaixo:</p>
            <p><a href="${linkCadastro}">${linkCadastro}</a></p>
      `,
        });

        return res.status(200).json({sucesso: true});
    }
    catch(erro){
        console.error("Erro ao enviar email: ", erro);
        return res.status(500).json({erro: "Erro ao enviar email."})
    }

}

module.exports = {
    enviarContato
};
