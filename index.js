// ================= Mora Esport Bot =================
// Author: Pravesh Singh Patel
// GitHub: https://github.com/iapravesh/Mora
// ================================================


// index.js
require("dotenv").config();
const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.TOKEN;
const PREFIX = "M"; // Fixed prefix

// === Client Setup ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// === Load Commands Dynamically ===
fs.readdirSync("./commands").forEach(file => {
  if (file.endsWith(".js")) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
  }
});

// === When Bot is Ready ===
client.once("ready", () => {
  console.log(` Logged in as ${client.user.tag}`);
});

// === Message Listener ===
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (client.commands.has(commandName)) {
      try {
        client.commands.get(commandName).execute(message, args);
      } catch (err) {
        console.error(err);
        message.reply(" Error executing command!");
      }
    }
  }
});

// === Login Bot ===
client.login(TOKEN);