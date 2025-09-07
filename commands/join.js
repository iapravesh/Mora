const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "join",
  description: "Apply to join Mora Esport",
  execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#32CD32") // Lime green
      .setTitle("📝 Mora Esport Recruitment")
      .setDescription(
        "🔥 Want to be part of **Mora Esport**?\n\n" +
        "We’re always looking for talented **players, streamers & creators**!\n\n" +
        "📌 **Steps to Apply:**\n" +
        "1️⃣ Fill out our application form\n" +
        "2️⃣ Follow us on Instagram & join our Discord server\n" +
        "3️⃣ Wait for review by admins\n" +
        "4️⃣ If selected, you’ll be contacted on Discord/Email\n\n" +
        "👉 **Apply now using the link below!**"
      )
      .addFields(
        { name: "🌍 Application Form", value: "[Click Here to Apply](https://mora.infy.uk/dashboard/joinmora.php)", inline: false },
        { name: "📷 Instagram", value: "[@esportmora](https://instagram.com/esportmora)", inline: true },
        { name: "💌 Discord", value: "[Join our server!](https://discord.gg/YM2jvSFaX9)", inline: true },
        { name: "💬 Contact", value: "For queries, DM an admin.", inline: false }
      )
      .setFooter({ text: "🔥 Mora Esport — India's Rising Esports Brand" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};