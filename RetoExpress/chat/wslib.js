const WebSocket = require("ws");
const chatController = require("./controllers/chatController");
const clients = [];
let messages = chatController.wsGetMessages;

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
        //if (message.split(";")[0] == "client") chatController.wsCreateMessage({ message: message.split(";")[1], author: message.split(";")[2] });
        if(message==="")
        { sendMessages();}
        else{
        chatController.wsCreateMessage(JSON.parse(message));
        this.messages =chatController.wsGetMessages;
        sendMessages();
        //console.log("server", ws.readyState);
        }
    });
    
    
  });

  const sendMessages = () => {

  clients.forEach((client) => {
    mess=JSON.stringify(messages);
    client.send(mess);
    
  }
  );

  };

};

exports.wsConnection = wsConnection;