simpleApp.factory('evalFactory', function ($http) {
    return {
        sendEval: function (idstage, data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/stages/eval/' + idstage,
                data: data
            })
        },
        sendEvalCompetences: function (idstage, data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/stages/evalcompetences/' + idstage,
                data: data
            })
        }
    }
})
