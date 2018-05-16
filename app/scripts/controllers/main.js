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

    $rootScope.loading = true;

    TabletopService.getData().then(function(data) {
      $scope.rawdata = data;

      $scope.totales = $rootScope.groupResults(data, true);

      $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        setTimeout(function() {
          $(".has-tooltip")
            .first()
            .tooltip("show");
        }, 2000);
      });

      $rootScope.loading = false;
    });
  });
