var Jimp = require("jimp");

var fileName = 'test.jpg';
var imageCaption = 'Bu yerda ismingiz turadi.';
var loadedImage;

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    })
    .then(function (font) {
        loadedImage.print(font, 450, 200, imageCaption)
        .write(`new.png`);
        // .write(`${fileName}.png`);
    })
    .catch(function (err) {
        console.error(err);
    });