const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: '📋 Lihat antrian lagu',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Queue kosong!');

        const current = queue.songs[0];
        const upcoming = queue.songs.slice(1, 11);
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('📋 Queue Musik')
            .setDescription(
                `**🎶 Now Playing:**\n[${current.name}](${current.url}) \`[${current.formattedDuration}]\`\n\n` +
                `**🔽 Upcoming:**\n` +
                (upcoming.length > 0
                    ? upcoming.map((s, i) => `\`${i + 1}.\` [${s.name}](${s.url}) \`[${s.formattedDuration}]\``).join('\n')
                    : '*(Kosong)*')
            )
            .setFooter({ text: `Total: ${queue.songs.length} lagu | Requested by ${message.author.tag}` });
        message.reply({ embeds: [embed] });
    }
};