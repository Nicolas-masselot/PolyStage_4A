controllers.controller('registerController', function ($scope, $rootScope, $location) {
    $scope.checkConnexion = function () {
        if ($rootScope.isConnected)
            $location.path("/home")
    }

    $scope.checkConnexion()
})
