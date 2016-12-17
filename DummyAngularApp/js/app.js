'use strict';

var DUMMY_URL = "http://api.fixer.io/";
var DUMMY_URL2 = "http://api.fixer.io/latest?base=GBP";
var refreshTimeDelay = 5000;
var continousLoad;

var app = angular.module('dummyAngularApp', ["ngStorage", 'ngAnimate', 'ui.bootstrap']);


app.controller("dummyAngularController", ['$scope', '$http', function($scope, $http) {
	loadData();

	function loadData() {
		console.log("LOAD DATA!");
		if (isInternet()) {
			$http({
				method: "GET",
				url: DUMMY_URL2
			}).then(function mySucces(response) {
				console.log("test date = " +  response.data.date);
				//console.log("netcon0");
			}, function myError(response) {
				console.log("ERROR STATUS = " + response.statusText);
				$scope.netConnectivity = 1; // CONNECTION ERROR
				continousLoad = setTimeout(loadData, refreshTimeDelay);
				//console.log("netcon1");
			});
		} else {
			console.log("NOT CONNECTED TRY");
			// NOT CONNECTED TRY TO CONNECT TO THe INTERNET
			$scope.netConnectivity = 3;
			clearInterval(continousLoad);
			continousLoad = setTimeout(loadData, refreshTimeDelay);

		}
	}
	
	function isInternet() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", DUMMY_URL, false);
        try {
            xhr.send();
            if (xhr.status >= 200 && xhr.status < 304) {
                console.log("XHR status = " + xhr.status);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}]);