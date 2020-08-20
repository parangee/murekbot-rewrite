"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("../../config"));
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
class UnknownCommandCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'unknown',
            group: 'util',
            memberName: 'unknown',
            description: 'Displays help information for when an unknown command is used.',
            unknown: true,
            hidden: true
        });
    }
    async run(msg, args, fromPattern, result) {
        (await (await node_fetch_1.default("https://builder.pingpong.us/api/builder/5f39129ce4b00e319915c279/integration/v0.2/custom/{sessionId}".replace('{sessionId}', msg.author.id), {
            method: 'POST',
            headers: {
                Authorization: "Basic a2V5OjZlYjI0MTA3YTRlYjYwNTEwYmZmNDY2NjE2ZmU2MmRj"
            },
            body: JSON.stringify({ request: { query: msg.content.replace(new RegExp('^' + escapeRegExp(msg.guild.commandPrefix)), '') } })
        })).json()).response.replies.forEach((rep) => {
            if (rep.type === 'text') {
                msg.say(rep.text);
            }
            else if (rep.type === 'image') {
                msg.say(rep.image.url);
            }
        });
        return null;
    }
}
exports.default = UnknownCommandCommand;
;
