const fs=require('fs');
const path=require('path')

var img_papka =path.join(__dirname+'/public/img');



//pdf qr papkani tozalash
setInterval(function() {
  walkDir(img_papka, function(filePath) {
  fs.stat(filePath, function(err, stat) {
  var now = new Date().getTime();
  var endTime = new Date(stat.mtime).getTime() + 600000; // 10 min.dagi fayllar ochadi

  if (err) { return console.error(err); }

  if (now > endTime) {
      //console.log('DEL:', filePath);
    return fs.unlink(filePath, function(err) {
      if (err) return console.error(err);
    });
  }
})  
});
// }, 10000); // har 60 minutda
}, 600000*6); // har 60 minutda



function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};