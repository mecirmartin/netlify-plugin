const { getNewPackageJson } = require('./generatePackageJson');
const { generateIndex } = require('./generateIndex');
const { addScriptsToIndex } = require('./addScripts');

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command('mkdir ./temp_archive');
    await run.command(
      'tar --exclude temp_archive -zcf ./temp_archive/Sources.tar.gz ./'
    );
    await run.command('mv ./temp_archive/Sources.tar.gz ./public');
    await run.command('rm -rf ./temp_archive');

    getNewPackageJson();
    generateIndex();
    addScriptsToIndex();
    await run.command(
      'yarn add -D https://github.com/mecirmartin/cra-build-watch'
    );
  }
};
