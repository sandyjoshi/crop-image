'use strict';

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var counter = 1 ;
var dir = __dirname + '/../public/uploadedImages';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

// ToDo : shift to utills
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
            fs.writeFile( dir + '/' + counter + '/' + image.name + '.png', image.data, 'base64', function(err) {
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

    if(fields) {
      var filesPromise = [];

      var filteredImage = getBase64Data( fields.horizontal[0] );
      filteredImage.name = 'horizontal' ;
      filesPromise.push( writeData(filteredImage) );

      filteredImage = getBase64Data( fields.vertical[0] );
      filteredImage.name = 'vertical' ;
      filesPromise.push( writeData(filteredImage) );

      filteredImage = getBase64Data( fields.small_horizontal[0] );
      filteredImage.name = 'small_horizontal' ;
      filesPromise.push( writeData(filteredImage) );

      filteredImage = getBase64Data( fields.gallery[0] );
      filteredImage.name = 'gallery' ;
      filesPromise.push( writeData(filteredImage) );

      Promise.all(filesPromise).then(function(values) {
        let prefix = '/uploadedImages/' + counter ;
        res.json({
          id : counter ,
          vertical :  prefix + '/vertical.png',
          horizontal : prefix + '/horizontal.png',
          small_horizontal : prefix + '/small_horizontal.png',
          gallery : prefix + '/gallery.png',
        });
        counter++;
      });
    }
  });

});


module.exports = router;