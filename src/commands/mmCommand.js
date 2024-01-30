module.exports = {
  name: 'mm',
  description: 'Help with matchmaking',
  execute(message, args) {
    // Check if both channel ID and message ID are provided
    if (args.length < 2) {
      message.reply('Please provide both a channel ID and a message ID for the bot to read.');
      return;
    }

    const channelId = args[0];
    const messageId = args[1];

    // Get the channel based on the provided ID
    const targetChannel = message.guild.channels.cache.get(channelId);

    if (!targetChannel) {
      message.reply(`The specified channel with ID ${channelId} was not found.`);
      return;
    }

    // Fetch the message from the specified channel
    targetChannel.messages.fetch(messageId)
    
      .then(targetMessage => {
        // Process the message content
        const userId = targetMessage.author.id;
        message.channel.send(`User ID of the message sender: <@${userId}>`);

        const splitStrings = [' ⸝⸝ ﹒', 'age: ', 'gender: ', 'sexuality: ', 'timezone: ', 'likes: ', 'age range: ', 'age range (max. 2 yrs if under 18): '];

        let modifiedLines = targetMessage.content.split('\n');

        modifiedLines = modifiedLines.map(line => {
            splitStrings.forEach(splitString => {
                if (line.includes(splitString)) {
                    line = line.split(splitString)[1];
                }
            });
            return line;
        });

        const filteredLines = modifiedLines.filter((line, index) => ![1, 7, 8, 9, 10].includes(index + 1));
        const concatenatedLines = filteredLines.join('\n');

        message.channel.send(`${concatenatedLines}`);


      })
      .catch(error => {
        // Notify if the specified message was not found
        message.reply(`Error fetching the specified message with ID ${messageId}.`);
        console.error(error);
      });
  },
};
