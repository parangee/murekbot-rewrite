const {Command} = require('discord.js-commando')

module.exports = class SlowMode extends Command {
    constructor(client) {
        super(client, {
            name: '슬로우모드',
            aliases: ['slowmode'],
            group: 'moderator',
            userPermissions: ["ADMINISTRATOR"],
            clientPermissions: ["MANAGE_CHANNELS"],
            memberName: 'slowmode',
            description: '슬로우모드 명령어',
            args: [
                {
                    type: 'integer',
                    prompt: '슬로우모드 딜레이를 입력해주세요',
                    key: 'time'
                }
            ]
        })
    }

    async run(msg, args, fromPattern, result) {
        await msg.channel.setRateLimitPerUser(args.time)
        msg.react('731437745582637066')
        return msg
    }
}