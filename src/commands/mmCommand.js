
module.exports = {
    name: 'mm',
    description: 'Help with matchmaking',
    execute(message, args) {
      

        //---------------------------------------------------------------
        // STILL WIP
        //---------------------------------------------------------------


       // Check if the user provided a message ID
    if (args.length === 0) {
        message.reply('Please provide a message ID for the bot to read.');
        return;
      }
      const messageId = args[0];
      const targetMessage = message.channel.messages.cache.get(messageId);
  
      // Check if the message was found
      if (targetMessage) {
        const lines = targetMessage.content.split('\n');
        lines.forEach((line, index) => {
          message.channel.send(`Line ${index + 1}: ${line}`); // no clue, don't ask
        });
  
        message.channel.send('Finished processing lines.');
      } else {
        // Notify the user if the specified message was not found
        message.reply(`The specified message with ID ${messageId} was not found.`);
      }
    },
  };
  