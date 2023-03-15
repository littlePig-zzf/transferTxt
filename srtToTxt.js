import { readFile, writeFile, readdir, mkdir } from 'fs';
import { parse, build } from 'node-xlsx';

let res = ''
let dir = './srt'
let target = './target'

// excel文件类径
const excelFilePath = './ip文案.xlsx'

//解析excel, 获取到所有sheets
let sheets = parse(excelFilePath);
// console.log(sheets, 'sheets');
mkdir(target, function (err) {
  if (!err) {
    console.log('创建目标文件夹成功 🎉');
  }
})

sheets.map((citem, cindex) => {
  readdir(`${dir}/${citem.name}`, function(err, data){
    if(data?.length === 0) {
      console.log('⛔请先添加字幕srt文件')
      return
    }
    if (err) {
      console.log(err);
      return
    }
    mkdir(`${target}/${citem.name}`, function (err) {
      if (!err) {
        console.log('创建目标文件夹成功 🎉');
      }
    })
    data.map((item, index) => {
      readFile(`${dir}/${citem.name}/${item}`,'utf-8',function(err,cdata){
        res = cdata.split(/\n\s\n/).filter(citem => citem != "").map((ccitem) => {
            let textItem = ccitem.split(/\n/);
            return  textItem[2]?.replace('\r', '')
        })
        res = res.join(',')
        // 处理写进xlsx的数据
        const name = item.split('.')[0]
        const avticeIndex = citem.data.findIndex((ccitem) => {
          return ccitem[0] === name
        })
        sheets[cindex].data[avticeIndex][2] = res
        // 生成txt文件--(如果直接生成新的xlsx， 下面这步可去掉了)
        writeFile(`${target}/${citem.name}/${item}`,res,function(err, data){
          if(err)  console.log(item + ' 写入失败 💢 ' + err)
          else {
            console.log(item + ' 🎉');
          }
        })
      })
    })
  })
})

setTimeout(()=>{
  var buffer = build(sheets);
  writeFile('./修改后的文案.xlsx', buffer, function (err){
    if (err)
        throw err;
    console.log('Write to xls has finished 🎈');
  })
}, 3000)
    






