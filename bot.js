'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Conectado como @${client.user.tag}!`);
});

client.on('message', (message) => {
  if (!message.author.bot) {
    const arrContent = message.content.split('-');
    if (arrContent.length === 3 && arrContent[0] === '!embutida') {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${arrContent[1]}`)
        .setColor('#7159c1')
        .setImage(message.author.displayAvatarURL())
        .setDescription(`${arrContent[2]}`);
      message.channel.send(embed);
    } else if (arrContent[0] === '!embutida' && arrContent.length !== 3) {
      message.channel.send(
        'Algo de errado não está certo 🤔 \nA sintaxe correta para esse comando é ```> !embutida-[titulo]-[descrição]```',
      );
    }
  }
});

client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  const embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setDescription(
      `Seja bem vindo @${member.user.username} \n Aproveite o servidor!`,
    )
    .setColor('#78FE96')
    .setTitle('Novo membro!  :tada:')
    .setTimestamp(Date.now());
  const defaultChannel = guild.channels.cache
    .filter((chx) => chx.name === 'new-users')
    .find((x) => x.position === 2);
  defaultChannel.send(embed);
});

client.login(process.env.CLIENT_LOGIN);
