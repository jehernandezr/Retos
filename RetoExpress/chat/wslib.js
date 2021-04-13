const WebSocket = require("ws");
const chatController = require("./controllers/chatController");
const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      if (message === "") { sendMessages(); }
      else {
        message = JSON.parse(message);
        let x = chatController.wsCreateMessage(message);
        if (x["details"]) {
          msg = "ERROR " + x.details[0].message;
          message = JSON.stringify(msg);
          ws.send(message);
        }
        sendMessages();
      }

    });
  });
};

const sendMessages = () => {
  clients.forEach((client) => {
    chatController.wsGetMessages().then((result) => {
      var array = [];
      result.forEach((mensaje) => {
        array.push(mensaje.dataValues);
      });
      messages = JSON.stringify(array);
      client.send(messages);
    });
  });
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;
