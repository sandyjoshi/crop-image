'use strict';

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var newPath = "./public/images/";

router.post('/upload',  function (req, res) {

  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
	  // console.log(fields.files[0]);
	  // console.log(files);

    var data_url = fields.horizontal[0];
    data_url = data_url.replace(/^data:image\/jpeg+;base64,/, "");
    data_url = data_url.replace(/ /g, '+');

    fs.writeFile(__dirname + '/public/images/default.png', data_url, 'base64', function(err) {
        if(err){
          console.log(err);
        }
        res.send('success');
    });
  });


});


module.exports = router;