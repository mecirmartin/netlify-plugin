const fs = require('fs');

exports.addScriptsToIndex = () => {
  const indexHtml = fs.readFileSync('./public/index.html', 'utf-8');
  console.log('toto je index', indexHtml);
};
