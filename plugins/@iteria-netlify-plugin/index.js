const fs = require('fs');

module.exports = {
  onPreBuild: async ({ utils: { build, status, cache, run, git } }) => {
    await run.command('curl -L https://api.github.com/repos/pengwynn/octokit/tarball > ./octokit.tar.gz')
    await run.command('echo "Hello world"')

    // const archiver = require('archiver');
    // const zipDirectory = (source, out) => {
    //   const archive = archiver('zip', { zlib: { level: 9 } });
    //   const stream = fs.createWriteStream(out);
    //   return new Promise((resolve, reject) => {
    //     archive
    //       .directory(source, false)
    //       .on('error', (err) => reject(err))
    //       .pipe(stream);
    //     stream.on('close', () => resolve());
    //     archive.finalize();
    //   });
    // };
    // try {
    //   await zipDirectory('./', './public');
    //   console.log('dokoncene zipovanie');
    // } catch (err) {
    //   console.error(err);
    // }
  }
};
