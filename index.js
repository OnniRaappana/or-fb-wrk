const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const infoCommand = require('./info.js');
// ---------------------------------- constants ----------------------------------
const prefix = "&";
const creator = "544925681188864055";
const mistStaffID = "1169346085987303510";
const regexPattern = /n\s*i\s*g\s*g\s*a?|n\s*i\s*g\s*g\s*e?/i;
const noNwordServer = '1169346085899210792';
// ---------------------------------- constants ----------------------------------
client.once('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on('message', async (message) => {
  const { content, member, guild, author } = message;
  if (message.author.bot) return; // Ignore messages from other bots

// ---------------------------------- nword filter ----------------------------------
if (guild.id === noNwordServer && regexPattern.test(content)) {
  const mutedRole = guild.roles.cache.find(role => role.name === 'Muted'); // Replace 'muted' with your actual role name

  if (mutedRole) {
    try {
      // Add the muted role to the user
      await member.roles.add(mutedRole);
      message.delete().catch(error => console.error(`Error deleting message: ${error}`));
      message.channel.send(`<@${author.id}> that's a nono word`);
    } catch (error) {
      console.error(`Error adding the "muted" role: ${error}`);
      message.channel.send('An error occurred while muting the user.');
    }
  } else {
    console.error('The "muted" role was not found in the server.');
  }
}
// ---------------------------------- nword filter ----------------------------------

if (content.startsWith(prefix)) {
  const args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


// ---------------------------------- info command (wip) ----------------------------------
  if (content.startsWith(prefix)) {
    const args = content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'info') {
      if (member.permissions.has('ADMINISTRATOR') || author.id === creator) {
        const infoEmbeds = infoCommand.getInfoEmbed();
        for (const infoEmbed of infoEmbeds) {
          if (infoEmbed) {
            await message.channel.send({ embeds: [infoEmbed] }).catch(console.error);
          } else {
            message.channel.send('Error creating info message.');
          }
        }
      } else {
        message.channel.send('You do not have permission to use this command.');
      }
    }
// ---------------------------------- info command (wip) ----------------------------------
// ---------------------------------- invite link ----------------------------------
    if (command === 'invite') {
      message.channel.send(`<@${author.id}> here is the invite link: https://discord.com/api/oauth2/authorize?client_id=1128389508283506868&permissions=8&scope=bot`);
    }
  }
// ---------------------------------- invite link ----------------------------------
}});


// Log in
client.login("MTEyODM4OTUwODI4MzUwNjg2OA.GLS-vl.C96iFg9FnSQQMKFHbCVSQ8aOqWTMyVltQwCSlQ");