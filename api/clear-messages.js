const { createClient } = require('@vercel/kv');

module.exports = async (req, res) => {
  try {
    const kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    await kv.set('chat_messages', []);
    res.status(200).send('Messages cleared successfully.');
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).send('Error clearing messages.');
  }
};