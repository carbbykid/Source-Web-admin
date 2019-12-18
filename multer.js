var multer =require('multer')
var path =require('path')

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var fileFilter = function(req,file,cb){
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null,true)
    }
    else{
        cb({message:'Định dạng ảnh không đúng'},false)
    }
}

var upload =multer({
    storage:storage,
    limits:{fileSize:1024 *102},
    fileFilter:fileFilter
})

module.exports = upload;