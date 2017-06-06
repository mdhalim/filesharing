var mongoose = require('mongoose')
var schema = mongoose.Schema;

var filesSharedSchema = schema({

  file_id : {type:String},
  file_size:{type:String},
  file_name:{type:String},
  date_of_creation: {type:Date}
})

filesSharedSchema
.virtual('url')
.get(function(){

  return '/url/'+this.file_id
})

module.exports=mongoose.model('filesShared', filesSharedSchema)
