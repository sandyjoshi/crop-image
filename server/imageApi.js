'use strict';

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');

function writeData(image , name){
  return ( new Promise(
    function(resolve, reject) {

      image = image.replace(/ /g, '+');

      cloudinary.uploader.upload(image, function(result) {
        if( result.error ) {
          reject(result);
        }
        result.name = name ;
        resolve(result);
      });
    })
  );
}

router.post('/upload',  function (req, res) {

  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {

    if(fields) {
      var filesPromise = [];

      var filteredImage = ( fields.horizontal[0] );
      filesPromise.push( writeData(filteredImage , 'horizontal') );

      filteredImage = ( fields.vertical[0] );
      filesPromise.push( writeData(filteredImage , 'vertical') );

      filteredImage = ( fields.small_horizontal[0] );
      filesPromise.push( writeData(filteredImage, 'small_horizontal') );

      filteredImage = ( fields.gallery[0] );
      filesPromise.push( writeData(filteredImage , 'gallery') );

      Promise.all(filesPromise).then(function(values) {
        let result = {};
        for(let i = 0 , len = values.length ; i < len ; i++){
          let item = values[i];
          result[ item.name ] = item.secure_url;
        }
        res.json(result);
      });
    }
  });
});

module.exports = router;