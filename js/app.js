var app = angular.module("portfolio", []);

app.controller("formController", function($scope, $http) {
        $scope.emailCheck = true;
        $scope.subjectCheck = true;
        $scope.messageCheck = true;
        $scope.emailError = "";

        $scope.checkForm = function() {
          if(textChecker($scope.email) || emptyChecker($scope.email)) {
            $scope.emailError = "This is a required field";
            $scope.emailCheck = textChecker($scope.email) && emptyChecker($scope.email);
          } else {
            $scope.emailError = "Please enter a valid email";
            $scope.emailCheck = emailChecker($scope.email);
          }
          $scope.subjectCheck = !(textChecker($scope.subject) || emptyChecker($scope.subject));
          $scope.messageCheck = !(textChecker($scope.message) || emptyChecker($scope.message));

          if($scope.emailCheck && $scope.subjectCheck && $scope.messageCheck) {
            var data = {};
            data.emailFrom = $scope.email;
            data.subject = $scope.subject;
            data.emailContent = $scope.message;
            data = JSON.stringify(data);

            $scope.sendEmail(data);
          }

        }

        $scope.sendEmail = function(data) {
          $http({
            method : "POST",
            data : data,
            url : "https://emailapp.herokuapp.com/email"
          }).then(function mySucces(response) {
            $scope.email = null;
            $scope.subject = null;
            $scope.message = null;
          }, function myError(response) {
            $scope.email = null;
            $scope.subject = null;
            $scope.message = null;
          });
        }
});

function emailChecker(emailValue) {
  var expr = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}");
  return expr.test(emailValue);
}

function textChecker(textValue) {
  return textValue == null;
}

function emptyChecker(textValue) {
  return textValue === "";
}
