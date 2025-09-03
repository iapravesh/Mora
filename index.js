const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ✅ Bot Ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// 🎉 Welcome Message
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.systemChannel;
  if (channel) {
    channel.send(`🎮 Welcome ${member.user.username} to **Mora Esport**! 💜`);
  }
});

// 📢 Custom Commands
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = "!";
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "scrim") {
    message.reply("⚡ Next Scrim details will be announced on Discord & Instagram @esportmora!");
  } else if (command === "tournament") {
    message.reply("🏆 Tournament registrations open soon! Stay tuned.");
  } else if (command === "socials") {
    message.reply("📲 Follow us:\n- Instagram: @esportmora\n- YouTube: @moraesport\n- Discord: Join our community!");
  } else if (command === "clear") {
    if (!message.member.permissions.has("ManageMessages")) return message.reply("🚫 You don’t have permission!");
    let count = parseInt(args[0]);
    if (isNaN(count)) return message.reply("⚠️ Please enter number of messages to delete.");
    await message.channel.bulkDelete(count, true);
    message.channel.send(`🧹 Cleared ${count} messages!`);
  }
});

client.login(process.env.TOKEN);