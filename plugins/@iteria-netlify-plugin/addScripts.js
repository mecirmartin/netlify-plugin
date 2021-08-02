const fs = require('fs');

exports.addScriptsToIndex = () => {
  const indexHtml = fs.readFileSync('./public/index.html');
  console.log('toto je index', indexHtml);
};
