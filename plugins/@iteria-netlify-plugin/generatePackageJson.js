const fs = require('fs')

export const getNewPackageJson = () => {
  const packageJson = fs.readFileSync("./package.json")
  const parsedPackageJson = JSON.parse(packageJson)

  const finalPackageJson = {
    ...parsedPackageJson,
    devDependencies: { 
        ...parsedPackageJson.devDependencies, 
        "cra-build-watch": "https://github.com/mecirmartin/cra-build-watch"
    },
  }
  fs.writeFileSync("./package.json", JSON.stringify(finalPackageJson))
}
