var file_system = require('fs');
var archiver = require('archiver');
const express = require('express');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const xlsx = require('xlsx');
var Jimp = require("jimp");
const app = express();

const vaqt = `${+new Date()}`;
const fs = require('fs')
const archive = archiver('zip');
fs.mkdir(`${vaqt}`, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("New directory successfully created.")
    }
  })

app.use(fileUpload());

app.get('', (req, res) => {
    res.render('index.ejs')
})

app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file
    sampleFile.mv(`excel/${vaqt}.xlsx`, function (err) {
        if (err)
            return res.status(500).send(err);
          
const workbook = xlsx.readFile(`excel/${vaqt}.xlsx`);
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

var soni=1;
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
            .print((font), 320, 389, Hudud[i])
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
                .write(`${vaqt}/${Sana[i]}_kun_${Hudud[i]}.png`);
                
            })
            // console.log(sal)
            
            // .write(`${fileName}.png`);
        })
        .catch(function (err) {
            console.error(err);
        })
        .finally(()=>{
            soni++
            console.log(soni)
            if(soni!=Sana.length)return
            const output = file_system.createWriteStream(`${req.body.name}.zip`);
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
// archive.directory(`${req.body.name}`, false);

// append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory('buxoro', 'new-subdir');

archive.finalize();

    // Use the mv() method to place the file somewhere on your server
    // res.download(`target.zip`)
    res.download(`${req.body.matn}.zip`)
        });
    
}

    })
  
console.log(req.body.name)

    // res.json({
    //     data:req.files.file,
    //     name:req.body.matn
    // })
  
});

// app.get("/upload/:id",(req,res)=>{
//     res.download(__dirname+ `/output/${req.params.id}.pdf`);
//   })

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log("Server is running at port 3000");
})



