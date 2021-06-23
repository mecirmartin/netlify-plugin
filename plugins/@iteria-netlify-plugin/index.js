const { getNewPackageJson } = require('./generatePackageJson');
const { generateIndex } = require('./generateIndex');

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
      'tar --exclude node_modules -zcf ./public/Sources.tar.gz ./'
    );
    getNewPackageJson();
    generateIndex();
    await run.command(
      'yarn add -D https://github.com/mecirmartin/cra-build-watch'
    );
  }
};
