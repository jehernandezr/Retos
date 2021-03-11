var express = require('express');
const Joi = require('joi');
const fs = require('fs');
const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000");
let messages = JSON.parse(fs.readFileSync("./data/messages.json"));




/* Util Methods */

const buildMessage = (message) => {
  let newMessage = {
    message: message.message,
    author: message.author,
    ts: new Date().getTime(),
  };
  return newMessage;
};

const addMessage = (message) => {
  messages.push(buildMessage(message));
  persist();
};

const persist = () => {
  fs.writeFileSync("./data/messages.json", JSON.stringify(messages));
};

exports.wsGetMessages = messages;
exports.wsCreateMessage = addMessage;


const schema = Joi.object({
  author: Joi.string().required().pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+$")),

  message: Joi.string().min(5).required(),

  ts: Joi.number().integer()

});


exports.getAllMessages = function (req, res, next) {
  res.status(200).send(messages);
};

exports.createMessage = function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error);

  addMessage({ message: req.body.message, author: req.body.author});
  res.status(201).send(messages);
  ws.send("");
};

exports.getMessage = function (req, res, next) {

  let message = messages.find((item) => item.ts === parseInt(req.params.ts));
  if (!message) return res.status(404).send("The message with the given ts was not found.");
  res.status(200).send(message);

};

exports.updateMessage = function (req, res, next) {
  let index = messages.findIndex((item) => item.ts === parseInt(req.body.ts));
  const { error } = schema.validate(req.body);
  if (index < 0) return res.status(404).send("The message with the given ts was not found.");
  if (error) return res.status(400).send(error);

  messages[index] = buildMessage(req.body);
  persist();
  res.status(200).send(messages);
  ws.send("");
};

exports.deleteMessage = function (req, res, next) {
  let index = messages.findIndex((item) => item.ts === parseInt(req.params.ts));
  if (index < 0) return res.status(404).send("The message with the given ts was not found.");
  /* TODO change splice */
  messages.splice(index, 1);
  persist();
  res.status(200).send(messages);
  ws.send("");
};
