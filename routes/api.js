// author.js - Author route module
var express = require('express');
var router = express.Router();

var FeedbackAPI  = require('../services/api/FeedbackAPI');

//REST API
router.get('/data/', function(req, res){

    FeedbackAPI.getFeedback().then(function (result){
        res.send(result);  
    }); 
})

  module.exports = router;