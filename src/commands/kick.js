module.exports = {
  name: "kick",
  description: "Kick a user from this server.",
  usage: "!kick @user",
  execute(message) {
    const user = message.mentions.users.first();
    const author = message.guild.member(message.author);

    if (author.hasPermission("KICK_MEMBERS")) {
      if (user) {
        const member = message.guild.member(user);

        if (!member.roles.cache.has("811286661878382643")) {
          if (member) {
            member
              .kick()
              .then(() => {
                message.reply(
                  `the member: ${user.tag} has been successfully kicked`
                );
              })
              .catch((err) => {
                message.reply(
                  "an error occurred and we were unable to kick this member"
                );
                console.log(err);
              });
          } else {
            message.reply("this user is not in this server!");
          }
        } else {
          message.reply("this user can not be kicked from this server!");
        }
      } else {
        message.reply("you should mention who you want to kick!");
      }
    } else {
      message.reply("you do not have sufficient permission to do this action!");
    }
  },
};
