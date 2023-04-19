const { readdirSync, rename } = require('fs')
const { resolve, join } = require('path')

const musicFolderPath = resolve(__dirname)

const folders = readdirSync(musicFolderPath)

const prefixToDelete = '[SPOTIFY-DOWNLOADER.COM]'

folders.forEach((candidateFolder) => {
  if (candidateFolder.includes(prefixToDelete)) {
    const candidateFolderAfter = candidateFolder
      .substring(prefixToDelete.length, candidateFolder.length)
      .trim()

    rename(
      musicFolderPath + `/${candidateFolder}`,
      musicFolderPath +
        `/${candidateFolder.substring(prefixToDelete.length, candidateFolder.length).trim()}`,
      (err) => console.log(err),
    )

    const musicFolder = join(musicFolderPath, candidateFolderAfter)
    const files = readdirSync(join(musicFolderPath, candidateFolderAfter))

    files.forEach((file) => {
      if (file.includes(prefixToDelete)) {
        return rename(
          musicFolder + `/${file}`,
          musicFolder + `/${file.substring(prefixToDelete.length, file.length).trim()}`,
          (err) => console.log(err),
        )
      }
    })
  }
})
