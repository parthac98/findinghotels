/*---- app ----*/
var app = angular.module('myApp', []);

/*---- Controller ----*/
app.controller('myCtrl', function($scope, $http) {
    $scope.apiKey = "xAXRmHcNK3xhm3mlwRexklWqGc6eRddz53KZMW7lfi8";
    $scope.apiURL = 'https://places.sit.ls.hereapi.com/places/v1/discover/explore?at=52.51,13.4&cat=accommodation&apiKey='+$scope.apiKey;

    /*---- api call to get the details ----*/
    $http.get($scope.apiURL).then(function(response) {
        $scope.myHotelData = response.data.results.items;
        $scope.myHotelData = $scope.toValidData($scope.myHotelData);
        
        /*---- For testing only ----*/
        //console.log(JSON.stringify($scope.myHotelData));
    });

    /*---- Eleminate HTML tags from the data ----*/
    $scope.toValidData = function(data) {
        data.forEach(function(eachData) {
            eachData.vicinity = String(eachData.vicinity)
                .replace(/<[^>]+>/gm, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&rsquo;/, '\'')
                .replace(/(&ldquo;)|(&rdquo;)/g, '"');
        });
        return data;
    }; 

    /*---- Show Hotel Location Function ----*/
    $scope.showHotelLocation = function(lat, long) {
        //console.log("showHotelLocation  " + lat + "  " + long);
        
        
        // Get an instance of the geocoding service:
        var geocoder = platform.getGeocodingService();

        // Create the parameters for the reverse geocoding request:
        var reverseGeocodingParameters = {
            prox: ''+lat+','+long+'',
            mode: 'retrieveAddresses',
            maxresults: 1
        };

        // Call the geocode method with the geocoding parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        geocoder.reverseGeocode(
            reverseGeocodingParameters,
            onSuccess,
            function(e) { 
                alert(e); 
            }
        );
    }
});