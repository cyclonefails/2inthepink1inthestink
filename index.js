// Imports
const Discord = require('discord.js');
const conf = require('./config.js');
const bot = new Discord.Client();
const talkedRecently = new Set();
const ColorThief = require('colorthief');
const rgbHex = require('rgb-hex');

// Vars
const token = conf.discordAPI;
var prefix = conf.prefix;

// Main
bot.on('message', message => {
  if (message.author.bot) return;
  let messageArray = message.content.split(' ');
  let args = messageArray.slice(1);
  let cmd = messageArray[0];
  let member = message.mentions.members.first();
  let guild = message.guild;

    if (cmd === `${prefix}color`){
      // Get avatar of user
      let avatar = message.author.avatarURL({ format: 'png' });
      message.channel.send(avatar);

      ColorThief.getColor(avatar)
        .then(color => { 
          console.log(color) 
          console.log(rgbHex(color[0], color[1], color[2])); // Uses rgb-hex to convert
          const rolecolor = rgbHex(color[0], color[1], color[2]);
          var role= message.guild.roles.cache.find(role => role.name === "mousy"); // Hard coded roll for now
          role.setColor('#' + rolecolor);

        })
        .catch(err => { console.log(err) })
    }

});
bot.login(token);