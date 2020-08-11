"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const { oneLine } = require('common-tags');
module.exports = class DisableCommandCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: '비활성화',
            aliases: ['disable-command', 'cmd-off', 'command-off', 'disable'],
            group: 'dev',
            memberName: 'disable',
            description: 'Disables a command or command group.',
            details: oneLine `
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
            examples: ['disable util', 'disable Utility', 'disable prefix'],
            ownerOnly: true,
            args: [
                {
                    key: 'cmdOrGrp',
                    label: 'command/group',
                    prompt: 'Which command or group would you like to disable?',
                    type: 'group|command'
                }
            ]
        });
    }
    run(msg, args) {
        if (!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
            return msg.reply(`The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already disabled.`);
        }
        if (args.cmdOrGrp.guarded) {
            return msg.reply(`You cannot disable the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`);
        }
        args.cmdOrGrp.setEnabledIn(msg.guild, false);
        return msg.reply(`Disabled the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`);
    }
};
