const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "about",
  description: "Know more about Mora Esport",
  execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#00BFFF") // Light blue
      .setTitle("✨ About Mora Esport")
      .setDescription(
        "🎮 **Mora Esport** is India's rising esports brand.\n\n" +
        "We are dedicated to building a strong gaming community by hosting **scrims, tournaments, live streams, and content creation**. " +
        "Our goal is to support players, promote talent, and represent India on the global esports stage. 🌍"
      )
      .addFields(
        { name: "📌 Established", value: "2025", inline: true },
        { name: "🔥 Focus", value: "Esports • Content • Community", inline: true },
        { name: "👥 Squad", value: "Quantum Worries", inline: true }
      )
      .setFooter({ text: "🚀 Mora Esport — Play. Compete. Conquer." })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },

};
