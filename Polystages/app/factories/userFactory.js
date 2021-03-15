simpleApp.factory('userFactory', function ($http) {
    return {
        connexion: function (identifiant, password) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/authentification',
                params: { "username": identifiant, "password": sha512(password) }
            })
        },
        getEleveNameById: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/eleves/' + id,
                params : { 'eleveId' : id }
            })
        },
        getEleveIdByNomAndPrenom: function (nom, prenom) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/elevesId/byNomAndPrenom',
                params: { "nom" : nom , "prenom": prenom }
            })
        },
        getTuteurIdByNomAndPrenom: function (nom, prenom) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/tuteurId/byNomAndPrenom',
                params: { "nom" : nom , "prenom": prenom }
            })
        },
        getEnsNameById: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/enseignantsNameById',
                params: { "idens" : id }
            })
        },
        getTuteurNameById: function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/tuteurNameById',
                params: { "idtuteur" : id }
            })
        },
    }
})
