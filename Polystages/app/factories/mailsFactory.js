simpleApp.factory('mailsFactory', function ($http) {
    return {
        sendEvalAlert: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/mail/evaluation/',
                params: data
            })
        },
        sendRappels: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/mail/rappel',
                params: data
            })
        }
    }
})