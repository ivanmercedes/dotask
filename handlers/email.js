const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const emailConfig = require("../config/email");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: emailConfig.user, // generated ethereal user
    pass: emailConfig.pass, // generated ethereal password
  },
});

//Generar HTML
const generarHTML = (archivo, opciones = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${archivo}.pug`,
    opciones,
  );
  return juice(html);
};

exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones);
  const text = htmlToText.convert(html);
  // send mail with defined transport object
  let info = await transport.sendMail({
    from: '"Dotask 👻" <no-replay@dotask.com>', // sender address
    to: opciones.to, // list of receivers
    subject: opciones.subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};

// transport.sendMail(info);
