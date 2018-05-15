const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
	console.log('ログインしました。')
})

client.on('message', message => {
	if (message.content.startsWith('!ping')) {
		message.channel.send('pong!') // ここに指定した文字列がボットの発言になる
	}
})

client.login('NDQ1OTAxNDczMTU1NTE0Mzc4.DdxR2w.ekyQi_h9FJYWvuOS605DLHq9kzY')
