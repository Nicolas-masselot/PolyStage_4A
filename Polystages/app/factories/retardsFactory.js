simpleApp.factory('retardsFactory', function ($http) {
    return {
        getRetardsEleve: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/eleves/retard'
            })
        },
        getRetardsTuteur: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/tuteurs/retard'
            })
        },
        updateRetards: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/stages/update'
            })
        }
    }
})
