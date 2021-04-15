const path = require('path')
const express = require('express');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const xlsx = require('xlsx');
var Jimp = require("jimp");
const app = express();
const clean=require('./clean');
const vaqt = `${+new Date()}`;
var today = new Date();
const todayq = new Date().toLocaleString('uz-US', {
  timeZone: 'Asia/Tashkent'
});

// console.log(nDate)
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

// today = dd + '.' + mm + '.' + yyyy;
today = (todayq.substr(0, 10).replace('/', '.').replace('/', '.'))
// console.log(today)
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('', (req, res) => {
  // res.render('index.ejs')
  res.send('siz :id shaklida hudud idsini berishingiz kerak boladi')
})


app.get("/:id", (req, res) => {
  // res.download(__dirname+ `/${req.params.id}/${today}.png`);
  res.sendFile(__dirname + `/public/${req.params.id}/${today}.png`)
})

app.get("/tabrik/rasm", (req, res) => {
  console.log(req.query.img)
  var fileName = `${req.query.img}.jpg`;
  // var imageCaption = 'Bu yerda ismingiz turadi.';
  var loadedImage;
  switch (req.query.img) {
    case '1':
      Jimp.read(fileName)
        .then(function (image) {
          loadedImage = image;
          let razmer1 = 775;
          let olcham1 = req.query.ism.length;
          switch (olcham1) {
            case (3):
              razmer1 = 900;
              break;
            case (4):
              razmer1 = 850;
              break;
            case (5):
              razmer1 = 740;
              break;

            case (6):
              razmer1 = 705;
              break;
            case (7):
              razmer1 = 755;
              break;
            case (8):
              razmer1 = 675;
              break;
            case (9):
              razmer1 = 650;
              break;
            case (10):
              razmer1 = 600;
              break;
            case (11):
              razmer1 = 500
              break;
            case (12):
              razmer1 = 430;
              break;
            case (13):
              razmer1 = 390;
              break;
            default:
              razmer1 = 775;
              break;
          }
          return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(function (font) {
            loadedImage.print(font, razmer1, 1415, `${req.query.ism.toUpperCase()}`)
              .write(path.join(__dirname, `public/img/${req.query.ism}.png`));

            // .write(`${fileName}.png`);
          }).then(() => {
            res.redirect(`/img/${req.query.ism}.png`);

          });
        })

        .catch(function (err) {
          console.error(err);
        });
      break;

    case '2':
      Jimp.read(fileName)
        .then(function (image) {
          loadedImage = image;
          let razmer = 1060;
          let olcham = req.query.ism.length;
          switch (olcham) {
            case (3):
              razmer = 1160;
              break;
            case (4):
              razmer = 1110;
              break;
            case (5):
              razmer = 1060;
              break;

            case (6):
              razmer = 1010;
              break;
            case (7):
              razmer = 960;
              break;
            case (8):
              razmer = 910;
              break;
            case (9):
              razmer = 860;
              break;
            case (10):
              razmer = 810;
              break;
            case (11):
              razmer = 760;
              break;
            case (12):
              razmer = 710;
              break;
            case (13):
              razmer = 660;
              break;
            default:
              razmer = 1060;
              break;
          }
          return Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(function (font) {
            loadedImage.print(font, razmer, 1380, `${req.query.ism.toUpperCase()}`)
              .write(path.join(__dirname, `public/img/${req.query.ism}.png`));

            // .write(`${fileName}.png`);
          }).then(() => {
            res.redirect(`/img/${req.query.ism}.png`);

          });
        })

        .catch(function (err) {
          console.error(err);
        });
      break;

    default:
      break;
  }


})

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log("Server is running at port 8080");
})



