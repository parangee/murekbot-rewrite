const { Command } = require('discord.js-commando')
const neis = require('neis')


module.exports = class SearchSchool extends Command {
    constructor(client) {
        super(client, {
            name: '학교검색',
            description: '학교 코드를 검색합니다.',
            memberName: 'search-school',
            group: 'util',
            args: [
                {
                    type: 'string',
                    key: 'school',
                    prompt: '학교 이름을 입력해주세요'
                }
            ]
        });
    }

    async run(msg, args, fromPattern, result) {
        const m = await msg.say('검색중...')
        const res = (await neis.searchSchool(args.school, 'ALL', false)).map(r => (
            {
                name: r.name,
                code: r.code,
                addr: r.addr,
                edu: r.edu
            }
        ))
        const embed = msg.createEmbed()
        let desc = ""
        for (let school of res) {
            desc = desc + `[${school.edu}] [${school.code}] [${school.name}] [${school.addr}]\n`
        }
        embed.setDescription(`${desc.slice(0,1600)} ${desc.length > 1600 && '...'}`)

        await m.edit(embed)
    }
}
