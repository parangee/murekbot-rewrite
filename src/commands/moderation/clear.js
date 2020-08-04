const { Command } = require('discord.js-commando')


module.exports = class Clear extends Command {
    constructor(client) {
        super(client, {
            name: '청소',
            aliases: ['clear'],
            args: [
                {
                    type: 'integer',
                    key: 'count',
                    prompt: '청소할 메시지 개수를 입력해주세요. 최대는 100개입니다.'
                }
            ],
            description: '채팅 청소 명령어입니다.',
            group: 'moderator',
            memberName: 'clear',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(msg, args, fromPattern, result) {
        if (args.count > 99 || args.count < 1) {
            return msg.say('1~99 사이의 수를 입력해주세요.')
        }
        await msg.delete()
        const res = await msg.channel.bulkDelete(args.count)
        msg.say(`메시지 ${res.size}개가 삭제되었습니다.`).then(m => setTimeout(() => m.delete(), 3000))
    }
}
