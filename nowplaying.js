const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: '🎶 Lagu yang sedang diputar',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada yang diputar!');

        const song = queue.songs[0];
        const progress = queue.currentTime / song.duration * 20;
        const bar = '▬'.repeat(Math.floor(progress)) + '🔘' + '▬'.repeat(19 - Math.floor(progress));

        const embed = new EmbedBuilder()
            .setColor('#1DB954')
            .setTitle('🎶 Now Playing')
            .setDescription(`[${song.name}](${song.url})`)
            .addFields(
                { name: '⏱️ Progress', value: `${queue.formattedCurrentTime} / ${song.formattedDuration}\n${bar}` },
                { name: '👤 Request', value: `${song.user}`, inline: true },
                { name: '🔊 Volume', value: `${queue.volume}%`, inline: true },
                { name: '🔁 Loop', value: queue.repeatMode ? (queue.repeatMode === 1 ? 'Song' : 'Queue') : 'Off', inline: true }
            )
            .setThumbnail(song.thumbnail);
        message.reply({ embeds: [embed] });
    }
};