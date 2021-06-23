const fs = require('fs');

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command('pwd && yarn');
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

    try {
      await zipDirectory('./', './public');
      console.log('dokoncene zipovanie');
    } catch (err) {
      console.error(err);
    }
  }
};
