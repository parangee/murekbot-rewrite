const { Command } = require('discord.js-commando')


module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            group: 'dev',
            ownerOnly: true,
            aliases: ['스크립트'],
            memberName: 'eval',
            description: 'eval',
            args: [
                {
                    type: 'string',
                    key: 'script',
                    prompt: '스크립트를 입력해주세요'
                }
            ]
        });
    }

    async run(ctx, args, fromPattern, result) {
        let input = args.script.replace(/```js|```/gi, '')
        const m = await ctx.say('Evaluating....')
        const target = new Promise(resolve => resolve(eval(input)))
        target.then(async result => {
            if (typeof result !== 'string') {
                result = require('util').inspect(result)
            }
            if (result.length > 900) {
                result = result.slice(0, 900) + '...'
            }
            if (input.length > 900) {
                input = input.slice(0, 900)
            }
            const embed = ctx.createEmbed()
            embed.setTitle('EVAL')
            embed.addField('INPUT', '```js\n' + input + '```')
            embed.addField('OUTPUT', '```js\n' + result + '```')
            await m.edit(embed)
        }).catch(async err => {
            if (typeof err !== 'string') {
                err = require('util').inspect(result)
            }
            if (err.length > 900) {
                err = err.slice(0, 900) + '...'
            }
            if (input.length > 900) {
                input = input.slice(0, 900)
            }
            const embed = ctx.createEmbed()
            embed.setTitle('EVAL')
            embed.addField('INPUT', '```js\n' + input + '```')
            embed.addField('OUTPUT', '```js\n' + err + '```')
            await m.edit(embed)
        })
    }
}
