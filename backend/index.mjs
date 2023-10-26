import DB from './Config/DB.mjs';
import app from './app.mjs';
import dotenv from 'dotenv';
import CheckTime from './Feats/Timeout.mjs';

// Connecting DB
DB();

// Config
dotenv.config();

// Notificaitons
setInterval(CheckTime,60000);

// Firing up Server
const server = app.listen(process.env.PORT, () => {
    console.log('Listening on:', process.env.PORT);
});

// deepanshusharma0203@gmail.com  9306337336
// ny505152@gmail.com   8307074935