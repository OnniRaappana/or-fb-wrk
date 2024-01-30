module.exports = {
    name: 'mmf',
    description: 'Fetches a matching form',
    execute(message, args) {

      if (args.length < 2) {
        message.reply('Please provide both a channel ID and a message ID for the bot to read.');
        return;
      }

      const channelId = args[0];
      const messageId = args[1];

      const targetChannel = message.guild.channels.cache.get(channelId);

      if (!targetChannel) {
        message.reply(`The specified channel with ID ${channelId} was not found.`);
        return;
      }

      targetChannel.messages.fetch(messageId)
        .then(targetMessage => {
          const userId = targetMessage.author.id;
          message.channel.send(`User ID of the message sender: <@${userId}>`);

          const lines = targetMessage.content.split('\n');
          const filteredLines = lines.filter((lines, index) => ![1, 7, 8, 9, 10].includes(index + 1));
          const concatenatedLines = filteredLines.join(' \n');
          message.channel.send(`Lines: ${concatenatedLines}`);
        })

        .catch(error => {
          message.reply(`Error fetching the specified message with ID ${messageId}.`);
          console.error(error);
        });
    },
  };
  