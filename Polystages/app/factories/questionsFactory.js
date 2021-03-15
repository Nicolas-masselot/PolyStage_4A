simpleApp.factory('questionsFactory', function ($http) {
    return {
        getQuestionsByCat: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/questionsByCat/' + id
            })
        },
        getAllCompetences: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/competences/'
            })
        },
        getChoixByCompetenceId: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/competences/' + id
            })
        }
    }
})