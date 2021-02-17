module.exports = {
  name: "ban",
  description: "Ban an user from this server",
  usage: "!ban @user",
  execute(message) {
    const user = message.mentions.users.first();
    const author = message.guild.member(message.author);

    if (author.hasPermission("BAN_MEMBERS")) {
      if (user) {
        const member = message.guild.member(user);

        if (!member.roles.cache.has("811286661878382643")) {
          if (member) {
            member
              .ban({
                reason:
                  "you have been banned from this server for breach of one or more rules",
              })
              .then(() => {
                message.reply(
                  `the member: ${user.tag} has been successfully banned`
                );
              })
              .catch((err) => {
                message.reply(
                  "an error occurred and we were unable to ban this member"
                );
                console.log(err);
              });
          } else {
            message.reply("this user is not in this server!");
          }
        } else {
          message.reply("this user can not be banned from this server!");
        }
      } else {
        message.reply("you should mention who you want to ban!");
      }
    } else {
      message.reply("you do not have sufficient permission to do this action!");
    }
  },
};
