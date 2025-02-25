const axios = require('axios');

const AICall = async (input, context) => {

  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:1234/v1/chat/completions',
      data: {
        model: "llama-3.2-1b-instruct",
        messages: [
          { "role": "system",
            "content": context },
          { "role": "user", "content": input }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      },
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response) {
      const result = response.data.choices[0].message.content;
      return result;
    }
  } catch (error) {
    return error;
  }
}

module.exports = AICall;
