const {Command} = require('discord.js-commando')
const neis = require('neis')
const Pagination = require('discord-paginationembed')


module.exports = class SearchSchool extends Command {
    constructor(client) {
        super(client, {
            name: '급식',
            description: '급식을 확인합니다',
            memberName: 'meal',
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
        const schools = (await neis.searchSchool(args.school, 'ALL', false))
        if (schools.length === 0) {
            return msg.say('해당하는 학교가 없어요!')
        }
        const now = new Date()

        const embeds = []

        let i = 1

        for (let school of schools) {
            const embed = msg.createEmbed()

            embed.setDescription(`${school.name} [${school.addr}]`)

            let data = (await school.getMeal(now.getUTCFullYear(), now.getMonth())).map(
                r => (r ? {
                    breakfast: neis.removeAllergy(r.breakfast),
                    lunch: neis.removeAllergy(r.lunch),
                    dinner: neis.removeAllergy(r.dinner)
                } : null)
            )[now.getDay()]

            if (data && data.breakfast !== '')
                embed.addField('아침', data.breakfast || '없음')
            if (data && data.lunch !== '')
                embed.addField('점심', data.lunch || '없음')
            if (data && data.dinner !== '')
                embed.addField('저녁', data.dinner || '없음')
            embed.setAuthor(`${i}/${schools.length}`)

            embeds.push(embed)
            i++
        }

        new Pagination.Embeds()
            .setArray(embeds)
            .setChannel(msg.channel)
            .setPageIndicator(false)
            .setPage(1)
            .build()
    }
}
