const { createClient } = require('@vercel/kv');

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const messages = await kv.get('chat_messages') || [];
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).send('Error fetching messages.');
    }
  }

  if (req.method === 'POST') {
    try {
      const newMessage = {
        username: req.body.username,
        text: req.body.text,
        timestamp: new Date().toISOString()
      };

      const messages = await kv.get('chat_messages') || [];
      messages.push(newMessage);
      await kv.set('chat_messages', messages);

      return res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      return res.status(500).send('Error saving message.');
    }
  }

  if (req.method === 'DELETE') {
    try {
      await kv.set('chat_messages', []);
      return res.status(200).send('All messages deleted.');
    } catch (error) {
      console.error('Error deleting messages:', error);
      return res.status(500).send('Error deleting messages.');
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
