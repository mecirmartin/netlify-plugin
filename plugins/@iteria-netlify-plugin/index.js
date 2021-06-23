const fs = require('fs');

module.exports = {
  onPreBuild: () => {
    const archiver = require('archiver');

    const zipDirectory = (source, out) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const stream = fs.createWriteStream(out);

      return new Promise((resolve, reject) => {
        archive
          .directory(source, false)
          .on('error', (err) => reject(err))
          .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
      });
    };

    zipDirectory('./', './public').catch((err) => console.log('error', err));
  }
};
