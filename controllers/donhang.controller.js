var DonHang = require('../models/donhang.model');
var cloudinary = require('cloudinary').v2;
var mongoose = require('mongoose');



module.exports.index = async function(req, res) {
	var donhangs = await DonHang.find();
        res.render('donhangs/index', {
            donhangs: donhangs,
        });
};