import { readFile, writeFile, readdir} from 'fs';

let res = ''
let dir = './assets'

readdir(dir, function(err, data){
  if(data?.length === 0) {
    console.log('⛔请先添加字幕txt文件')
    return
  }
  data?.map((item) => {
    readFile(`${dir}/${item}`,'utf-8',function(err,data){
      if(err){
        console.error(err);
      }
      else{
        res = data.split('\r\n')?.join(', ')
        writeFile(`./target/${item}`,res,function(err, data){
          if(err)  console.log(item + ' 写入失败 💢 ' + err)
          else {
            console.log(item + ' 🎉');
          }
        })
      }
    })
  })
})

 

