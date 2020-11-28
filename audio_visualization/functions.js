const path = require('path')
const fs = require('fs')

function getFile(filename) {
  let filePath = path.resolve(__dirname, filename)
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err){
        console.log('error')
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}
module.exports = {  
  getFile
}