var DanhMuc = require('../models/danhmuc.model');
var NhomDanhMuc = require('../models/nhomdanhmuc.model');
var cloudinary = require('cloudinary').v2;
var mongoose = require('mongoose');
var NhomDanhMuc = require('../models/nhomdanhmuc.model');

module.exports.create = async function(req, res) {
    var nhomdanhmucs = await NhomDanhMuc.find();
    res.render('danhmucs/create', {
        nhomdanhmucs: nhomdanhmucs
    });
}

module.exports.postCreate = async function(req, res) {
    var result = await cloudinary.uploader.upload(req.file.path);
    req.body.hinh = result.url;
    var danhmuc = await DanhMuc.create(req.body);
    res.redirect('/danhmucs');
}

module.exports.index = async function(req, res) {
	var nhomdanhmucs = await NhomDanhMuc.find();
    var danhmucs = await DanhMuc.find()
        res.render('danhmucs/index', {
            danhmucs: danhmucs,
            nhomdanhmucs: nhomdanhmucs
        });
};

module.exports.view = async function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);

    var danhmuc = await DanhMuc.findById(id, function(err,danhmuc) {
        return danhmuc;
    });

    res.render('danhmucs/view', {
        danhmuc: danhmuc
    });
}


module.exports.delete = async function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    DanhMuc.findByIdAndRemove(id, function(err, danhmuc) {
        if (err) return err;
    });
    res.redirect('/danhmucs');
}

module.exports.edit = async function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    var danhmuc = await DanhMuc.findById(id, function(err,danhmuc) {
        return danhmuc;
    });
    var nhomdanhmucs = await NhomDanhMuc.find();
    res.render('danhmucs/edit', {
        nhomdanhmucs: nhomdanhmucs,
        danhmuc:danhmuc
    });
}

module.exports.update = async function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    var result = await cloudinary.uploader.upload(req.file.path);
    req.body.hinh = result.url;
    var danhmuc = await DanhMuc.findByIdAndUpdate(id, { $set: req.body }, function(err, danhmuc) {
        if (err) return err;
    });
    res.redirect('/danhmucs');
}