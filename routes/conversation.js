// watson.js - Watson route module
var express = require('express');
var router = express.Router();


// Services instantiation 
var	conversationService = require('../services/watson/conversationService');

router.get('/', function (req, res) {

	//sempre inicia com uma conversa vazia, para gerar a mensagem de saudação
	conversationService.conversa(req.query.text).then(resposta => {

		if (resposta.intents && resposta.intents[0]) {
			var intent = resposta.intents[0];
			// Depending on the confidence of the resposta the app can return different messages.
			// The confidence will vary depending on how well the system is trained. The service will always try to assign
			// a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
			// user's intent . In these cases it is usually best to return a disambiguation message
			// ('I did not understand your intent, please rephrase your question', etc..)
			if (intent.confidence >= 0.75) {
			  responseText = 'I understood your intent was ' + intent.intent;
			} else if (intent.confidence >= 0.5) {
			  responseText = 'I think your intent was ' + intent.intent;
			} else {
			  responseText = 'I did not understand your intent';
			}
		      }
		      console.log(responseText);
		     

	res.send(resposta);
	})
});

module.exports = router;