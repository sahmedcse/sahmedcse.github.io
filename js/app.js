var app = angular.module("portfolio", []);

app.controller("formController", function($scope, $http, $timeout) {
        $scope.emailCheck = true;
        $scope.subjectCheck = true;
        $scope.messageCheck = true;
        $scope.emailError = "";
        $scope.showSpinner = false;
        $scope.showResult = false;
        $scope.processing = false;

        $scope.checkForm = function() {
          $scope.processing = true;
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
            $scope.showSpinner = true;
            $scope.sendEmail(data);
          }else {
            $scope.processing = false;
          }
        }

        $scope.sendEmail = function(data) {
          $http({
            method : "POST",
            data : data,
            url : "https://emailapp.herokuapp.com/email"
          }).then(function callSucces(response) {
            $scope.showResult = false;
            $scope.result = "Email successfully sent"

            $timeout(function () {
              $scope.showSpinner = false;
              $scope.showResult = true;
            }, 3000).then(function () {
              $timeout(function () {
                $scope.email = null;
                $scope.subject = null;
                $scope.message = null;
                $scope.showResult = false;
                $scope.processing = false;
              }, 1000);
            });

          }, function callError(response) {
            $scope.showResult = false;
            $scope.result = "Email could not be sent"

            $timeout(function () {
              $scope.showSpinner = false;
              $scope.showResult = true;
            }, 3000).then(function () {
              $timeout(function () {
                $scope.email = null;
                $scope.subject = null;
                $scope.message = null;
                $scope.showResult = false;
                $scope.processing = false;
              }, 1000);
            });
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
