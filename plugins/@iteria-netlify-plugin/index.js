const { getNewPackageJson } = require('./generatePackageJson')
const { generateIndex } = require('./generateIndex')

module.exports = {
  onPreBuild: async ({ utils: { build, status, cache, run, git } }) => {
    // await run.command('curl -L https://api.github.com/repos/pengwynn/octokit/tarball > ./public/octokit.tar.gz')
    // await run.command('echo "Hello world"')
    getNewPackageJson()
    generateIndex()
    await run.command('yarn')
  }
};
