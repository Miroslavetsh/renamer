const { readdirSync, rename } = require('fs')
const { resolve, join } = require('path')

const renamerFolder = resolve(__dirname)
const renamerFolders = readdirSync(renamerFolder)

const restrictedFiles = ['index.js', 'package.json']
const prefixToDelete = '[SPOTIFY-DOWNLOADER.COM]'

const removePrefix = (filePath) => filePath.substring(prefixToDelete.length, filePath.length).trim()

const renameCandidate = (parent, candidate) => {
  if (candidate.includes(prefixToDelete)) {
    rename(parent + `/${candidate}`, parent + `/${removePrefix(candidate)}`, (err) =>
      console.log(err),
    )
  }
}

renamerFolders
  .filter((candidate) => !restrictedFiles.includes(candidate))
  .forEach((candidateFolder) => {
    const musicFolder = join(renamerFolder, candidateFolder)
    const musicFiles = readdirSync(join(renamerFolder, candidateFolder))

    musicFiles.forEach((candidateFile) => {
      renameCandidate(musicFolder, candidateFile)
    })

    renameCandidate(renamerFolder, candidateFolder)
  })
