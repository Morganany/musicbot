const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    description: '🔊 Atur volume (0-100)',

    async execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ Ga ada lagu yang diputar!');
        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 100) {
            return message.reply('❌ Volume harus 0-100!');
        }
        await queue.setVolume(volume);
        message.reply({ embeds: [new EmbedBuilder().setColor('#00FF00').setDescription(`🔊 Volume: \`${volume}%\``)] });
    }
};