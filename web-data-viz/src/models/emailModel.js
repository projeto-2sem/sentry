const nodemailer = require('nodemailer')

async function enviarEmail(email) {
    console.log("Entrando para enviar email");

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        "port": 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHA_GMAIL
        }
    })
    const numero_aleatorio = Math.floor(Math.random() * (999999 - 100000) + 100000)
    transport.sendMail({
        from: `Sentry <${process.env.EMAIL}>`,
        to: email,
        subject: "Mudança de senha no site da Sentry",
        html: `<h1>Você está requisitando uma nova senha</h1> <p>Seu código para usar no site é: <strong>${numero_aleatorio}</strong></p>`
    })

    return numero_aleatorio
    
}

module.exports = {
    enviarEmail
};