const TelegramApi = require('node-telegram-bot-api')

const token = "5033353925:AAFlUfxwGZE99OOjJR_N__oGHyntS_ANL7E"

const bot = new TelegramApi(token, { polling: true })

const fetch = require('node-fetch');

const start = () => {
    bot.setMyCommands([
        {
            command: '/palpalch',
            description: 'палычь ёптыч'
        },
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
        {
            command: '/anekdot',
            description: 'смешное'
        },
        {
            command: '/porn',
            description: 'оооууууу май'
        }
    ])

    bot.on('message', async msg => {
        if (msg?.document) {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, "спс, подрочил")
        }
    })

    bot.on('sticker', async msg => {
        console.log(msg)
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, "хуета а не стикосы, на, забирай")
        await bot.sendSticker(chatId, './assets/sticker.webp')
    })

    bot.on('text', async msg => {
        console.log(msg)
        const text = msg.text
        const chatId = msg.chat.id
        await bot.sendMessage('1305942110', `отправитель @${msg.from.username}\nтекст: ${text}`)
        switch (text) {
            case "/start":
                await bot.sendSticker(chatId, './assets/sticker.webp')
                await bot.sendMessage(chatId, `ты еблан? `)
                break
            case "/inst":
                await bot.sendMessage(chatId, '<a href="https://www.instagram.com/aylok1n/">aylok1n</a>', { parse_mode: 'HTML' })
                break
            case "/xyu":
                await bot.sendPhoto(chatId, './assets/xyu.jpg')
                break
            case "/palpalch":
                await bot.sendPhoto(chatId, './assets/palpal.jpg')
                break
            case "/chiril":
                await bot.sendVoice(chatId, './assets/chiril.mp3')
                break
            case "/porn":
                await bot.sendPhoto(chatId, './assets/porn.jpg')
                break
            case "/anekdot":
                const resp = await fetch('http://umorili.herokuapp.com/api/get?site=bash.im&name=bash&num=100')
                const res = await resp.json()
                let anekdot = res[Math.floor(Math.random() * res.length)]
                try {
                    bot.sendMessage(chatId, `${anekdot.elementPureHtml.replace(/<br\s*[\/]?>/gi, "\n")}`, { parse_mode: 'HTML' })
                } catch (error) {
                    bot.sendMessage(chatId, 'Пошёл ты нахуй чучело')
                }
                break
            default:
                await bot.sendMessage(chatId, `нихуясе и нахуя мне твое ${text}`)
                break
        }
    })
}

start()