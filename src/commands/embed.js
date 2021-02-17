module.exports = {
  name: "embed",
  description: "Personalized embed message.",
  usage: "!embed~[title]~[description]",
  execute(message, args) {
    if (args.length !== 2) {
      return message.channel.send(
        "```You should give-me two arguments separated by '~' (tilde). i.e: !embed~[title]~[description]. 🤖```"
      );
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(`${args[0]}`)
      .setColor("#7159c1")
      .setImage(message.author.displayAvatarURL())
      .setDescription(`${args[1]}`);
    message.channel.send(embed);
  },
};
