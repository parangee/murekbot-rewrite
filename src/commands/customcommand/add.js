const { Command } = require('discord.js-commando')

module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: '빠른말가르치기',
            description: '명령어를 추가합니다.',
            group: 'customcommand',
            memberName: 'add',
            userPermissions: ['ADMINISTRATOR'],
            guildOnly: true,
            args: [
                {
                    type: 'string',
                    key: 'keyword',
                    prompt: '키워드를 입력해주세요'
                },
                {
                    type: 'string',
                    key: 'response',
                    prompt: '대답을 입력해주세요'
                }
            ]
        });
    }

    async run(msg, args, fromPattern, result) {
        let data = JSON.parse((await msg.client.knex('guilds').where('id', msg.guild.id).limit(1))[0].commands)
        if (data.find(r => r.req === args.keyword)) {
            return msg.say('이미 등록된 키워드입니다.')
        }

        data.push({
            req: args['keyword'],
            res: args['response']
        })

        await msg.client.knex('guilds').update({commands: JSON.stringify(data)}).where('id', msg.guild.id)

        await msg.react('✅')
    }
}


