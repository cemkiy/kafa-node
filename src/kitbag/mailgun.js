const config = require('../config');
const mustache = require('mustache');
const path = require("path");
const fs = require('fs');

// Mailgun
const mailgun = require('mailgun.js');
var mg = mailgun.client({username: 'api', key: config.MAILGUN_API_KEY});

module.exports.sendMail = function(to, subject, message, button_text, button_link){
  filePath = path.join(__dirname, '../templates/email.html');
  fs.readFile(filePath, {
    encoding: 'utf-8'
  }, function(err, template_html) {
    if(err) return null; //TODO: Error notifications
    var view = {
      message: message,
      button_text: button_text,
      button_link: button_link
    }
    var output = mustache.render(template_html, view);
    mg.messages.create(config.MAILGUN_SANDBOX, {
      from: "Kafa.io <info@kafa.io>",
      to: [to],
      subject: subject,
      html: output
    })
      .then(msg => console.log("Sended email")) // logs response data
      .catch(err => console.log(err)); // logs any error
  });
}
