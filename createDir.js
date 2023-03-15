import { parse } from 'node-xlsx';
import {  mkdir } from 'fs';

// excel文件类径
const excelFilePath = './ip文案.xlsx'

//解析excel, 获取到所有sheets
const sheets = parse(excelFilePath);

sheets.map((citem) => {
    mkdir(`./srt/${citem.name}`, function (err) {
        if (!err) {
            console.log('创建目标文件夹成功 🎉');
        }
    })
})