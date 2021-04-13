var express = require('express');
const Joi = require('joi');
const fs = require('fs');
const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000");
const Message = require("../model/Message");
//let messages = JSON.parse(fs.readFileSync("./data/messages.json"));


const  postMessage = (message) =>{
  const { error } = schema.validate(message);
  if (error) return res.status(400).send(error);
  return Message.create({
    author: message.author,
    message: message.message,
    ts: new Date().getTime(),
  }).then((response) => {
    return response;
  });
};

const getMessages=()=> {
  return Message.findAll().then((result) => {
    return result;
  });
};


/* Util Methods */

exports.wsGetMessages = getMessages;
exports.wsCreateMessage = postMessage;


const schema = Joi.object({
  author: Joi.string().required().pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+$")),

  message: Joi.string().min(5).required(),

  ts: Joi.number().integer()

});


exports.getAllMessages = function (req, res, next) {
  return Message.findAll().then((result) => {
    res.status(200).send(result);
  });

  
};

exports.createMessage = function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error);

  return Message.create({
    author: req.body.author,
    message: req.body.message,
    ts: new Date().getTime(),
  }).then((response) => {
    ws.send("");
    res.status(201).send(response);
  });
};

exports.getMessage = function (req, res, next) {

  return Message.findOne({
    where: {
      ts: req.params.ts,
    }
  }).then((message) => {
    if (message === null) {
      return res.status(404).send("The message with the given ts was not found.");
    } else return res.status(201).send(message);
  });

};

exports.updateMessage = function (req, res, next) {
  
  return Message.findOne({
    where: {
      ts: req.body.ts,
    },
  }).then((message) => {
    if (message === null) {
      return res.status(404).send("The message with the given ts was not found.");
    } else {
      if (error) return res.status(400).send(error);
      req.body.message += " (EDITED, last ts:" + req.body.ts + ")";
      req.body.ts = new Date().getTime();
      message.update(req.body).then((updated) => {
        ws.send("");
        return  res.status(200).send(updated);
      });
    }
  });


};

exports.deleteMessage = function (req, res, next) {

  return Message.findOne({
    where: {
      ts: req.params.ts,
    },
  }).then((message) => {
    if (message === null) {
      return res.status(404).send("The message with the given ts was not found.");
    } else {
      Message.destroy({
        where: {
          ts: req.params.ts,
        },
      });
      ws.send("");
      return   res.status(200).send(message);
    }
  });
};
