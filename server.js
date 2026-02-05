const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Endpoints
app.get('/messages', (req, res) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading database.');
    }
    res.json(JSON.parse(data).messages);
  });
});

app.post('/messages', (req, res) => {
  const newMessage = {
    username: req.body.username,
    text: req.body.text,
    timestamp: new Date().toISOString()
  };

  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading database.');
    }
    const db = JSON.parse(data);
    db.messages.push(newMessage);

    fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing to database.');
      }
      res.status(201).json(newMessage);
    });
  });
});

app.delete('/messages', (req, res) => {
  const emptyDb = { messages: [] };

  fs.writeFile(DB_PATH, JSON.stringify(emptyDb, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error clearing database.');
    }
    res.status(200).send('All messages deleted.');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});