const {Command} = require('discord.js-commando')

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: '도움말',
            aliases: ['help', '도움'],
            memberName: 'help',
            group: 'general',
            description: '도움말',
            args: [
                {
                    type: 'string',
                    prompt: '도움말을 볼 명령어를 입력하세요',
                    key: 'command',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed()
        if (!args.command) {
            embed.setTitle('도움말')
            msg.client.registry.groups.forEach(group => {
                embed.addField(group.name, '`' + group.commands.map(r => r.name).join('` `') + '`')
            })
        } else {
            if (msg.client.registry.commands.get(args.command)) {
                const cmd = msg.client.registry.commands.get(args.command)
                embed.setTitle((`도움말 - ${cmd.name}`))
                embed.setDescription(`\`${cmd.group.name}\` ${
                        cmd.aliases.length !== 0 && '`' + cmd.aliases.join('` `') + '`'
                    }\n`)
                embed.addField('설명', `\`\`\`fix\n${cmd.description}\`\`\``)
            } else {
                embed.setTitle('해당하는 명령어가 없어요!')
            }
        }
        return msg.say(embed)
    }
}