const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: '⏹️ Stop musik & disconnect',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada yang diputar!');
        if (message.member.voice.channel !== queue.voiceChannel) {
            return message.reply('❌ Kamu harus di voice channel yang sama!');
        }
        await queue.stop();
        message.reply({ embeds: [new EmbedBuilder().setColor('#FF0000').setDescription('⏹️ Musik dihentikan! 👋')] });
    }
};