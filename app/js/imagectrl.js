imageApp.controller('imageCtrl', ['$scope', '$http', '$routeParams', 'NgTableParams', '$filter', function($scope, $http, $routeParams, NgTableParams, $filter) {
    $scope.yourname = $routeParams.yourname;
    $scope.imaglink = 'data/images';
    $scope.image = {
        content: '',
        tenhinh: '',
        ngayup: '',
        nguoiup: $scope.yourname
    };
    var config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8;'
        }
    }
    $scope.save = function() {
        if ($scope.image.content == '') {
            alert('Vui lòng chọn ảnh');
        } else {
            $http.post('http://localhost:3000/save', JSON.stringify($scope.image)).then(function(res) {
                if (res.status == 200 && res.data == "OK") {
                    alert('upload thành công');
                    $scope.tableParams.data.push(
                        $scope.image
                    );
                    $scope.tableParams.page(1);
                    $scope.tableParams.reload();
                } else {
                    alert('lỗi trong quá trình upload');
                }
            });
        }
    };
    $scope.tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: {
            tenhinh: "asc"
        }
    }, {
        counts: [],
        getData: function($defer, params) {
            $http.get('http://localhost:3000/getdata/' + params.page() + '/' + params.count()).then(function(res) {
                params.total(res.data.total);
                var sorteddata = $filter('orderBy')(res.data.data, params.orderBy());
                $defer.resolve(sorteddata);
            });
        }
    });
}]);