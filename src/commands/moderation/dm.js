const { Command } = require('discord.js-commando')


module.exports = class DM extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            memberName: 'dm',
            group: 'moderator',
            description: 'DM 전송',
            args: [
                {
                    type: 'user',
                    key: 'user',
                    prompt: '유저를 입력해주세요'
                },
                {
                    type: 'string',
                    key: 'content',
                    prompt: '메시지 내용을 입력해주세요.'
                }
            ],
            userPermissions: ["ADMINISTRATOR"]
        });
    }

    async run(msg, args, fromPattern, result) {
        await args.user.send(msg.createEmbed().setDescription(args.content))
        await msg.react('731437745582637066')
        return msg
    }
}
