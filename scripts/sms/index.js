const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
    apiKey: '0bc034ce',
    apiSecret: 'uW2rL9Ngtd1xf8Ny',
});

const from = 'ПРОЩЕ';
const to = '79243093207';
const text = 'Hello there, it\'s me - Korchak Rodion and i\'m writing you NodeJS. Dont forget to buy shampun and gubku dlya obuvi;)';

async function sendSMS() {
    await vonage.sms.send({ to, from, text })
        .then((resp) => { console.log('Message sent successfully'); console.log(resp); })
        .catch((err) => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();
