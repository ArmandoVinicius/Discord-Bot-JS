module.exports = {
  name: "beep",
  description: "Boop!",
  usage: "!beep",
  execute(message) {
    message.channel.send("```Boop!```");
  },
};
