const {Command} = require('discord.js-commando')
const Pagination = require('discord-paginationembed')

module.exports = class ListCommands extends Command {
    constructor(client) {
        super(client, {
            guildOnly: true,
            group: 'customcommand',
            memberName: 'list',
            name: '빠른말가르치기리스트',
            description: '커스텀 커맨드 목록 출력'
        });
    }
    async run(msg, args, fromPattern, result) {
        let data = JSON.parse((await msg.client.knex('guilds').where('id', msg.guild.id).limit(1))[0].commands)
        if (data.length === 0) {
            return msg.say("등록한 키워드가 없습니다.")
        }
        const embeds = []
        const pagination = new Pagination.Embeds()
        const chunks = data.chunk(5)
        let chunkId = 0
        chunks.forEach(chunk => {
            chunkId++
            const embed = msg.createEmbed()
            embed.setTitle(`명령어 목록 - 청크 ${chunkId}/${chunks.length}`)
            embed.setDescription(chunk.map(r => `${r.req} - ${r.res}`).join('\n'))
            embeds.push(embed)
        })
        pagination.setArray(embeds).setChannel(msg.channel)
            .setAuthorizedUsers([msg.author.id])
            .build()
    }
}
