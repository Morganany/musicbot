const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: '🔀 Acak antrian lagu',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang diputar!');
        if (queue.songs.length <= 2) return message.reply('❌ Queue terlalu sedikit!');
        await queue.shuffle();
        message.reply({ embeds: [new EmbedBuilder().setColor('#E67E22').setDescription('🔀 Queue diacak!')] });
    }
};