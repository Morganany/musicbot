const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    description: '🔁 Loop mode (off/song/queue)',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang diputar!');

        const mode = args[0]?.toLowerCase();
        let newMode;
        if (mode === 'off') newMode = 0;
        else if (mode === 'song' || mode === 'track') newMode = 1;
        else if (mode === 'queue' || mode === 'all') newMode = 2;
        else newMode = (queue.repeatMode + 1) % 3;

        await queue.setRepeatMode(newMode);
        const labels = { 0: '❌ Loop OFF', 1: '🔂 Loop Lagu', 2: '🔁 Loop Queue' };
        message.reply({ embeds: [new EmbedBuilder().setColor('#9B59B6').setDescription(labels[newMode])] });
    }
};