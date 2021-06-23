const fs = require("fs")

const getDependencies = () => {
  const dependencyBlacklist = ["react-scripts"]
  const file = fs.readFileSync("./package.json")
  const packageJson = JSON.parse(file)

  const dependencies = []
  Object.keys(packageJson.dependencies).forEach(k => dependencies.push(k))

  return dependencies.filter(d => !dependencyBlacklist.includes(d))
}

const removeSpecialChars = str => str.toLowerCase().replace(/[^\w\s]/g, "")

const generateIndexFile = dependencies => {
  let indexFile = ""

  dependencies.forEach(d => {
    const importName = removeSpecialChars(d)
    indexFile += `import * as ${importName} from "${d}";\n`
  })

  indexFile += `
  window.__deps = {};
  window.__deps_default = {};
  \n\n`

  dependencies.forEach(d => {
    const importName = removeSpecialChars(d)
    const slashedLength = d.split("/").length
    let dependency = ""
    const slashedDependency = d
      .split("/")
      .map((d, i) => {
        dependency += `['${d}']`
        return `['${d}'] ${
          i !== slashedLength - 1
            ? ` ?? (window.__deps${dependency} = {}))`
            : ""
        }`
      })
      .join("")
    // add opening brackets
    const openingBrackets = "(".repeat(slashedLength - 1)

    indexFile += `
    ${openingBrackets}window.__deps${slashedDependency} = ${importName};
    if ((window.__deps${dependency}).default) {
      window.__deps_default${dependency} = window.__deps${dependency}.default;
    };\n
    `
  })

  return indexFile
}

const findProjectEntry = () => {
    const possibleIndexes = ['./src/index.js', './src/index.jsx', './src/index.ts', './src/index.tsx']
    
    const indexFile = possibleIndexes.find(i => fs.existsSync(i))
    return indexFile
}


exports.generateIndex = () => {
    const dependencies = getDependencies()
    const generatedIndex = generateIndexFile(dependencies)

    fs.writeFileSync("./src/iteriaIndex.js", `export default () => { ${generatedIndex} }`)
    const projectEntry = findProjectEntry()
    const currIndexFile = fs.readFileSync(projectEntry, 'utf-8')

    const newIndexFile = 'import iteriaIndex from "./iteriaIndex";\n' + currIndexFile + 'iteriaIndex()'

    fs.writeFileSync('./public/index.js', newIndexFile)
    fs.writeFileSync(projectEntry, newIndexFile)
}
  