import { getNewPackageJson } from './generatePackageJson'
import { generateIndex } from './generateIndex'

module.exports = {
  onPreBuild: async ({ utils: { build, status, cache, run, git } }) => {
    // await run.command('curl -L https://api.github.com/repos/pengwynn/octokit/tarball > ./octokit.tar.gz')
    // await run.command('echo "Hello world"')
    getNewPackageJson()
    generateIndex()
  }
};
