const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages (1-100)",
  async execute(message, args) {
    // Permission check
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply(" You don’t have permission to use this command!").then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 5000);
      });
    }

    // Argument check
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply(" Please enter a number between 1 and 100!").then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 5000);
      });
    }

    // Pehle user ka command delete
    await message.delete().catch(() => {});

    try {
      await message.channel.bulkDelete(amount, true);

      // Embed confirmation
      const embed = new EmbedBuilder()
        .setColor("#FF4500")
        .setTitle(" Messages Cleared")
        .setDescription(` Successfully deleted **${amount}** messages!`)
        .setFooter({ text: `Action by ${message.author.tag}` })
        .setTimestamp();

      const reply = await message.channel.send({ embeds: [embed] });
      setTimeout(() => reply.delete().catch(() => {}), 5000); // Auto delete confirmation
    } catch (err) {
      console.error(err);
      const errorMsg = await message.channel.send(" Error while deleting messages!");
      setTimeout(() => errorMsg.delete().catch(() => {}), 5000);
    }
  },
};