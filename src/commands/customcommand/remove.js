const { Command } = require('discord.js-commando')

module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: '빠른말가르치기삭제',
            description: '명령어를 제거합니다.',
            group: 'customcommand',
            memberName: 'removecommand',
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            args: [
                {
                    type: 'string',
                    key: 'keyword',
                    prompt: '키워드를 입력해주세요'
                }
            ]
        });
    }

    async run(msg, args, fromPattern, result) {
        let data = JSON.parse((await msg.client.knex('guilds').where('id', msg.guild.id).limit(1))[0].commands)
        if (!data.find(r => r.req === args.keyword)) {
            return msg.say('해 키워드는 존재하지 않습니다.')
        }

        const idx = data.findIndex(r => r.req === args.keyword)
        if (idx > -1) data.splice(idx, 1)

        await msg.client.knex('guilds').update({commands: JSON.stringify(data)}).where('id', msg.guild.id)

        await msg.react('✅')
    }
}


