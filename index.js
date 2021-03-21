const Bot = require('./wpp-bot.js');
const fs = require('fs')
const bot  = new Bot();



bot.client.on("qr", (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log("QR RECEIVED", qr);
});

bot.client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile('./session.json', JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

bot.client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessfull
  console.error("AUTHENTICATION FAILURE", msg);
});

bot.client.on("ready", () => {
  console.log("READY");
});

let isMenuOpen = false;

bot.client.on("message", async (msg) => {
  if (!isMenuOpen) {
    if (msg.from === "5511943815306@c.us") {
      console.log("FROM: ", msg.from);
      const chats = await bot.client.getChats();
      const gustChat = chats.filter((chat) => chat.name === "Gus bot.client");
      const chat = gustChat[0];
      bot.client.sendMessage(
        msg.from,
        "Seja-bem vindo(a) ao menu, digite um dos números abaixo e selecione a opção que você deseja"
      );
      bot.client.sendMessage(
        msg.from,
        "1 - ouvir uma música\n2 - ver um gatinho\n 3 - sair do menu"
      );
      isMenuOpen = true;
    }
  }
});
bot.client.on("message", async (msg) => {
  
    const chats = await bot.client.getChats();
    const gustChat = chats.filter((chat) => chat.name === "Gus bot.client");
    const chat = gustChat[0];
  if (isMenuOpen) {
    if (msg.from === "5511930855040@c.us") {
      switch (msg.body) {
        case "1":
          const rockyBuffer = fs.readFileSync("./assets/theme_rocky.mp3");
          const song64 = rockyBuffer.toString("base64");
          await chat.sendStateRecording();
          const music = new MessageMedia(
            "audio/ogg",
            song64,
            "./assets/theme_rocky.mp3"
          );
          bot.client.sendMessage(msg.from, music);
          break;
        case "2":
          const file_buffer = fs.readFileSync("./assets/gatinho.jpg");
          const gatinho64 = file_buffer.toString("base64");
          const img = new MessageMedia(
            "image/jpeg",
            gatinho64,
            "./assets/gatinho.jpg"
          );
          bot.client.sendMessage(msg.from, img);
          break;
        case "3":
          bot.client.sendMessage(msg.from, "Obrigado por utilizar nossos serviços");
          break;
        default:
          break;
      }
    }
  }
});
bot.client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});
