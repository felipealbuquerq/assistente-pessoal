
angular.module('project').factory('ConversationService',  function($http, $q){

    var factory = {};
    factory.fazConversa = fazConversa;

    function fazConversa(params){
        let url =  `/conversation?text=${params.mensagem}&context=${params.context}`;
             let data = {
                 text: params.mensagem,
                 context: params.context
             }
             return $http.get(url).then(function(resposta){
                console.log(resposta);
                return resposta;
             });
    }

    return factory;

});