// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Create data store
const Datastore = require('nedb');
const db = new Datastore({ filename: 'comments.db', autoload: true });
// Serve static files
app.use(express.static('public'));
// Parse JSON
app.use(bodyParser.json());
// Read comments
app.get('/comments', (req, res) => {
  db.find({}, (err, comments) => {
    res.json(comments);
  });
});
// Create comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  db.insert(comment, (err, newComment) => {
    res.json(newComment);
  });
});
// Start web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});