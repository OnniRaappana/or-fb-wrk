const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mmHelp',
    description: 'See how the command works',
    execute(message, args) {
      const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('GitHub Page')
      .setURL('https://github.com/ghostducky/finlandiaBot')
      .setAuthor({ name: 'finlandia', url: 'https://imgur.com/gallery/AYYdoLz' })
      .setThumbnail('https://imgur.com/gallery/AYYdoLz')
      .addFields(
        { name: 'Remember to always use a prefix: &', value: '\u200B' },
        { name: '(currently all commands are WIP)', value: '<channel ID> <message ID>' },
        { name: '--', value: '<channel ID>' },
        { name: 'Help / Info', value: 'mmHelp' },
        { name: '\u200B', value: '\u200B' },
        { name: 'This bot was created by', value: 'finlandia & ----'},
      )
      .setTimestamp()
      .setFooter({ text: 'Thank you for using this bot! ❤️' });
    
    message.channel.send({ embeds: [exampleEmbed] });
    },
};
