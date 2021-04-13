const express = require('express');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const xlsx = require('xlsx');
var Jimp = require("jimp");
const app = express();

const vaqt = `${+new Date()}`;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

app.use(fileUpload());

app.get('', (req, res) => {
    // res.render('index.ejs')
    res.send('siz :id shaklida hudud idsini berishingiz kerak boladi')
})


app.get("/:id",(req,res)=>{
    // res.download(__dirname+ `/${req.params.id}/${today}.png`);
    res.sendFile(__dirname+ `/public/${req.params.id}/${today}.png`)
  })

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log("Server is running at port 3000");
})



