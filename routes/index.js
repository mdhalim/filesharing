

var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3=require('multer-s3');
var aws = require('aws-sdk');
var mongoose = require('mongoose')

var filesShared = require('../models/filesshared')

aws.config.update({
    secretAccessKey: 'yJNP75fiQYbU43Azhp1PE5Mc/6LdxNYsI52oWAb2',
    accessKeyId: 'AKIAI4IRDWAXAOGM44JA',
    signatureVersion: 'v4'
});



var s3 = new aws.S3();

var fileName = Date.now().toString();
//console.log(fileName);
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'filesnode',
        key: function (req, file, cb) {
          var fileName = file.originalname
            var ext = fileName.slice(fileName.lastIndexOf('.'))
          //  console.log(file);
            //console.log(ext);
            cb(null, Date.now().toString()+ext); //use Date.now() for unique file keys
        }
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('fileShared'),function(req, res, next){

  //console.log(req.file);


   var file = new filesShared({

   file_id:req.file.key,
   file_size:req.file.size,
   file_name:req.file.originalname
  })

  file.save((err)=>{

    if(err) return next(err)

    res.render('index', {file:file})
  })



})

module.exports = router;
