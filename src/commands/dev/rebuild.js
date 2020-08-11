"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const child_process_1 = require("child_process");
class Rebuild extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: '컴파일',
            ownerOnly: true,
            description: 'compile',
            memberName: 'rebuild',
            group: 'dev',
        });
    }
    // @ts-ignore
    async run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed();
        const m = await msg.channel.send('running...');
        child_process_1.exec('tsc', (err, stdout, stderr) => {
            embed.setTitle('피코봇 컴파일');
            embed.setDescription(`상태: ${err ? '실패' : '성공'}`);
            if (stderr) {
                embed.addField('STDERR', stderr.length > 700 ? stderr.slice(0, 700) + '...' : stderr);
            }
            if (stdout) {
                embed.addField('STDOUT', stdout.length > 700 ? stdout.slice(0, 700) + '...' : stdout);
            }
            return m.edit(embed);
        });
        return null;
    }
}
exports.default = Rebuild;
