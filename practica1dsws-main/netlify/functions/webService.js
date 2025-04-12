const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { data } = await axios.get('https://api.example.com/gestos');
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};