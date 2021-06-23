const fs = require('fs');

module.exports = {
  onPreBuild: () => {
    fs.readdir('./', (err, files) => {
      files.forEach((file) => {
        console.log(file);
      });
    });
  }
};
