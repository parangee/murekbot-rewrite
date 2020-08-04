const {Command} = require('discord.js-commando')
const carriers = require('./delivery/carriers')
const fetch = require('node-fetch')
const moment = require('moment')

const status = {
    information_received: '🏪 방문예정',
    at_pickup: ':package: 상품인수',
    in_transit: ':truck: 이동중',
    out_for_delivery: ':truck: 배송중',
    delivered: ':white_check_mark: 배송완료',
    unknown: '알수없음'
}


module.exports = class Delivery extends Command {
    constructor(client) {
        super(client, {
            name: '택배',
            aliases: ['delivery'],
            memberName: 'delivery',
            description: '택배 조회 명령어입니다.',
            group: 'util',
            args: [
                {
                    type: 'string',
                    key: 'carrier',
                    prompt: '택배사를 입력해주세요'
                },
                {
                    type: 'string',
                    key: 'num',
                    prompt: '운송장번호를 입력해주세요'
                }
            ]
        });
    }

    async run(msg, args, fromPattern, result) {
        const carrier = carriers.filter(r =>
            (r.name === args.carrier.replace(/ /gi, '')) || (r.id === args.carrier)
        )
        if (carrier.length === 0) {
            return msg.say('무렉봇이 해당 택배사를 지원하지 않거나 택배사가 없습니다.')
        }
        if (carrier.length > 1) {
            return msg.say(`택배사 여러개가 검색되었어요!\n\`\`\`fix\n${carriers.map(r => r.name).join('\n')}\`\`\``)
        }
        const res = await (await fetch(
            encodeURI(
                `http://apis.tracker.delivery/carriers/${carrier[0].id}/tracks/${args.num}`
            )
        )).json()
        if (res.message) {
            return msg.say(`<a:false:732093517731725313> ${res.message}`)
        }
        const MappedResult = res.progresses.map(r => ({
            desc: r.description,
            day: moment(r.time).format('YYYYMMDD'),
            time: new Date(r.time),
            location: r.location,
            status: r.status
        }))
        let json = {}
        for (let obj of MappedResult) {
            if (!json[obj.day]) json[obj.day] = []
            json[obj.day].push(obj)
        }
        const embed = msg.createEmbed()
        embed.setTitle(`보낸이: ${res.from.name} 받는이: ${res.to.name} 상태: ${res.state.text}`)
        for (let key of Object.keys(json)) {
            embed.addField(
                moment(key, 'YYYYMMDD').format('YYYY - MM - DD'),
                json[key].map(r =>
                    `${
                        status[r.status.id] ? status[r.status.id] : status.unknown
                    } - [${r.location.name}] ${moment(r.time).format('HH:mm')} - ${r.desc}`
                )
            )
        }
        return msg.say(embed)
    }
}


