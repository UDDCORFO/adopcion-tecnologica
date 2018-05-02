"use strict";

/**
 * @ngdoc overview
 * @name adopcionTecnologicaApp
 * @description
 * # adopcionTecnologicaApp
 *
 * Main module of the application.
 */
angular
  .module("adopcionTecnologicaApp", [
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch"
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        controllerAs: "main"
      })
      .when("/sankey", {
        templateUrl: "views/sankey.html",
        controller: "SankeyCtrl",
        controllerAs: "sankey"
      })
      .otherwise({
        redirectTo: "/"
      });
    $locationProvider.hashPrefix("");
  })
  .service("TabletopService", function($q, $rootScope) {
    this.data = false;

    this.loading = false;

    function yesNoToBoolean(d) {
      return d == "Yes" ? true : false;
    }
    function binaryToBoolean(d) {
      return parseInt(d) == 1 ? true : false;
    }
    function toNumberOrZero(d) {
      return isNaN(d) ? 0 : parseInt(d);
    }

    this.getData = function() {
      var that = this;
      return $q(function(resolve, reject) {
        if (!that.data) {
          Tabletop.init({
            key: "1QPAULewdG_e8bnIVzr2MhnoVQQPKzs6Orry8w8-IHak",
            callback: function(data, tabletop) {
              that.data = data.map(function(r) {
                return {
                  tech_entrepreneur: yesNoToBoolean(r.tech_entrepreneur),
                  rcount_adoptdigitech: toNumberOrZero(r.rcount_adoptdigitech),
                  rcount_advancetech: toNumberOrZero(r.rcount_advancetech),
                  rcount_basictech: toNumberOrZero(r.rcount_basictech),
                  adopt_notech: binaryToBoolean(r.adopt_notech),
                  adopt_basictech: binaryToBoolean(r.adopt_basictech),
                  adopt_advancetech: binaryToBoolean(r.adopt_advancetech),
                  adopt_digitech_online: yesNoToBoolean(
                    r.adopt_digitech_online
                  ),
                  adopt_digitech_web: yesNoToBoolean(r.adopt_digitech_web),
                  adopt_digitech_ecommerce: yesNoToBoolean(
                    r.adopt_digitech_ecommerce
                  ),
                  adopt_digitech_socialmedia: yesNoToBoolean(
                    r.adopt_digitech_socialmedia
                  ),
                  adopt_digitech_erp: yesNoToBoolean(r.adopt_digitech_erp),
                  adopt_digitech_diseno: yesNoToBoolean(
                    r.adopt_digitech_diseno
                  ),
                  adopt_digitech_crm: yesNoToBoolean(r.adopt_digitech_crm),
                  adopt_digitech_bigdata: yesNoToBoolean(
                    r.adopt_digitech_bigdata
                  ),
                  adopt_digitech_iot: yesNoToBoolean(r.adopt_digitech_iot),
                  adopt_digitech_cloud: yesNoToBoolean(r.adopt_digitech_cloud),
                  adopt_digitech_virtreality: yesNoToBoolean(
                    r.adopt_digitech_virtreality
                  ),
                  adopt_digitech_cogtech: yesNoToBoolean(
                    r.adopt_digitech_cogtech
                  ),
                  adopt_digitech_other: yesNoToBoolean(r.adopt_digitech_other),
                  adopt_digitech_notsure: yesNoToBoolean(
                    r.adopt_digitech_notsure
                  ),
                  adopt_digitech_none: yesNoToBoolean(r.adopt_digitech_none)
                };
              });
              resolve(angular.copy(that.data));
            },
            simpleSheet: true,
            parseNumbers: false
            /*postProcess: function(r) {
              var integers = ["region"];
              angular.forEach(r, function(value, ix) {
                if (integers.indexOf(ix) > -1) {
                  r[ix] = parseInt(value.replace(/\./g, ""));
                } else {
                  r[ix] = parseFloat((value + "").replace(/\,/g, "."));
                }
              });
              return r;
            }*/
          });
        } else {
          resolve(angular.copy(that.data));
        }
      });
    };
  })
  .run(function($rootScope) {
    $rootScope.tipo_colors = d3.scale
      .ordinal()
      .range([
        "#036633",
        "#698AC6",
        "#956336",
        "#92C14D",
        "#2B3180",
        "#E3117E",
        "#EF830C",
        "#E31F20"
      ]);

    $rootScope.catNames = {
      tech: "Tecnológico",
      no_tech: "No tecnológico",
      basic: "Tecnología básica",
      advanced: "Tecnología avanzada",
      none: "No adoptó nada"
    };

    $rootScope.fieldNames = {
      basic: {
        adopt_digitech_online: "Online",
        adopt_digitech_web: "Web",
        adopt_digitech_ecommerce: "Ecommerce",
        adopt_digitech_socialmedia: "Social Media",
        adopt_digitech_erp: "ERP",
        adopt_digitech_diseno: "Diseño",
        adopt_digitech_crm: "CRM"
      },
      advanced: {
        adopt_digitech_bigdata: "Big Data",
        adopt_digitech_iot: "IOT",
        adopt_digitech_cloud: "Cloud",
        adopt_digitech_virtreality: "VR",
        adopt_digitech_cogtech: "Cogtech",
        adopt_digitech_other: "Other"
      },
      none: {
        adopt_digitech_notsure: "No estoy seguro",
        adopt_digitech_none: "Ninguna"
      }
    };
  });
