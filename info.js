const { MessageEmbed } = require('discord.js');

module.exports = {
  getInfoEmbed: () => {
    const infoEmbed = new MessageEmbed()
      .setTitle('Info Title')
      .setDescription('This is some info description.');

    return [infoEmbed]; // Return an array with the embed message
  }
};
