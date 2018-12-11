var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 9) == 'Hey Janet') {
        var args = message.substring(9).split(' ');
        // bot.sendMessage({
        //     to: channelID,
        //     message: args
        // });
        var cmd = args[1];
        // bot.sendMessage({
        //     to: channelID,
        //     message: cmd
        // });


        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: "Hi, I'm Janet. Anytime you say 'Hey Janet' in this server, I'll hear and try to help if I can.\
                     \n'Hey Janet help' will get a list of features. \
                     \n'Hey Janet tell me [search]' will get you a google result that I think is relevant."
                });
            break;
            case 'tell':
                args = args.slice(3)
                bot.sendMessage({
                    to: channelID,
                    message: "Searching for "+args.join(" ")+"\
                    \nhttp://www.google.com/search?q="+args.join("%20")
                })
            break;
            // Just add any case commands if you want to..
         }
     }
});