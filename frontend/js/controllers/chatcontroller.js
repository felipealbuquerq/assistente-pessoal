angular.module('project').controller('chatController', ['$scope', 'ConversationService', function($scope, ConversationService) {
    $scope.conversa = [
        {text: 'Bom dia, o que vamos fazer hoje?', autor: true},
        {text: 'Você sabe contar piadas?', autor: false},
        {text: 'piu, piu, piu', autor: true}
    ]
    $scope.inicio = {text:"inicio de conversa"};

    $scope.fala = function(mensagem){
        $scope.conversa.push({
            text: mensagem,
            autor: false
        })
        let fala = {
            mensagem: mensagem,
            context: 'inicio'
        }
        ConversationService.fazConversa(fala).then(function(resposta){
            $scope.conversa.push(resposta);
            $scope.mensagem=""
        });
        
    }
}])