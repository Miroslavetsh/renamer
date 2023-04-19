const { readdirSync, rename } = require('fs')
const { resolve, join } = require('path')

const renamerFolder = resolve(__dirname)
const renamerFolders = readdirSync(renamerFolder)

const restrictedFiles = ['index.js', 'package.json']

const prefixToDelete = '[SPOTIFY-DOWNLOADER.COM]'

const removePrefix = (filePath) => filePath.substring(prefixToDelete.length, filePath.length).trim()

renamerFolders
  .filter((candidate) => !restrictedFiles.includes(candidate))
  .forEach((candidateFolder) => {
    const musicFolder = join(renamerFolder, candidateFolder)
    const musicFiles = readdirSync(join(renamerFolder, candidateFolder))

    musicFiles.forEach((candidateFile) => {
      if (candidateFile.includes(prefixToDelete)) {
        rename(
          musicFolder + `/${candidateFile}`,
          musicFolder + `/${removePrefix(candidateFile)}`,
          (err) => console.log(err),
        )
      }
    })

    if (candidateFolder.includes(prefixToDelete)) {
      rename(
        renamerFolder + `/${candidateFolder}`,
        renamerFolder + `/${removePrefix(candidateFolder)}`,
        (err) => console.log(err),
      )
    }
  })
