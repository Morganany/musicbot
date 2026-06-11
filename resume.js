const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: '▶️ Lanjutkan lagu',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang di-pause!');
        if (!queue.paused) return message.reply('❌ Lagu sedang diputar!');
        await queue.resume();
        message.reply({ embeds: [new EmbedBuilder().setColor('#00FF00').setDescription('▶️ Musik dilanjutkan!')] });
    }
};