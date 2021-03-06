const fs = require("fs");
const { Client, Location, Chat, MessageMedia } = require("whatsapp-web.js");


module.exports = {

  async createClient() {
    const SESSION_FILE_PATH = "./session.json";
    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH);
    }

    this.client = new Client({
      puppeteer: { headless: false },
      session: sessionCfg,
    });

    client.initialize();
  },

  async sendFile(url,number) {
    const adress = `55${number}@c.us`
    const buffer = fs.readFileSync(url);
    const encodedFile = buffer.toString("base64");
    let file;
    if(mediaType==="audio/ogg"){
        await chat.sendStateRecording();
         file = new MessageMedia("audio/ogg", encodedFile, url);

    }else{
         file = new MessageMedia("audio/ogg", encodedFile, url);

    }
    this.client.sendMessage(adress, file);
  },

};
