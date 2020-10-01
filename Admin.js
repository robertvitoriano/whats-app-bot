const fs = require("fs");
const { Client, Location, Chat, MessageMedia } = require("whatsapp-web.js");

class Admin {
  constructor() {
    const SESSION_FILE_PATH = "./session.json";
    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH);
    }
    const client = new Client({
      puppeteer: { headless: false },
      session: sessionCfg,
    });
    client.initialize();
  }
}

module.exports = Admin
