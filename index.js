const Bot = require('./WhatsAppBot.js');

const bot  = new Bot();

bot.sendFile('')


client.on("qr", (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log("QR RECEIVED", qr);
});

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessfull
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("READY");
});

let isMenuOpen = false;

client.on("message", async (msg) => {
  if (!isMenuOpen) {
    if (msg.from === "5511930855040@c.us") {
      console.log("FROM: ", msg.from);
      const chats = await client.getChats();
      const gustChat = chats.filter((chat) => chat.name === "Gus Bot");
      const chat = gustChat[0];
      client.sendMessage(
        msg.from,
        "Seja-bem vindo(a) ao menu, digite um dos números abaixo e selecione a opção que você deseja"
      );
      client.sendMessage(
        msg.from,
        "1 - ouvir uma música\n2 - ver um gatinho\n 3 - sair do menu"
      );
      isMenuOpen = true;
    }
  }
});
client.on("message", async (msg) => {
  
    const chats = await client.getChats();
    const gustChat = chats.filter((chat) => chat.name === "Gus Bot");
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
          client.sendMessage(msg.from, music);
          break;
        case "2":
          const file_buffer = fs.readFileSync("./assets/gatinho.jpg");
          const gatinho64 = file_buffer.toString("base64");
          const img = new MessageMedia(
            "image/jpeg",
            gatinho64,
            "./assets/gatinho.jpg"
          );
          client.sendMessage(msg.from, img);
          break;
        case "3":
          client.sendMessage(msg.from, "Obrigado por utilizar nossos serviços");
          break;
        default:
          break;
      }
    }
  }
});
client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});
