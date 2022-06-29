import readline from 'readline'
import fs from 'fs'
import stream from 'stream'
import once from 'events'
import * as readLine from "readline";
// properties文件路径
// Unicode 码转为中文
function toGB2312(str) {
  return unescape(str.replace(/\\u/gi, '%u'));
}
const map = new Map()
// properties文件解析
 export  function parseProps(url,callback) {
    map.clear()
  let fRead = fs.createReadStream(url),
    readlineObj = readline.createInterface({
      input: fRead
    });

  readlineObj.on('line', (line) => {
    let tmp = line.toString(),
      index = tmp.indexOf('#');

    // 拆分key、value
    if (index !== 0) {
      let strIdx = tmp.indexOf('='),
        key = tmp.substr(0, strIdx),
        value = tmp.substr(strIdx + 1);
      map.set(key,toGB2312(value)) ;
    }
  })
  // 文件读取结束

     readlineObj.once('close', () => {
    callback(null,map)
  })
  return map;
}

export  function writeProps(data,url) {
    let str = ''
    for(let item of data.entries()){
        str += `${item[0]}=${item[1]}\r\n`
    }
    console.log(`writeProps result:${str}`)
    fs.writeFileSync(url,str)
}

