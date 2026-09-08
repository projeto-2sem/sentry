const nodemailer = require("nodemailer");

async function transport_gmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter
}

async function enviarEmail(email) {
  console.log("Entrando para enviar email");

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const numero_aleatorio = Math.floor(
    Math.random() * (999999 - 100000) + 100000,
  );
  transport.sendMail({
    from: `Sentry <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mudança de senha no site da Sentry",
    html: `<h1>Você está requisitando uma nova senha</h1> <p>Seu código para usar no site é: <strong>${numero_aleatorio}</strong></p>`,
  });

  return numero_aleatorio;
}

module.exports = {
  enviarEmail,
  transport_gmail
};
