const { readdirSync, rename } = require('fs')
const { resolve } = require('path')

const musicFolderPath = resolve(__dirname, '3rd Album')

const files = readdirSync(musicFolderPath)

const prefixToDelete = '[SPOTIFY-DOWNLOADER.COM]'

const newRename = (path) => {
  path.includes(prefixToDelete) ?? rename(path, path.substring(prefixToDelete.length, path.length).trim(), )
}

newRename(musicFolderPath)

files.forEach((file) => {
  if (file.includes(prefixToDelete)) {
    newRename(musicFolderPath + `/${file}`)
  }
})
