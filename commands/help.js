const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all available commands",
  execute(message) {
    // 👇 Categories with commands (easily editable)
    const categories = {
      "⚡ General": [
        "`Mping` → Check bot status",
        "`Msocials` → Show Mora Esport links",
        "`Mjoin` → Apply to join Mora Esport",
        "`Mabout` → Info about Mora Esport"
      ],
      "🛡️ Moderation": [
        "`Mclear <1-100>` → Delete messages",
        "`Mban <user>` → Ban a member",
        "`Munban <user>` → Unban a member",
        "`Mkick <user>` → Kick a member",
        "`Mmute <user>` → Mute a member",
        "`Munmute <user>` → Unmute a member"
      ],
      "🎮 Esports": [
        "`Mtournament` → Tournament details",
        "`Mregister <team>` → Register a team"
      ],
      "ℹ️ Help": [
        "`Mhelp` → Command menu"
      ]
    };

    // 👇 Create embed
    const embed = new EmbedBuilder()
      .setColor("#1E90FF")
      .setTitle("📖 Mora Esport Bot — Help Menu")
      .setDescription("Use `M` as prefix before commands.\nExample: `Mping`");

    // 👇 Dynamically add fields from categories
    for (const [category, commands] of Object.entries(categories)) {
      embed.addFields({
        name: category,
        value: commands.join("\n"),
        inline: false,
      });
    }

    embed.setFooter({ text: "🔥 Mora Esport — India's Rising Esports Bot" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};