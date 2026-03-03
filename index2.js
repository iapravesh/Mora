// ================= Mora Esport Bot =================
// Author: Pravesh Singh Patel
// GitHub: https://github.com/iapravesh/Mora
// ================================================

require("dotenv").config();
const fs = require("fs");
const { 
  Client, 
  Collection, 
  GatewayIntentBits, 
  ActivityType, 
  REST, 
  Routes 
} = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID; // Bot Application (Client) ID
const PREFIX = "M"; // Fixed prefix

// === Client Setup ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();       // Prefix commands
client.slashCommands = new Collection();  // Slash commands

// === Slash Commands Array for Deployment ===
const slashCommands = [];

// === Load Prefix Commands ===
fs.readdirSync("./prefix").forEach(file => {
  if (!file.endsWith(".js")) return;
  const cmd = require(`./prefix/${file}`);
  if (cmd.name && cmd.executeMessage) {
    client.commands.set(cmd.name, cmd);
  }
});

// === Load Slash Commands ===
fs.readdirSync("./slash").forEach(file => {
  if (!file.endsWith(".js")) return;
  const cmd = require(`./slash/${file}`);
  if (cmd.data && cmd.execute) {
    slashCommands.push(cmd.data.toJSON());
    client.slashCommands.set(cmd.data.name, cmd);
  }
});

// === Deploy Slash Commands Globally ===
const rest = new REST({ version: "10" }).setToken(TOKEN);
(async () => {
  try {
    console.log("🔄 Registering slash commands...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
    console.log("✅ Slash commands registered globally.");
  } catch (err) {
    console.error("❌ Error registering slash commands:", err);
  }
})();

// === When Bot is Ready ===
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // === Status Data (CRP) ===
  let statusIndex = 0;
  const statuses = [
    { text: "🎮 Managing Tournaments", type: ActivityType.Playing },
    { text: "👀 Watching Servers", type: ActivityType.Watching },
    { text: "🎤 Hosting Scrims", type: ActivityType.Listening }
  ];

  setInterval(() => {
    const status = statuses[statusIndex];
    client.user.setPresence({
      activities: [{ name: status.text, type: status.type }],
      status: "online"
    });
    statusIndex = (statusIndex + 1) % statuses.length;
  }, 15000);
});

// === Prefix Command Listener ===
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    client.commands.get(commandName).executeMessage(message, args);
  } catch (err) {
    console.error("❌ Prefix Command Error:", err);
    message.reply("⚠️ Error executing command!");
  }
});

// === Slash Command Listener ===
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error("❌ Slash Command Error:", err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "⚠️ Error executing slash command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "⚠️ Error executing slash command!", ephemeral: true });
    }
  }
});

// === Login Bot ===
client.login(TOKEN);