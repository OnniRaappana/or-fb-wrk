const { Client, IntentsBitField, Collection } = require('discord.js');
const { prefix, creatorID, discordToken, staffID } = require('./whatnot/consts.js');
// I might change the folder/file names

const client = new Client({
  intents: [
     IntentsBitField.Flags.Guilds,
     IntentsBitField.Flags.GuildMembers,
     IntentsBitField.Flags.GuildMessages,
     IntentsBitField.Flags.MessageContent
     
] });
client.commands = new Collection();
/*--------------------------------------------*/
const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
// this should work, but if it doesn't, try something to get it to work

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
client.once('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
});

//if (message.content.includes())

client.on('messageCreate', async (message) => {
  const { content, member, author } = message;

  if (message.author.bot || !content.startsWith(prefix)) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  /*

  dubplicates just because I can't get it to work rn.

  So tk, the logic of fetching the message (form) right now is in

  Downloads\    finB\         or-fb-wrk\        src\          commands\               mmCommand.js
      ↑            ↑               ↑               ↑               ↑                       ↑
  where your   the folder      your forked    src folder    commands folder     and finally the file itself
  folder is     I wanted       repo name
  situated    you to create

  just so you know, I'm sure you know how to locate the right file :)

  below is the logic of exicuting or reading the command. if you feel like it, you can change the current commands below to slash commands
  
  I don't know how slash commands work, but add this if you can to restrict who can use the commands

  member.roles.cache.some(role => role.id === staffID)
  
  */
  

  

  const mmTrigger = ['mm', 'matchmake']; // add more variations if needed
  if (mmTrigger.includes(cmd)) {
    if (author.id == creatorID || member.roles.cache.some(role => role.id === staffID)){ // <-- here is the current line that restricts everyone from using it
      const command = client.commands.get('mm');
      if (command) {
      try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error executing the command. <@544925681188864055>, check console.');
      }
      }
    } else { message.channel.send(`<@${author.id}>, You do not have the required permission to run this command.`); }
  }


  const mmHelp = [/*'mm help', */'mmhelp', /*'matchmake help'*/, 'matchmakehelp']; //'mm help' and 'matchmake help' both trigger the command above
  if (mmHelp.includes(cmd)) {
    if (author.id == creatorID || member.roles.cache.some(role => role.id === staffID)){
      const command = client.commands.get('mmHelp');
      if (command) {
      try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error executing the command. <@544925681188864055>, check console.');
      }
      }
    } else { message.channel.send(`<@${author.id}>, You do not have the required permission to run this command.`); }
  }

  
  const mmFetch = ['mmf', 'matchmakefetch', ]; //'mm help' and 'matchmake help' both trigger the command above
  if (mmFetch.includes(cmd)) {
    if (author.id == creatorID || member.roles.cache.some(role => role.id === staffID)){
      const command = client.commands.get('mmf');
      if (command) {
      try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error executing the command. <@544925681188864055>, check console.');
      }
      }
    } else { message.channel.send(`<@${author.id}>, You do not have the required permission to run this command.`); }
  }


/* ------------------------ INVITE ----------------------------- */
    if (cmd === 'invite') {
      message.channel.send(`<@${author.id}> here is the invite link, it requires administrator powers: https://discord.com/api/oauth2/authorize?client_id=1128389508283506868&permissions=8&scope=bot`);
    }


});
client.login(discordToken);