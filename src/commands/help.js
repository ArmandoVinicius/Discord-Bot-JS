const { commands } = require("../bot");

module.exports = {
  name: "help",
  description: "List all the commands.",
  usage: "!help",
  execute(message) {
    commands.map((command) =>
      message.channel.send(
        `\`\`\`Name: ${command.name} \nDescription: ${command.description} \nHow to use: ${command.usage}\`\`\``
      )
    );
  },
};
