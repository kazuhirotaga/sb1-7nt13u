const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { code } = JSON.parse(event.body);

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.VITE_GITHUB_CLIENT_ID,
      client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to exchange code for token' })
    };
  }
};