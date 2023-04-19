const { readdirSync, rename } = require('fs')
const { resolve } = require('path')

const musicFolderPath = resolve(__dirname, '[SPOTIFY-DOWNLOADER.COM] 3rd Album')

const files = readdirSync(musicFolderPath)

const prefixToDelete = '[SPOTIFY-DOWNLOADER.COM]'

// const newRename = (path) => {
//   return rename(path, path.substring(prefixToDelete.length, path.length).trim())
// }

files.forEach((file) => {
  if (file.includes(prefixToDelete)) {
    return rename(
      musicFolderPath + `/${file}`,
      musicFolderPath + `/${file.substring(prefixToDelete.length, file.length).trim()}`,
      (err) => console.log(err),
    )
  }
})
