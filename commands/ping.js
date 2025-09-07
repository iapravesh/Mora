const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check the bot's response time",
  execute(message) {
    const ping = Date.now() - message.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor("#FFD700") // Gold color
      .setTitle("🏓 Pong!")
      .setDescription(`Latency is **${ping}ms**`)
      .setFooter({ text: "🔥 Mora Esport Bot" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};