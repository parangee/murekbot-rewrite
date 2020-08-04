const {Command} = require('discord.js-commando')
const moment = require('moment')

module.exports = class ServerInfo extends Command {
    constructor(client) {
        super(client, {
            name: '서버정보',
            description: '서버 정보 출력 명령어',
            group: 'util',
            memberName: 'srvinfo',
            guildOnly: true
        });
    }

    run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed()
        embed.setThumbnail(msg.guild.iconURL())
        embed.setTitle(`서버 정보 - ${msg.guild.name}`)
        embed.addField('서버 주인', msg.guild.owner.user.tag, true)
        embed.addField('멤버 수', `
        총합: ${msg.guild.memberCount}
        유저: ${msg.guild.members.cache.filter(r => !r.user.bot).size}
        봇: ${msg.guild.members.cache.filter(r => r.user.bot).size}
        `, true)
        embed.addField('지역', msg.guild.region, true)
        embed.addField('전체 채널 수', msg.guild.channels.cache.size, true)
        embed.addField('채팅 채널 수', msg.guild.channels.cache.filter(r => r.type === 'text').size, true)
        embed.addField('뉴스 채널 수', msg.guild.channels.cache.filter(r => r.type === 'news').size, true)
        embed.addField('카테고리 수', msg.guild.channels.cache.filter(r => r.type === 'category').size, true)
        embed.addField('음성 채널 수', msg.guild.channels.cache.filter(r => r.type === 'voice').size, true)
        embed.addField('SKU 채널 수', msg.guild.channels.cache.filter(r => r.type === 'store').size, true)
        embed.addField('이모지 개수', msg.guild.emojis.cache.size, true)
        embed.addField('서버 부스트 개수', msg.guild.premiumSubscriptionCount, true)
        embed.addField('역할 개수', msg.guild.roles.cache.size, true)
        embed.addField('서버 생성 시각', moment(msg.guild.createdAt).format("YYYY-MM-DD hh:mm:ss"), true)
        return msg.say(embed)
    }
}
