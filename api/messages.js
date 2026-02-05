const fs = require('fs');
const path = require('path');

// Di Vercel, kita harus menggunakan folder /tmp untuk menulis file
const DB_PATH = '/tmp/db.json';

// Inisialisasi file jika belum ada
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ messages: [] }, null, 2));
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      const db = JSON.parse(data);
      return res.status(200).json(db.messages);
    } catch (error) {
      return res.status(500).send('Error reading database.');
    }
  }

  if (req.method === 'POST') {
    try {
      const newMessage = {
        username: req.body.username,
        text: req.body.text,
        timestamp: new Date().toISOString()
      };

      const data = fs.readFileSync(DB_PATH, 'utf8');
      const db = JSON.parse(data);
      db.messages.push(newMessage);
      
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).send('Error saving message.');
    }
  }

  if (req.method === 'DELETE') {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify({ messages: [] }, null, 2));
      return res.status(200).send('All messages deleted.');
    } catch (error) {
      return res.status(500).send('Error clearing database.');
    }
  }

  res.status(405).end();
};