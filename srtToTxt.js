import { readFile, writeFile, readdir, mkdir } from 'fs';


let res = ''
let dir = './srt'

readdir(dir, function(err, data){
  if(data?.length === 0) {
    console.log('⛔请先添加字幕srt文件')
    return
  }
  mkdir('./target', function (err) {
    if (!err) {
      console.log('创建目标文件夹成功 🎉');
    }
  })
  data.map((item) => {
    readFile(`${dir}/${item}`,'utf-8',function(err,cdata){
      res = cdata.split(/\n\s\n/).filter(citem => citem != "").map((ccitem) => {
          let textItem = ccitem.split(/\n/);
          return  textItem[2]?.replace('\r', '')
      })
      res = res.join(',')
      writeFile(`./target/${item}`,res,function(err, data){
        if(err)  console.log(item + ' 写入失败 💢 ' + err)
        else {
          console.log(item + ' 🎉');
        }
      })
    })
  })
})

