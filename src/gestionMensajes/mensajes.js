import twilio from 'twilio';

// MAIL

import { createTransport } from 'nodemailer';
const TEST_MAIL = 'jimmie.west@ethereal.email'

const transporter = createTransport({
  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jimmie.west@ethereal.email',
        pass: '8jRCX73Re5XghsbXqc'
    }
})

// WHATSAPP
const accountSid = 'ACa49230e31ef45b68f767fe2ab825beeb';
const authToken = 'd64a483d26f321d291fe1090f1da309d';

const client = twilio(accountSid, authToken);


export async function enviarMail() {
    try
    {
        const info = await transporter.sendMail({
            from: 'Servidor Node.JS',
            to: TEST_MAIL,
            subject: 'Nuevo pedido',
            html: `<h1 style="color: blue;"> Se realizado un nuevo pedido <span style="color: green;" Muchas gracias</span></h1>`
          })
        console.log(info);
    }
    catch (e)
    {
        console.log(e)
    }
}

export async function enviarWA () {
    try
    {
        const message = await client.messages.create({
        body: `Se ha realizado una nueva venta`,
        from: '+13155993091',
        to: '+542234497220'
        });
    console.log(message);
    }
    catch (e)
    {
        console.log(e);
    }
    res.send('Se envió WA')
}
