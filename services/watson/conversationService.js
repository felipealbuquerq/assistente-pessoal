//Language Translator Watson Third Party Module
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk

// Create the service wrapper
var conversation = new Conversation({
    username: process.env.WATSON_CONVERSATION_USERNAME,
    password: process.env.WATSON_CONVERSATION_PASSWORD,
    'version_date': '2017-05-26'
});

const workspace = process.env.WATSON_CONVERSATION_WORKSPACE_ID;

/*
 * Call Watson Tone Analyzer Service to extract the tones
 */
exports.conversa = function (mensagem) {
    var promise = new Promise((resolve, reject) => {
        var payload = {
            workspace_id: workspace,
            context:   {},
            input:  {text: mensagem}// req.body.input
        };

        // Send the input to the conversation service
        conversation.message(payload, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(updateMessage(payload, data));
        });

        function updateMessage(input, response) {
            var responseText = null;
            if (!response.output) {
              response.output = {};
            } else {
                resolve(response);
            }
            
          }

    });

    return promise;
}
