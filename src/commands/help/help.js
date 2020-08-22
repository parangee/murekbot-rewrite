const {Command} = require('discord.js-commando')

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: '도움말',
            aliases: ['help', '도움'],
            memberName: 'help',
            group: 'general',
            description: '도움말'
        });
    }

    async run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed()
        embed.setDescription('[여기](https://docs.dosbot.tk)에서 도움말을 확인하세요')
        return msg.say(embed)
    }
}
