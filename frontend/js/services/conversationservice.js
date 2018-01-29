
angular.module('project').factory('ConversationService',  function($http, $q){

    let promise;
    let ConversationService = {
        fazConversa : function(params) {
            if(!promise){

            }
            let url =  `/conversation?text=${params.mensagem}&context=${params.context}`;
            let data = {
                text: params.mensagem,
                context: params.context
            }
            promise = $http.get(url).then(function(resposta){
                console.log(resposta);
                return resposta;
            }).catch((err) => {
                console.error(`Deu ruim, status code = ${err.status} with error message = ${err.data}`);
                reject(err);
            });
            return promise;
        }
    }
    return ConversationService;

});