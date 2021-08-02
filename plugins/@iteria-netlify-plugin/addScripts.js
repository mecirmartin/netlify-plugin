const fs = require('fs');

exports.addScriptsToIndex = () => {
  const indexHtml = fs.readFileSync('/index.html');
  console.log('toto je index', indexHtml);
};
