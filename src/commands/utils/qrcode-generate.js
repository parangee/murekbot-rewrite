"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const discord_js_1 = require("discord.js");
const qrcode_1 = __importDefault(require("qrcode"));
class QrCodeGenerate extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'qr코드생성',
            group: 'util',
            memberName: 'qrcode-generate',
            description: 'generate qr code',
            args: [
                {
                    key: 'text',
                    prompt: '텍스트를 입력해주세요.',
                    type: 'string'
                }
            ]
        });
    }
    async run(msg, args, fromPattern, result) {
        const embed = msg.createEmbed();
        const attach = new discord_js_1.MessageAttachment(await qrcode_1.default.toBuffer(args.text, { width: 1000 }), 'qrcode.png');
        embed.setTitle('QRCODE');
        embed.attachFiles([
            attach
        ]);
        embed.setImage(`attachment://qrcode.png`);
        await msg.say(embed);
        return null;
    }
}
exports.default = QrCodeGenerate;
