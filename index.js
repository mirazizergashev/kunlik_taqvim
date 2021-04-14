const path = require('path')
const express = require('express');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const xlsx = require('xlsx');
var Jimp = require("jimp");
const app = express();

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
today=(todayq.substr(0,10).replace('/','.').replace('/','.'))
// console.log(today)
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('', (req, res) => {
    // res.render('index.ejs')
    res.send('siz :id shaklida hudud idsini berishingiz kerak boladi')
})


app.get("/:id",(req,res)=>{
    // res.download(__dirname+ `/${req.params.id}/${today}.png`);
    res.sendFile(__dirname+ `/public/${req.params.id}/${today}.png`)
  })

app.get("/tabrik", (req, res) => {
  var fileName = '2_1.jpg';
  // var imageCaption = 'Bu yerda ismingiz turadi.';
  var loadedImage;

  Jimp.read(fileName)
    .then(function (image) {
      loadedImage = image;
      console.log(1)
      return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(function (font) {
        loadedImage.print(font, 670, 1445, `${req.query.ism}`)
          .write(path.join(__dirname, `public/img/${req.query.ism}.png`));
        console.log(2)
        // .write(`${fileName}.png`);
      }).then(() => {
        res.redirect(`/img/${req.query.ism}.png`);

      });
    })

    .catch(function (err) {
      console.error(err);
    });

})

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log("Server is running at port 3000");
})



