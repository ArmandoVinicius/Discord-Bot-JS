require("dotenv").config();
const token = process.env.CLIENT_LOGIN;
const prefix = process.env.PREFIX;

/* const { pool } = require("./config/Connection"); */

const fs = require("fs");
const Discord = require("discord.js");

global.Discord = Discord;

const client = new Discord.Client();
client.commands = new Discord.Collection();

exports.commands = client.commands;

const commandFiles = fs
  .readdirSync(`${__dirname}/commands`)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`${__dirname}/commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(`Conectado como @${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (client.commands.has(commandName)) {
    try {
      const command = client.commands.get(commandName);
      command.execute(message, args);
    } catch (err) {
      console.log(err);
    }
  } else {
    message.reply("Something went wrong. 🤖\nTry !help to see the command");
  }
});

/* client.on("message", (message) => {
  if (!message.author.bot) {
    const arrContent = message.content.split("-");
    if (arrContent.length === 3 && arrContent[0] === "!add_regra") {
      try {
        pool.query(
          `INSERT INTO rules (
              rule_id,
              rule_description,
              rule_punishment
            ) VALUES (
              DEFAULT, '${arrContent[1]}', '${arrContent[2]}'
            );`,
          (err, rows) => {
            if (err) {
              console.log(err);
            }
            message.channel.send(`Regra adicionada: ${arrContent[1]}`);
            console.log(
              `Linhas do banco de dados alteradas: ${rows.affectedRows}`
            );
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else if (arrContent[0].slice(0, 1) === "!") {
      message.channel.send(
        "Beep-boop, o que você quis dizer com isso?  \nVeja a lista de comandos usando: ```!comandos```"
      );
    }
  }
}); */

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setDescription(
      `Seja bem vindo @${member.user.username} \n Aproveite o servidor!`
    )
    .setColor("#78FE96")
    .setTitle("Novo membro!  :tada:")
    .setTimestamp(Date.now());
  const defaultChannel = guild.channels.cache
    .filter((chx) => chx.name === "new-users")
    .find((x) => x.position === 2);
  defaultChannel.send(embed);
});

client.login(token);
