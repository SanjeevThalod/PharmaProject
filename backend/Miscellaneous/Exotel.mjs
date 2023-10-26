import axios from 'axios'

// Exotel API credentials
const SID = '409215bfe98119a466fe8355cd302e1f17c29bd5c061b05f';
const TOKEN = '8cad21a2271e38eb6870ac5efeee58038f54a0cd319ec618';

// Exotel API endpoint
const exotelEndpoint = `https://api.exotel.com/v2/Accounts/${SID}/Calls/connect.json`;

// Create an arrow function to initiate the call
const makeCALL = async (to) => {
  try {
    const response = await axios.post(exotelEndpoint, {
      From: '+918071176074', // Replace with your Exotel virtual number
      To: `+91${to}`,
      CallerId: '+918071176074', // Replace with your caller ID (optional)
    }, {
      auth: {
        username: SID,
        password: TOKEN,
      },
    });

    console.log('Call initiated successfully:', response);
  } catch (error) {
    console.error('Error initiating call:', error);
  }
};

export {makeCALL}
