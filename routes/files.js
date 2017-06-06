var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var filesShared = require('../models/filesshared')
aws.config.update({
    secretAccessKey: 'yJNP75fiQYbU43Azhp1PE5Mc/6LdxNYsI52oWAb2', 
    accessKeyId: 'AKIAI4IRDWAXAOGM44JA',
    signatureVersion: 'v4'
});

var s3 = new aws.S3();

router.get('/url/:file_id', function(req, res, next) {

      filesShared.findOne({file_id:req.params.file_id})
      .exec((err, results)=>{

        if(err) return next(err);

        var fileSize = results.file_size;
        if(fileSize/1000>1000){

          results.file_size = (fileSize/1000000).toFixed(2)+'MB'
        }else{

          results.file_size = (fileSize/1000).toFixed(2)+'KB'
        }

        res.render('download_page', {file:results})
      })

});


router.get('/url/:file_id/download', function(req, res, next){

  var params = {

    Bucket:'filesnode',
    Key:req.params.file_id
  }

  s3.getObject(params).createReadStream().pipe(res);



});


module.exports = router;
