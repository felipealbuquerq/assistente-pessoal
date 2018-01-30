angular.module('project').controller('chatController', ['$scope', 'ConversationService', function($scope, ConversationService) {
    $scope.conversa = [
        {text: 'Bom dia, o que vamos fazer hoje?', autor: true},
        {text: 'Você sabe contar piadas?', autor: false},
        {text: 'piu, piu, piu', autor: true}
    ]
    $scope.context = "inicio"
    $scope.inicio = {text:"inicio de conversa"};

    $scope.fala = function(mensagem){
        $scope.conversa.push({
            text: mensagem,
            autor: false,
            context: $scope.context
        })
        let fala = {
            mensagem: mensagem,
            context: $scope.context
        }
        ConversationService.fazConversa(fala).then(function(resposta){
            let textoResposta = resposta.data.output.text[0];
            $scope.context = resposta.data.context;
            let conversa = {
                text: textoResposta,
                autor: true,
                context: $scope.context
            };
            $scope.conversa.push(conversa)
            $scope.mensagem=""
        });
        
    }

    $scope.cidade = function(cidade) {
        ConversationService.getCidade(cidade).then(function(resposta){
            console.log(resposta)
            let conversa = {}
            if(resposta.data.coordinates){
                conversa = {
                    text: `${cidade} - lat:${resposta.data.coordinates.lat}/lon:${resposta.data.coordinates.lon}`,
                    autor: true,
                    context: $scope.context
                };
                $scope.conversa.push(conversa)
            }
            
            conversa = {
                text: `${resposta.data.displaytitle} - ${resposta.data.description || resposta.data.extract}`,
                autor: true,
                context: $scope.context
            };
            $scope.conversa.push(conversa)
            $scope.mensagem=""
        });
        
    }

    $scope.maisInfo = function(info) {
        ConversationService.getCidade(info).then(function(resposta){
            console.log(resposta)
            let conversa = {}
            
            
            conversa = {
                text: `${resposta.data.extract}`,
                autor: true,
                context: $scope.context
            };
            $scope.conversa.push(conversa)
            $scope.mensagem=""
        });
        
    }
}])