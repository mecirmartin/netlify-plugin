const { getNewPackageJson } = require('./generatePackageJson');
const { generateIndex } = require('./generateIndex');

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
      'mkdir ./temp_archive && tar --exclude temp_archive --exclude node_modules -zcf ./temp_archive/Sources.tar.gz ./ && mv ./temp_archive/Sources.tar.gz ./public && rm -rf ./temp_archive'
    );
    getNewPackageJson();
    generateIndex();
    await run.command(
      'yarn add -D https://github.com/mecirmartin/cra-build-watch'
    );
  }
};
