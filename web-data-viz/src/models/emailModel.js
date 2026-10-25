var database = require("../database/config");
const nodemailer = require("nodemailer");

async function transport_gmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

async function enviarCodigoAtivacao(email, codigo) {
  console.log("Salvando código no banco de dados e enviando e-mail...");
  
  var instrucaoSql = `
    INSERT INTO codigo_ativacao (codigoAtivacao, usado, fkCargo, fkEmpresa) 
    VALUES ('${codigo}', 0, NULL, NULL);
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  await database.executar(instrucaoSql);


  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: `Sentry <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Código de Ativação - Sentry",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563eb;">Bem-vindo à Sentry!</h2>
        <p>Você solicitou o cadastro da sua empresa na nossa plataforma.</p>
        <p>Utilize o código de ativação abaixo:</p>
        <div style="background-color: #f3f4f6; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; border-radius: 5px; margin: 20px 0;">
          ${codigo}
        </div>
        <p style="font-size: 12px; color: #666;">Se você não solicitou este cadastro, ignore este e-mail.</p>
      </div>
    `,
  });

  return codigo;
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

async function emailFuncionario(emailDestinatario, emailRemetente, nome, mensagem, senha) {
  console.log("Entrando para enviar email");
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailRemetente,
      pass: senha,
    },
  });

  transport.sendMail({
    from: `Sentry <${emailRemetente}>`,
    to: `${emailDestinatario}`,
    subject: "Mudança de senha no site da Sentry",
    html: `<h1>${nome}<h1><p>${mensagem}</p>`,
  });
}

module.exports = {
  enviarEmail,
  transport_gmail,
  emailFuncionario,
  enviarCodigoAtivacao
};