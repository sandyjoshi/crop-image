'use strict';

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var counter = 1 ;
var dir = __dirname + '/public/uploadedImages';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

// ToDo : utills
function getBase64Data( url ){
  var matches = url.match(/^data:.+\/(.+);base64,(.*)$/);
  var ext = matches[1];
  var base64_data = matches[2];
  base64_data = base64_data.replace(/ /g, '+');
  return { ext : matches[1] , data : base64_data };
}

function writeData(image){
  return ( new Promise(
    function(resolve, reject) {

      fs.mkdir( dir + '/' + counter  , function(err) {
        if(err){
          if (err.code == 'EEXIST'){
            resolve();
            return;
          }
          console.log(err);
          reject();
          return;
        }
        resolve();
      });
    }).then(
      function() {
        return (new Promise(
          function(resolve, reject) {
            fs.writeFile( dir + '/' + counter + '/' + image.name + image.ext, image.data, 'base64', function(err) {
              if(err){
                console.log(err);
                reject();
              }
              resolve();
            });
          } ));
      }
    )
  )
}

router.post('/upload',  function (req, res) {

  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {

    var filesPromise = [];
    var rawImages = fields.images[0] ;

    for( let i = 0 , len = rawImages.length ; i < len ; i++ ){
      var filteredImage = getBase64Data( rawImages[i] );
      filteredImage.name = i ;
      filesPromise.push( writeData(filteredImage) );
    }

    Promise.all(filesPromise).then(function(values) {
      res.json({ id : counter , status : 'done' });
      counter++;
    });

  });

});


module.exports = router;