const aws = require("aws-sdk");
const Handler = require("./handler");

const rekoSvc = new aws.Rekognition();
const translatorSvc = new aws.Translate();

const handler = new Handler({
  rekoSvc,
  translatorSvc,
});

//nota: bind assegura  que o contexto this é a instancia de handler
module.exports = handler.main.bind(handler);
