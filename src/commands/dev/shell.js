"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const child_process_1 = require("child_process");
class Shell extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'sh',
            ownerOnly: true,
            description: 'shell script',
            memberName: 'shell',
            group: 'dev',
            args: [
                {
                    type: 'string',
                    key: 'script',
                    prompt: '스크립트를 입력해주세요'
                }
            ]
        });
    }
    // @ts-ignore
    async run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed();
        embed.setTitle('SHELL');
        const m = await msg.channel.send('running...');
        // @ts-ignore
        child_process_1.exec(args.script, (err, stdout, stderr) => {
            // @ts-ignore
            embed.addField('INPUT', '```sh\n' + (args.script.length > 100 ? args.script.slice(0, 100) + '...' : args.script) + '```');
            if (err) {
                embed.addField('ERROR', '```js\n' + (err.message.length > 100 ? err.message.slice(0, 100) + '...' : err.message) + '```');
            }
            if (stderr) {
                embed.addField('STDERR', '```sh\n' + (stderr.length > 700 ? stderr.slice(0, 700) + '...' : stderr) + '```');
            }
            if (stdout) {
                embed.addField('STDOUT', '```sh\n' + (stdout.length > 700 ? stdout.slice(0, 700) + '...' : stdout) + '```');
            }
            return m.edit(embed);
        });
        return null;
    }
}
exports.default = Shell;
