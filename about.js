const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Know more about Mora Esport"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("✨ About Mora Esport")
      .setThumbnail("https://mora.infy.uk/logo.png") // ✅ Mora Esport Logo
      .setDescription(
        "🎮 **Mora Esport** is India's rising esports brand.\n\n" +
        "We host **scrims, tournaments, live streams, and content creation**. " +
        "Our mission is to support players, promote talent, and represent India on the **global esports stage** 🌍\n\n" +
        "✨ Follow us & stay connected with Mora Esport!"
      )
      .addFields(
        { name: "📷 Instagram", value: "[**@esportmora**](https://instagram.com/esportmora)", inline: true },
        { name: "▶️ YouTube", value: "[**@moraesport**](https://youtube.com/@moraesport)", inline: true },
        { name: "🐦 X (Twitter)", value: "[**@esportmora**](https://x.com/esportmora)", inline: true },
        { name: "📺 Twitch", value: "[**@esportmora**](https://twitch.tv/esportmora)", inline: true },
        { name: "🌐 Website", value: "[**mora.infy.uk**](https://mora.infy.uk)", inline: true },
        { name: "💌 Discord", value: "[**Join our server!**](https://discord.gg/YM2jvSFaX9)", inline: true }
      )
      .setFooter({ text: "🚀 Mora Esport — Play. Compete. Conquer." })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};