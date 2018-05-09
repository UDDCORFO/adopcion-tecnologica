"use strict";

/**
 * @ngdoc function
 * @name adopcionTecnologicaApp.controller:SankeyCtrl
 * @description
 * # SankeyCtrl
 * Controller of the adopcionTecnologicaApp
 */
angular
  .module("adopcionTecnologicaApp")
  .controller("PackCtrl", function(TabletopService, $scope, $rootScope) {
    $scope.loading = true;
    TabletopService.getData().then(function(data) {
      $scope.loading = false;

      /*$scope.rawdata = d3
        .nest()
        .key(function(d) {
          return d.tech_entrepreneur
            ? $scope.catNames["tech"]
            : $scope.catNames["no_tech"];
        })
        .map(data);*/

      $scope.total = $rootScope.groupResults(data);

      console.log("TOTAL!", $scope.total);

      renderPackChart("pack-tech-chart-container", $scope.total);
      //renderPackChart('pack-notech-chart-container',$scope.rawdata[$scope.catNames["no_tech"]]);
    });

    function format(str) {
      return str;
    }

    var packchart = {};

    function renderPackChart(container, data) {
      packchart[container] = {};
      packchart[container].container = d3.select("#" + container);

      $scope.size = packchart[container].container
        .node()
        .getBoundingClientRect().width;

      packchart[container].container
        .append("svg")
        .attr("width", $scope.size)
        .attr("height", $scope.size);

      var pack = d3
        .pack()
        .size([$scope.size, $scope.size])
        .padding(1);

      var root = d3
        .hierarchy({
          name: container,
          children: data
        })
        .sum(function(d) {
          return d.qty;
        })
        .sort(function(a, b) {
          return b.qty - a.qty;
        });

      var nodes = pack(root);

      console.log(nodes);

      //Animate
      var svgNodes = packchart[container].container
        .select("svg")
        .selectAll("circle")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr("class", function(d) {
          return d.children ? "node" : "leaf node";
        })
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      svgNodes
        .append("circle")
        .style("fill", function(d) {
          return "none";
        })
        .style("stroke", function(d) {
          return "black";
        })
        .attr("r", function(d) {
          return d.r;
        });

      svgNodes
        .append("text")
        .style("fill", function(d) {
          return "black";
        })
        .style("text-anchor", function(d) {
          return "middle";
        })
        /*.attr("transform", function(d) {
          return "translate(-" + d.r + "," + d.y + ")";
        })*/
        .text(function(d) {
          return d.data.type == "tech" ? d.data.name : "";
        });
    }
  });
