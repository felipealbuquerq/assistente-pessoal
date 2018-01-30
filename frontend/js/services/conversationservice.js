
angular.module('project').factory('ConversationService',  function($http, $q){

    var factory = {};
    factory.fazConversa = fazConversa;
    factory.getCidade = getCidade;

    function fazConversa(params){
        let url =  `/conversation?text=${params.mensagem}&context=${params.context}`;
             let data = {
                 text: params.mensagem,
                 context: params.context
             }
             return $http.get(url).then(function(resposta){
                return resposta;
             });
    }

    function getCidade(cidade){
        let url=`https://pt.wikipedia.org/api/rest_v1/page/summary/${cidade}`;
        return $http.get(url).then(function(resposta){
            return resposta;
         }).catch(function (data) {
            let url=`https://en.wikipedia.org/api/rest_v1/page/summary/${cidade}`;
            return $http.get(url).then(function(resposta){
            return resposta;
        });
    });
}

    return factory;

});