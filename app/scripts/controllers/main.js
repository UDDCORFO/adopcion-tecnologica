"use strict";

/**
 * @ngdoc function
 * @name adopcionTecnologicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adopcionTecnologicaApp
 */
angular
  .module("adopcionTecnologicaApp")
  .controller("MainCtrl", function(TabletopService, $scope, $rootScope) {
    $scope.rawdata = [];

    $scope.loading = true;

    TabletopService.getData().then(function(data) {
      console.log("data", data);
      $scope.rawdata = data;

      $scope.totales = $rootScope.groupResults(data, true);
      console.log("totales", $scope.totales);

      $scope.loading = false;
    });
  });
