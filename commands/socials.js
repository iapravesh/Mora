const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "socials",
  description: "Mora Esport social media links",
  execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#5865F2") // Discord blue
      .setTitle(" Mora Esport | Official Socials")
      .setDescription(" Follow us & stay connected with Mora Esport!")
      .addFields(
        { name: " Instagram", value: "[@esportmora](https://instagram.com/esportmora)", inline: true },
        { name: " YouTube", value: "[@moraesport](https://youtube.com/@moraesport)", inline: true },
        { name: " X(Twitter)", value: "[@esportmora](https://x.com/esportmora)", inline: true },
        { name: " Twitch", value: "[@esportmora](https://twitch.tv/esportmora)", inline: true },
        { name: " Website", value: "[Mora Esport](https://mora.infy.uk)", inline: true },
        { name: " Discord", value: "[Join our server!](https://discord.gg/YM2jvSFaX9)", inline: true }
      )
      .setFooter({ text: " Mora Esport — India's Rising Esports Brand" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};