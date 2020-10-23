import { networkInterfaces } from 'os'
let IPv4, arr
arr = networkInterfaces().en0 || null
if (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].family == 'IPv4') {
      IPv4 = arr[i].address
    }
  }
}

const url = IPv4 || '127.0.0.1'
const port = 1116
export {
  url,
  port
}