simpleApp.factory('enseignantsFactory', function ($http) {
    return {
        getEnseignants: function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/enseignants'
            })
        },
        getEnseignantsIdByNomAndPrenom: function (nom, prenom) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/enseignantsId/ByNomPrenom',
                params: { 'nom': nom, 'prenom': prenom}
            })
        },
    }
})
