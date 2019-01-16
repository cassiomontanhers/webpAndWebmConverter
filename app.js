// const express = require('express')
// const app = express()
// const port = 3000
//
// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const hbjs = require('handbrake-js');
var webp = require('webp-converter');
var fs = require( 'fs' );

var imgDirectoryDestination = "finalImgs";
var videoDirectoryDestination = "finalVideos";
var directoryOrigin = "originFiles";

fs.readdir( directoryOrigin, function( err, files ) {
  files.forEach( function( file, index ) {
    var fileFormat = file.split(".").pop();
    if(fileFormat == "webp"){
      convertWebpToJpg(file);
    }else if (fileFormat == "webm") {
      convertWebmToMp4(file);
    }
  });
});

function convertWebpToJpg(filename){
  //pass input image(.webp image) path ,output image(.jpeg,.pnp .....)
  //dwebp(input,output,option,result_callback)
  console.log(filename);
  webp.dwebp(directoryOrigin + "/" + filename, imgDirectoryDestination + "/" + filename.slice(0, -5) + ".jpg","-o",function(status,error){
    //if conversion successful status will be '100'
    //if conversion fails status will be '101'
    console.log(filename,status,error);
  });
}

function convertWebmToMp4(filename){
  hbjs.spawn({ input: directoryOrigin + "/" + filename, output: videoDirectoryDestination + '/' + filename.slice(0, -5) + '.m4v' })
    .on('error', err => {
      // invalid user input, no video found etc
    })
    .on('progress', progress => {
      console.log(
        'Percent complete: %s, ETA: %s',
        progress.percentComplete,
        progress.eta
      )
    })
}
