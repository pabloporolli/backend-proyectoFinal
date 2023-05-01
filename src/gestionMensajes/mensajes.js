import twilio from 'twilio';
import logger from '../config/loggers.js'

// MAIL

import { createTransport } from 'nodemailer';
const TEST_MAIL = 'gianni.satterfield@ethereal.email'

const transporter = createTransport({
  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gianni.satterfield@ethereal.email',
        pass: 'j5DBbtECjnAn96fvBP'
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
            subject: 'Agregó un nuevo elemento al carrito',
            html: `<h1 style="color: blue;"> Se realizado un nuevo pedido <span style="color: green;" Muchas gracias</span></h1>`
          })
    }
    catch (e)
    {
        logger.error(e)
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
    }
    catch (e)
    {
        logger.error(e)
    }
}
