const fs = require('fs');

export const addScriptsToIndex = () => {
  const indexHtml = fs.readFileSync('/index.html');
  console.log('toto je index', indexHtml);
};
