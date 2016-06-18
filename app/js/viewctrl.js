imageApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.images = null;
    $scope.getImages = function() {
        $http.get('http://localhost:3000/data/image.json').then(function(res) {
            $scope.images = res.data;
            $scope.src = $scope.images[0].content;
        });
    }
    $scope.zoomLvl = 4;

    $scope.imgClick = function(src) {
        console.log(src);
        $scope.src = src;
    }
}]);