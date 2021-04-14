var Jimp = require("jimp");

var fileName = '2_1.jpg';
// var imageCaption = 'Bu yerda ismingiz turadi.';
var loadedImage;

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font, 670, 1445, "Jonibek")
        .write(`new.png`);
        // .write(`${fileName}.png`);
    })
    .catch(function (err) {
        console.error(err);
    });