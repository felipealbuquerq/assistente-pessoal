// watson.js - Watson route module
var express = require('express');
var router = express.Router();


// Services instantiation 
var	conversationService = require('../services/watson/conversationService');

router.get('/', function (req, res) {

	//sempre inicia com uma conversa vazia, para gerar a mensagem de saudação
	conversationService.conversa(req.query.text).then(resposta => {
        console.log("Veja a resposta da início da conversa", resposta);
	res.send(resposta);
	})
});

module.exports = router;