(function() {
   /* global angular */
   /* global _ */
   var app = angular.module('chatClient', []);

   var data = {
      text: 'hello',
      phrase: ['how ', 'are ', 'you', '?'],
      canRespond: true,
      students: [{
         name: "dupond",// now erased by refresh from server
         firstname: "jean"
      }]
   };

   var searchReview = {
      results: []
   }

   app.controller('exampleController', ['$scope', function($scope) {

      data.text += " you";
      $scope.data = data;
      return data;
   }]);

   app.controller('FamillyController', ['$scope', '$http', function($scope, $http) {
      $scope.newStudent = {};
      $scope.bfound = false;
      
      $scope.search  = function(studentSeek) {
         return _.cloneDeep(_.find(data.students, {
            'name': studentSeek.name
         }));
      }
      
      $scope.refreshModel  = function() {
         $http({
            method : "GET",
            url : "/students"
         }).then(function mySucces(response) {
            data.students = response.data;
            $scope.dataStatus = "ok";
         }, function myError(response) {
            $scope.dataStatus = response.statusText;
         });
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
            data.students.push(studentSeek);
            searchReview.results.push(studentSeek);
         }
         
         return searchReview;
      };

   }]);

}());