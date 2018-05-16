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
    $rootScope.loading = true;
    TabletopService.getData().then(function(data) {
      $rootScope.loading = false;

      $scope.total = $rootScope.groupResults(data, true);

      console.log("TOTAL!", $scope.total);

      renderPackChart("pack-chart-container", $scope.total);

      $rootScope.renderAdopcionLegend();
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
        .padding(3);

      var root = d3
        .hierarchy({
          type: "root",
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
        .append("g")
        .attr("id", "main")
        .style("transform", "translate(0%,-15%)")
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
          return d.data.parentType == "level"
            ? $rootScope.thresdhold[d.data.parentId](d.data.qty)
            : "none";
        })
        .style("stroke", function(d) {
          var t = "";
          switch (d.data.type) {
            case "company":
              t = "gray";
              break;
            case "level":
              t = $rootScope.thresdhold[d.data.id](100);
              break;
            case "tech":
              t = $rootScope.thresdhold[d.data.parentId](d.data.qty);
              break;
            case "root":
              t = "none";
              break;
          }
          return t;
        })
        .style("stroke-width", function(d) {
          var t = 0;
          switch (d.data.type) {
            case "company":
            case "level":
              t = 1;
              break;
            case "tech":
              t = 2;
              break;
            case "root":
              break;
          }
          return t;
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
        .attr("transform", function(d) {
          var t = "";
          switch (d.data.type) {
            case "tech":
              t = "translate(0,5)";
              break;
            case "level":
              t = "translate(0," + (d.r + 15) + ")";
              break;
            case "company":
              t = "translate(0," + (d.r * -1 - 5) + ")";
              break;
          }
          return t;
        })
        .text(function(d) {
          return ["root", "level"].indexOf(d.data.type) > -1 ? "" : d.data.name;
        });
    }
  });
