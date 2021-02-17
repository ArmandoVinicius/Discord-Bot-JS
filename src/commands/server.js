module.exports = {
  name: "server",
  description: "Server infos!",
  usage: "!server",
  execute(message) {
    message.channel.send(
      `
      \`\`\`Nome do servidor: ${message.guild.name}\nTotal de membros: ${message.guild.memberCount}\`\`\`
      `
    );
  },
};
