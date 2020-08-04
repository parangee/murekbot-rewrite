const {Command} = require('discord.js-commando')

module.exports = class SetChannelName extends Command {
    constructor(client) {
        super(client, {
            name: '채널이름변경',
            aliases: ['updatechannelname'],
            group: 'moderator',
            userPermissions: ["ADMINISTRATOR"],
            clientPermissions: ["MANAGE_CHANNELS"],
            memberName: 'channel_name',
            description: '현재 채널의 이름 변경',
            args: [
                {
                    type: 'string',
                    key: 'name',
                    prompt: '채널 이름을 입력하세요'
                }
            ]
        })
    }

    async run(msg, args, fromPattern, result) {
        await msg.channel.setName(args.name)
        await msg.react('731437745582637066')
        return msg
    }
}