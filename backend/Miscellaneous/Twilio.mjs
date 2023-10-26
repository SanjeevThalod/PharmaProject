import twilio from "twilio";

const accountSSID = 'AC47c3ef5b9fa6d32b894e135cc51a4706';
const authToken = '52d99f64e01b5bcc0c3edd5cbb502b53';
const client = twilio(accountSSID, authToken);


const sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message.message,
            to: `+91${to}`,
            from: +19567977459
        })
        console.log(`SMS sent with ${response.sid}`);
    } catch (error) {
        console.log('Error: ', error);
    }
}

const sendWhatsApp = async (to, message) => {
    try {
        const response = await client.messages.create({
            body:message.message,
            to:`+91${to}`,
            from:+14155238886
        })
        console.log(`WhatsApp sent with ${respones.sid}`);
    } catch (error) {
        console.log('Error: ',error);
    }
}

export { sendSMS, sendWhatsApp };