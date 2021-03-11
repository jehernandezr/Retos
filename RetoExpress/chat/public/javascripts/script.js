const ws = new WebSocket("ws://localhost:3000");


ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p><strong>Mensaje</strong>: ${item.message}, <strong>Autor</strong>: ${item.author}, <strong>Ts</strong>: ${item.ts}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const author = document.getElementById("author");
  console.log("manejando submit antes", ws.readyState);
  //ws.send(("client;" + message.value + ";" + author.value));
  let ms=JSON.stringify({message:message.value, author:author.value});
  console.log(ms)
  ws.send(ms);
  console.log("manejando submit", ws.readyState);
  message.value = "";
  author.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);