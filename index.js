const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;
const now = new Date();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(`\nStarting server at ${now} ...`);
app.listen(port, () => {
  console.log(`\nListening on port ${port}`);
  console.log(`Node version: ${process.version}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
