const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const filePath = "./tournaments.json";

function loadTournaments() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ tournaments: {}, leaderboard: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath));
}

function saveTournaments(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  name: "tournament",
  description: "Manage tournaments: create, delete, leaderboard, winner, detail, join",

  async execute(message, args) {
    const data = loadTournaments();
    const tournaments = data.tournaments;

    const subcommand = args.shift();
    if (!subcommand) return message.channel.send(" Usage: Mtournament <create|delete|leaderboard|winner|detail>");

    switch (subcommand.toLowerCase()) {

      // === CREATE TOURNAMENT ===
      case "create": {
        const [name, date, time, mode, type] = args;
        if (!name || !date || !time || !mode || !type) return message.channel.send(
          " Usage: Mtournament create <name> <date> <time> <mode> <type:solo/duo/squad>"
        );

        if (tournaments[name]) return message.channel.send(" Tournament already exists!");

        let maxTeams, waitingTeams;
        switch (type.toLowerCase()) {
          case "solo": maxTeams = 48; waitingTeams = 5; break;
          case "duo": maxTeams = 24; waitingTeams = 3; break;
          case "squad": maxTeams = 12; waitingTeams = 2; break;
          default: return message.channel.send(" Type must be solo, duo, or squad!");
        }

        tournaments[name] = {
          date,
          time,
          mode,
          type,
          maxTeams,
          waitingTeams,
          teams: [],
          waitingList: [],
          winner: null
        };
        saveTournaments(data);

        const guild = message.guild;
        guild.channels.create({
          name: `${name}-registration`,
          type: 0,
          reason: `Tournament registration for ${name}`
        }).then(channel => {
          channel.send({
            content: ` Tournament **${name}** created!\n` +
              `**Date:** ${date} | **Time:** ${time}\n` +
              `**Mode:** ${mode} | **Type:** ${type}\n` +
              `**Max Teams:** ${maxTeams} | **Waiting:** ${waitingTeams}\n\n` +
              `To join, submit your registration like this:\n` +
              "```\nTeam name : XYZ\nPlayer 1 : @P1\nUID : 1234\nPlayer 2 : @P2\nUID : 5678\nPlayer 3 : @P3\nUID : 9101\nPlayer 4 : @P4\nUID : 1121\n```"
          });
        });

        message.channel.send({ content: ` Tournament **${name}** created successfully!` });
        break;
      }

      // === DELETE TOURNAMENT ===
      case "delete": {
        const name = args.shift();
        if (!name) return message.channel.send(" Provide tournament name to delete!");
        if (!tournaments[name]) return message.channel.send(" Tournament not found!");
        delete tournaments[name];
        saveTournaments(data);
        message.channel.send({ content: ` Tournament **${name}** deleted!` });
        break;
      }

      // === LEADERBOARD ===
      case "leaderboard": {
        const teamsWins = {};

        // Count wins per team from all tournaments
        for (const tName in tournaments) {
          const t = tournaments[tName];
          if (t.winner) {
            const team = t.teams.find(team => team.name === t.winner);
            if (!team) continue;

            if (!teamsWins[t.winner]) {
              teamsWins[t.winner] = { wins: 1, members: team.players };
            } else {
              teamsWins[t.winner].wins += 1;
            }
          }
        }

        if (Object.keys(teamsWins).length === 0) 
          return message.channel.send(" No winners yet!");

        const sorted = Object.entries(teamsWins).sort((a, b) => b[1].wins - a[1].wins);
        const top = sorted.slice(0, 10);

        const embed = new EmbedBuilder()
          .setTitle(" Tournament Leaderboard - Top 10 Teams")
          .setColor(0xFFD700)
          .setTimestamp();

        top.forEach(([teamName, info], index) => {
          const membersMentions = info.members.map(id => `<@${id}>`).join(", ");
          embed.addFields({
            name: `#${index + 1} ${teamName}`,
            value: ` Total Wins: ${info.wins}\n Members: ${membersMentions}`,
            inline: false
          });
        });

        message.channel.send({ embeds: [embed] });
        break;
      }

      // === WINNER ===
      case "winner": {
        const name = args.shift();
        const teamName = args.join(" ");
        if (!name || !teamName) return message.channel.send(" Usage: Mtournament winner <tournamentName> <teamName>");
        if (!tournaments[name]) return message.channel.send(" Tournament not found!");

        tournaments[name].winner = teamName;
        saveTournaments(data);
        message.channel.send({ content: ` Winner of **${name}** is **${teamName}**!` });
        break;
      }

      // === DETAIL ===
      case "detail": {
        const name = args.shift();
        if (!name) return message.channel.send(" Provide tournament name!");
        if (!tournaments[name]) return message.channel.send(" Tournament not found!");
        const t = tournaments[name];

        const embed = new EmbedBuilder()
          .setTitle(` Tournament Details: ${name}`)
          .setColor(0x00BFFF)
          .addFields(
            { name: "Date", value: t.date, inline: true },
            { name: "Time", value: t.time, inline: true },
            { name: "Mode", value: t.mode, inline: true },
            { name: "Type", value: t.type, inline: true },
            { name: "Teams Registered", value: `${t.teams.length}/${t.maxTeams}`, inline: true },
            { name: "Waiting List", value: `${t.waitingList.length}/${t.waitingTeams}`, inline: true },
            { name: "Winner", value: t.winner || "TBD", inline: true }
          );

        message.channel.send({ embeds: [embed] });
        break;
      }

      default:
        message.channel.send(" Unknown subcommand! Use create, delete, leaderboard, winner, detail");
    }
  }
};

// === JOIN LISTENER ===
module.exports.listener = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    const data = loadTournaments();
    const tournaments = data.tournaments;

    const tournamentName = Object.keys(tournaments).find(t => message.channel.name === `${t}-registration`);
    if (!tournamentName) return;

    const tournament = tournaments[tournamentName];

    const lines = message.content.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length !== 9) return message.reply(" Invalid format! Use structured registration with 4 players and UIDs");

    const teamName = lines[0].split(":")[1].trim();
    const players = [];
    const uids = [];

    for (let i = 1; i <= 4; i++) {
      const playerMention = message.mentions.members.at(i - 1);
      if (!playerMention) return message.reply(` Player ${i} not mentioned correctly!`);
      players.push(playerMention.id);
      const uid = lines[i * 2].split(":")[1].trim();
      uids.push(uid);
    }

    if (tournament.teams.find(t => t.name.toLowerCase() === teamName.toLowerCase()) ||
        tournament.waitingList.find(t => t.name.toLowerCase() === teamName.toLowerCase())) {
      return message.reply(" Team name already exists!");
    }

    const allPlayers = [...tournament.teams.flatMap(t => t.players), ...tournament.waitingList.flatMap(t => t.players)];
    if (players.some(p => allPlayers.includes(p))) return message.reply(" One or more players are already in another team!");

    if (tournament.teams.length < tournament.maxTeams) {
      tournament.teams.push({ name: teamName, players, uids });
    } else if (tournament.waitingList.length < tournament.waitingTeams) {
      tournament.waitingList.push({ name: teamName, players, uids });
    } else {
      return message.reply(" Tournament and waiting list are full!");
    }

    saveTournaments(data);

    const embed = new EmbedBuilder()
      .setTitle(` Team Registered: ${teamName}`)
      .setColor(0x00FF00)
      .addFields(
        { name: "Players", value: players.map(id => `<@${id}>`).join("\n"), inline: true },
        { name: "UIDs", value: uids.join("\n"), inline: true },
        { name: "Status", value: tournament.teams.find(t => t.name === teamName) ? "Registered" : "Waiting List", inline: true }
      )
      .setFooter({ text: `Tournament: ${tournamentName}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};