const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    description: '⏭️ Skip lagu',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang diputar!');
        if (queue.songs.length <= 1) return message.reply('❌ Ini lagu terakhir di queue!');
        if (message.member.voice.channel !== queue.voiceChannel) {
            return message.reply('❌ Kamu harus di voice channel yang sama!');
        }
        await queue.skip();
        message.reply({ embeds: [new EmbedBuilder().setColor('#00FF00').setDescription('⏭️ Skipped!')] });
    }
};