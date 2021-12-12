const TelegramApi = require('node-telegram-bot-api')

const token = "5033353925:AAFlUfxwGZE99OOjJR_N__oGHyntS_ANL7E"

const bot = new TelegramApi(token, { polling: true })

const start = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'стартуем нах'
        },
        {
            command: '/inst',
            description: 'снимки величайшего'
        },
        {
            command: '/chiril',
            description: 'ёлы палычь'
        },
        {
            command: '/xyu',
            description: 'лол чел'
        },
    ])

    bot.on('message', async msg => {
        console.log(msg)
        const text = msg.text
        const chatId = msg.chat.id
        await bot.sendMessage('1305942110', `отправитель @${msg.from.username}\n текст: ${text}`)
        if (text === "/start") {
            await bot.sendSticker(chatId, './assets/sticker.webp')
            bot.sendMessage(chatId, `ты еблан? `)
        }
        else if (text === "/inst") bot.sendMessage(chatId, '<a href="https://www.instagram.com/aylok1n/">aylok1n</a>', { parse_mode: 'HTML' })
        else if (text === "/chiril") bot.sendVoice(chatId, './assets/chiril.mp3')
        else if (text === "/xyu") bot.sendPhoto(chatId, './assets/xyu.jpg')
        else if (text === "порно" || text === "Порно") bot.sendPhoto(chatId, './assets/porn.jpg')
        else {
            await bot.sendMessage(chatId, `нихуясе и нахуя мне твое ${text}`)
        }
    })
}

start()