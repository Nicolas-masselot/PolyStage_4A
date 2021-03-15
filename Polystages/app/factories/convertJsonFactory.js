simpleApp.factory('convertJsonFactory', function ($http) {
    return {

        // requete http pour la conversion du stage ( json to csv )
        convertAllStagesJsonToCsv: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/convertAllStagesJsonToCsv',
                params : { "data" : data }
            })
        },

        convertOneStageJsonToCsv: function (data) {
            return  $http({
                method: 'POST',
                url: 'http://localhost:8080/convertOneStageJsonToCsv',
                params : { "data" : data }
            })
        },

        convertStagesToJson: function (data) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/convertStagesCsvToJson',
                params : { "data" : data }
            })
        },

        downloadStagesCsv: function () {
            return  $http({
                method: 'GET',
                url: 'http://localhost:8080/downloadFileStagesCSV'
            })
        }
    }
})
