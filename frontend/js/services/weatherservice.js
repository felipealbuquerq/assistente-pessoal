
angular.module('project').factory('WeatherService',  function($http, $q){

    var factory = {};
    factory.pegaClima = pegaClima;
    factory.getIconURL = getIconURL;

    function pegaClima(params){
        let url =  `https://twcservice.mybluemix.net:443/api/weather/v1/geocode/${params.lat}/${params.lon}/forecast/daily/3day.json?units=m&language=pt-BR`;
             return $http.get(url).then(function(resposta){
                return resposta;
             });
    }


    function getIconURL(code) {
        return "images/weathericons/icon" + code + ".png";
    }


    return factory;

});