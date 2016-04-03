/*global app*/
/* global _ */

var data = {
    students: []
};

app.controller('FamillyController', ['$scope', '$http', function($scope, $http) {
    $scope.newStudent = {};
    $scope.bfound = false;
    $scope.data = data; // important for databinding

    $scope.search = function(studentSeek) {
        return _.cloneDeep(_.find(data.students, {
            'name': studentSeek.name
        }));
    }

    $scope.refreshModel = function() {
        $http({
            method: "GET",
            url: "/students"
        }).then(function mySucces(response) {
            data.students = response.data;
            $scope.dataStatus = "ok";
        }, function myError(response) {
            $scope.dataStatus = response.statusText;
        });
    }

    $scope.createStudent = function(student) {
        var config = {
            headers: {
                "contentType": "application/json"
            }
        };
        $http.post("/addstudent", student, config)
            .then(
                function success(response) {
                    data.students.push(student);
                    $scope.dataStatus = "ok";
                },
                function failure(response) {
                    $scope.dataStatus = response.statusText;
                }
            );
    }

    $scope.searchAdd = function(studentSeek) {

        if (!studentSeek) {
            return;
        }

        this.refreshModel($http);

        var found = this.search(studentSeek);

        $scope.bfound = found;
        this.newStudent = found;

        if (!found) {
            this.createStudent(studentSeek);
        }
    };

}]);