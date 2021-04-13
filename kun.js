const _ = require('lodash');
const xlsx = require('xlsx');
var Jimp = require("jimp");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

const workbook = xlsx.readFile('baza.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const Sana = [];
const Hudud = [];
const Saharlik = [];
const Iftorlik = [];
const Bomdod = [];
const Quyosh = [];
const Peshin = [];
const Asr = [];
const Shom = [];
const Xufton = [];

// const Sana = [];

for (let z in worksheet) {
    if(z.toString()[0] === 'A'){
    //   console.log(worksheet[z].w.length);
      if(worksheet[z].w.length==9){
    Sana.push('0'+worksheet[z].w);
      }
      else{
          Sana.push(worksheet[z].w);
      }
  }
  if(z.toString()[0] === 'B'){
    Hudud.push(worksheet[z].w);
  }
  if(z.toString()[0] === 'C'){
    //   console.log(worksheet[z])
    Saharlik.push('0'+worksheet[z].w);
  }
  if(z.toString()[0] === 'D'){
    Iftorlik.push(worksheet[z].w);
  }
  if(z.toString()[0] === 'E'){
    Bomdod.push('0'+worksheet[z].w);
  }
  if(z.toString()[0] === 'F'){
    Quyosh.push('0'+worksheet[z].w);
  }
  if(z.toString()[0] === 'G'){
    Peshin.push(worksheet[z].w);
  }
  if(z.toString()[0] === 'H'){
    Asr.push(worksheet[z].w);
  }
  if(z.toString()[0] === 'I'){
    Shom.push(worksheet[z].w);
  }
  if(z.toString()[0] === 'J'){
    Xufton.push(worksheet[z].w);
  }
}


for (let i = 1; i < Sana.length; i++) {
    let loadedImage='';    
    
   Jimp.read('kun.jpg')
        .then((image)=> {
           loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
        })
        .then(async(font)=> {
            console.log(Sana[i])
           await loadedImage.print(font, 861, 389, Sana[i])
            .print((font), 280, 389, Hudud[i])
            .print((font), 843, 600, Saharlik[i])
            .print((font), 843, 765, Iftorlik[i])

           
            // loadedImage='';
            
            Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then((font2)=>{
    
                loadedImage.print((font2), 120, 1240, Bomdod[i])
                .print((font2), 345, 1240, Quyosh[i])
                .print((font2), 555, 1240, Peshin[i])
                .print((font2), 760, 1240, Asr[i])
                .print((font2), 960, 1240, Shom[i])
                .print((font2), 1180, 1240, Xufton[i])
                .write(`5/${Sana[i]}.png`);
            })
            // console.log(sal)
            
            // .write(`${fileName}.png`);
        })
        .catch(function (err) {
            console.error(err);
        });
    
}


// console.log(Saharlik.length);