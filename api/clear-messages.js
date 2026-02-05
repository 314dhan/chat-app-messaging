const fs = require('fs');
const DB_PATH = '/tmp/db.json';

module.exports = async (req, res) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify({ messages: [] }, null, 2));
    res.status(200).send('Messages cleared successfully.');
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).send('Error clearing messages.');
  }
};
