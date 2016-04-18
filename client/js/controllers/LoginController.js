/*global app*/
app.controller('LoginController', ['$scope', '$location', '$rootScope', '$window', function($scope, $location, $rootScope, $window) {
    // $scope.user={};
    
    // $scope.formSignin = {
    //     email: "yup.gmail.com",
    //     password: "tonton"
    // };
    
    
    var previous = $rootScope.history[$rootScope.history.length -2];
    var current = $rootScope.history[$rootScope.history.length -1];
    
    $scope.send = function(){
        $scope.formSignin.result = "bad loggin";
        
        if($scope.formSignin.$valid) {
            $scope.formSignin.email = "yop";
        } else {
            $scope.formSignin.email = "yup";
        }
        
        if (isPasswordCorrect($scope.formSignin.password)){
            $scope.formSignin.result = "logged";
            $rootScope.logged = true;
            // Todo change root 
            $location.path(previous);
        } else {
            $rootScope.logged = false;
        }
    }
    
    function isPasswordCorrect(pass){
        // todo call server
        var secretPass = "toto";
        
        if (pass === secretPass) {
            return true;
        }    
        
        return false;
    }
    
}]);