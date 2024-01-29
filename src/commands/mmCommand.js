const { MessageEmbed } = require('discord.js');

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

    // Check if the user provided a channel ID
    if (args.length === 1) {
      message.reply('Please provide a channel ID along with the message ID.');
      return;
    }

    const channelId = args[0];
    const messageId = args[1];

    console.log(`Channel ID: ${channelId}, Message ID: ${messageId}`);



    const targetChannel = message.guild.channels.cache.get(channelId);


    if (!targetChannel || targetChannel.type !== 'text') {
      console.log(`Target Channel: ${targetChannel}`);
      message.reply('Channel not found or not a text channel');
      return;
    }


    targetChannel.messages.fetch(messageId).then(targetMessage => {
      console.log(`Target Message: ${targetMessage.content}`);

      const lines = targetMessage.content.split('\n');

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Message Content - ${targetMessage.id}`)
        .setDescription(lines.map((line, index) => `**Line ${index + 1}:** ${line}`).join('\n'));

      message.channel.send({ embeds: [embed] });
    }).catch(error => {

      console.error(`Error fetching the specified message with ID ${messageId}.`);
      console.error(error);
    });
  },
};
