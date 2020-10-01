const fs = require("fs");
const { Client, Location, Chat, MessageMedia } = require("whatsapp-web.js");
modelu.exports = {
  async createClient() {
    const SESSION_FILE_PATH = "./session.json";
    let sessionCfg;
    let meny
    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH);
    }

    const client = new Client({
      puppeteer: { headless: false },
      session: sessionCfg,
    });

    client.initialize();
  },
  async sendAudio(url) {
    const buffer = fs.readFileSync(url);
    const encodedFile = buffer.toString("base64");
    await chat.sendStateRecording();
    const music = new MessageMedia("audio/ogg", encodedFile, url);
    client.sendMessage(msg.from, music);
  },
};
