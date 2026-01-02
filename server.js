const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the correct path for static files
const distPath = path.resolve(__dirname, 'dist');
const alternativePath = path.resolve(__dirname, '..');
const staticPath = fs.existsSync(distPath) ? distPath : alternativePath;

console.log('Using static path:', staticPath);
console.log('Path exists:', fs.existsSync(staticPath));

// Serve static files from dist directory
app.use(express.static(staticPath));

// Handle SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
