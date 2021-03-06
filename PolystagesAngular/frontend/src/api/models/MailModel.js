'user strict';

const mailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const config = require('../config');
const smtpTransport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmail.user,
    pass: config.gmail.mdp
  }
});

exports.getcurrentDate = function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date
}


exports.send_mail_attach = function (destinataire, sujet, corps, nomfich, path) {
  const mailOptions = {
    from: config.gmail.user,
    to: config.gmail.user, //destinataire, // Sécurité pour n'envoyer le mail qu'au compte test
    subject: sujet,
    html: corps,
    attachments: [{
      filename: nomfich,
      contentType: 'application/pdf',
      path: path
    }
    ]
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("Erreur lors de l'envoie du mail!");
            console.log(error);
        }
        smtpTransport.close();
    });
}

exports.send_mail = function (destinataire, sujet, corps) {
  const mailOptions = {
    from: config.gmail.user,
    to: config.gmail.user, //destinataire, // Sécurité pour n'envoyer le mail qu'au compte test
    subject: sujet,
    html: corps
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("Erreur lors de l'envoie du mail!");
            console.log(error);
        }
        smtpTransport.close();
    });
}
