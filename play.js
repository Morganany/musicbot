module.exports = {
    name: 'zexplay',
    description: 'Memutar lagu',
    async execute(message, args, client, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('⚠️ Kamu harus masuk ke Voice Channel dulu!');
        }

        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has('Connect') || !permissions.has('Speak')) {
            return message.reply('❌ Bot tidak punya izin **Connect** atau **Speak** di channel ini!');
        }

        const query = args.join(' ');
        if (!query) {
            return message.reply('⚠️ Masukkan judul lagu atau link YouTube!');
        }

        const msg = await message.reply(`🔍 Mencari dan memuat: **${query}**...`);

        try {
            // Eksekusi putar lagu
            await distube.play(voiceChannel, query);

            // 🔥 PASTIKAN BOT TIDAK DEAFEN 🔥
            const queue = distube.getQueue(message.guild.id);
            if (queue && queue.voice.connection) {
                // Tunggu sebentar, lalu buka bisu
                setTimeout(() => {
                    queue.voice.connection.setDeaf(false);
                    console.log("🔊 Buka bisu berhasil!");
                }, 1000);
            }

            msg.edit(`✅ **${query}** ditambahkan ke antrian!`);
            
        } catch (error) {
            console.error('❌ Error saat memutar lagu:', error);
            let errorMessage = '❌ Gagal memutar lagu. ';
            if (error.message.includes('No audio source')) {
                errorMessage += 'Lagu tidak ditemukan di YouTube. Coba gunakan link YouTube langsung.';
            } else {
                errorMessage += `\n\`\`\`${error.message}\`\`\``;
            }
            msg.edit(errorMessage);
        }
    }
};