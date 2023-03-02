let IPv4, arr, os = require('os')

arr = os.networkInterfaces().en0 ? os.networkInterfaces().en0 : os.networkInterfaces().eth0 ? os.networkInterfaces().eth0 : null

if (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].family == 'IPv4') {
      IPv4 = arr[i].address
    }
  }
}


module.exports = {
  url: IPv4 || '127.0.0.1',
  port: 1116
}
