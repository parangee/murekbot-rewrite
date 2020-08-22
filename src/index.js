const {CommandoClient} = require('discord.js-commando')
const {Message, MessageEmbed} = require('discord.js')
const config = require('./config')
const path = require('path')

CommandoClient.prototype.knex = require('knex')({
    ...require('./config').database,
    useNullAsDefault: true
})


const client = new CommandoClient({
    ...config.commando
})

client.on('message', async msg => {
    if (!msg.guild || msg.author.bot) return
    if (msg.content.startsWith(client.commandPrefix)) return
    const data = (await client.knex('guilds').select('commands').limit(1).where('id', msg.guild.id))[0]
    if (!data) return
    const res = JSON.parse(data.commands).filter(r => msg.content.includes(r.req))
    if (!res.find(r => msg.content.startsWith(r.req))) return
    const placeholders = [
        {
            from: '{@author}',
            to: `<@${msg.author.id}>`
        }
    ]
    let response = res.find(r => msg.content.startsWith(r.req)).res
    placeholders.forEach(placeholder => {
        response = response.replace(placeholder.from, placeholder.to)
    })
    await msg.channel.send(response)
})

client.on('ready', function () {
    client.guilds.cache.forEach(async guild => {
        await client.knex('guilds')
            .select('id')
            .then(async res => {
                if (!res.map(r => r.id).includes(guild.id)) {
                    await client.knex('guilds').insert(
                        {
                            id: guild.id
                        }
                    )
                }
            })
    })
})

client.on('guildCreate',async guild => {
    await client.knex('guilds')
        .select('id')
        .then(async res => {
            if (!res.map(r => r.id).includes(guild.id)) {
                await knex('guilds').insert(
                    {
                        id: guild.id
                    }
                )
            }
        })
})

client.on('guildDelete', async guild => {
    await client.knex('guilds')
        .delete()
        .where({id: guild.id})
})

Array.prototype.chunk = function(size) {
    const chunked_arr = [];
    for (let i = 0; i < this.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([this[i]]);
        } else {
            last.push(this[i]);
        }
    }
    return chunked_arr;
}

Message.prototype.createEmbed = function () {
    return new MessageEmbed(
        {
            footer: {
                iconURL: this.author.avatarURL(),
                text: this.author.tag
            },
            color: 'ORANGE'
        }
    )
}

client.registry
    .registerDefaultTypes()
    .registerGroups(
        [
            ['general', '기본 모든 명령어 사용법은 [여기](https://docs.dosbot.tk/) 에 있습니다. '],
            ['customcommand', '커스텀 커맨드'],
            ['util', '유틸리티'],
            ['moderator', '관리'],
            ['dev', '개발자용'],
        ]
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(config.token)
