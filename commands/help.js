const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all available commands",
  execute(message) {
    // 👇 Categories with commands
    const categories = {
      "⚡ General": [
        "`Mping` — Check bot status",
        "`Mjoin` — Apply to join Mora Esport",
        "`Mabout` — Info about Mora Esport",
        "`Mavatar` — Get your avatar",
        "`Mafk <user>` — Set an AFK status"
      ],
      "🛡️ Moderation": [
        "`Mclear <1-100>` — Delete messages",
        "`Mslowdown <channel>` — Enable slowmode in a channel",
        "`Mtempdeafen <user>` — Temporarily deafen a member",
        "`Mdeafen <user>` — Deafen a member",
        "`Mundeafen <user>` — Undeafen a member",
        "`Mtempban <user>` — Temporarily ban a member",
        "`Mban <user>` — Ban a member",
        "`Munban <user>` — Unban a member",
        "`Mkick <user>` — Kick a member",
        "`Mtempmute <user>` — Temporarily mute a member",
        "`Mmute <user>` — Mute a member",
        "`Munmute <user>` — Unmute a member",
        "`Mtemprole <user> <role>` — Assign temporary role",
        "`Mgiverole <user> <role>` — Assign role",
        "`Munrole <user> <role>` — Remove role",
        "`Mserver` — Server information",
        "`Muser <user>` — User information",
        "`Mrole <role>` — Role information",
        "`Mticket` — Create a ticket channel"
      ],
      "🎮 Esports": [
        "`Mtournament delete <name>` — Delete a tournament",
        "`Mtournament create <name> <date> <time> <mode> <type:solo/duo/squad>` — Create a tournament",
        "`Mtournament winner <tournamentName> <teamName>` — Announce winner",
        "`Mtournament leaderboard` — Show leaderboard"
      ],
      "ℹ️ Help": [
        "`Mhelp` — Show this menu"
      ]
    };

    // 👇 Create embed
    const embed = new EmbedBuilder()
      .setColor("#1E90FF")
      .setTitle("📖 Mora Esport Bot — Help Menu")
      .setDescription("Use `M` as prefix before commands.\nExample: `Mping`\n\n**Commands are categorized for easier navigation.**")
      .setFooter({ text: "🔥 Mora Esport — India's Rising Esports Bot" })
      .setTimestamp();

    // 👇 Dynamically add fields from categories
    for (const [category, commands] of Object.entries(categories)) {
      embed.addFields({
        name: `\u200B\n${category}`, // adds spacing
        value: commands.join("\n"),
        inline: false
      });
    }

    // 👇 Send embed
    message.channel.send({ embeds: [embed] });
  },
};