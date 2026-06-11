const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: '⏸️ Pause lagu',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang diputar!');
        if (queue.paused) return message.reply('❌ Lagu sudah di-pause!');
        await queue.pause();
        message.reply({ embeds: [new EmbedBuilder().setColor('#FFFF00').setDescription('⏸️ Musik di-pause!')] });
    }
};