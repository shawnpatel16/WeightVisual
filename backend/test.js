const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, "../frontend/dist/index.html");

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`File ${filePath} can be accessed.`);
    console.log(stats);
  }
});
