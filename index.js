const fs = require("fs");
const { Client, Location, Chat } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
  puppeteer: { headless: false },
  session: sessionCfg,
});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();

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

client.on("message", async (msg) => {
  const chats = await client.getChats();
  const gustChat = chats.filter((chat) => chat.name === "Gus Bot");
  const chat = gustChat[0];
  switch (msg.body) {
    case "limpar":
      await chat[0].clearMessages();
      break;
    case "finalizar":
      await chat[0].clearMessages();

      break;

    default:
      break;
  }
  await gustChat[0].clearMessages();
  console.log(chat);
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});
