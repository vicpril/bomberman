import path from 'path'
import { Project } from 'ts-morph'

const { EOL } = require('os')

const project = new Project({})

project.addSourceFilesAtPaths('src/frontend/**/*.ts')
project.addSourceFilesAtPaths('src/frontend/**/*.tsx')

const files = project.getSourceFiles()

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'frontend', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
const componentsDirs = sharedUiDirectory?.getDirectories() ?? []

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
  return layers.some((layer) => value.startsWith(layer))
}

componentsDirs.forEach((dir) => {
  const indexFilePath = `${dir.getPath()}/index.ts`
  const indexFile = dir.getSourceFile(indexFilePath)

  if (!indexFile) {
    const sourceCode = `export * from './${dir.getBaseName()}'${EOL}`
    const file = dir.createSourceFile(indexFilePath, sourceCode, { overwrite: true })
    file.save()
  }
})

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations()
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue()
    const valueWithoutAlias = value.replace('@/', '')

    const segments = valueWithoutAlias.split('/') ?? []

    const isSharedLayer = segments[0] === 'shared'
    const isUiSlice = segments[1] === 'ui'

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier(`@/${result}`)
    }
  })
})

project.save()
