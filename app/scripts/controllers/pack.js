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
  .controller("PackCtrl", function(
    TabletopService,
    $scope,
    $rootScope,
    $timeout
  ) {
    $rootScope.loading = true;
    $scope.nodes = [];
    TabletopService.getData().then(function(data) {
      $rootScope.loading = false;

      $scope.totales = $rootScope.groupResults(data, true);

      $scope.totales_labels = angular.copy($scope.totales).reverse();

      console.log("TOTAL!", $scope.total);

      renderPackChart("pack-chart-container", $scope.totales);

      $rootScope.renderAdopcionLegend();
    });

    $scope.changeType = function() {
      console.log("change", $scope.selectedType);
      d3.select("#pack-legends").classed("show", false);
      draw($scope.selectedType);
    };

    function format(str) {
      return str;
    }

    var packchart = {};

    function renderPackChart(container, data) {
      packchart = {};
      packchart.container = d3.select("#" + container);

      $scope.size = packchart.container.node().getBoundingClientRect().width;

      packchart.mainGroup = packchart.container
        .append("svg")
        .attr("width", $scope.size)
        .attr("height", $scope.size)
        .append("g")
        .attr("id", "main")
        .style("transform", "translate(0%,-15%)");

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

      $scope.nodes = pack(root);

      //console.log(nodes);
      $scope.selectedType = $rootScope.catNames["no_tech"];
      $timeout(function() {
        draw($scope.selectedType);
      }, 1000);
    }

    function draw(type) {
      console.log("draw", type);
      var nodes = angular.copy($scope.nodes);
      nodes.children = nodes.children
        .filter(function(a) {
          return a.data.name == type;
        })
        .sort(function(a, b) {
          return a.data.name > b.data.name ? 1 : -1;
        });

      //Animate
      var svgNodes = packchart.mainGroup
        .selectAll("g.node")
        .data(nodes.descendants());

      //exit
      svgNodes.exit().remove();

      //enter
      svgNodes
        .enter()
        .append("g")
        .attr("class", function(d) {
          return d.children ? "node" : "leaf node";
        })
        .each(function() {
          var g = d3.select(this);
          g.append("circle");
          g
            .append("text")
            .style("fill", function(d) {
              return "black";
            })
            .style("text-anchor", function(d) {
              return "middle";
            });
        });

      packchart.mainGroup
        .selectAll("g.node")
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .delay(function(d, i) {
          return i * 50;
        })
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      packchart.mainGroup
        .selectAll("g.node")
        .select("circle")
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .delay(function(d, i) {
          return i * 50;
        })
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

      packchart.mainGroup
        .selectAll("g.node")
        .select("text")
        .text(function(d) {
          return ["root", "level"].indexOf(d.data.type) > -1 ? "" : d.data.name;
        })
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .delay(function(d, i) {
          return i * 50;
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
        .on("end", function(d, ix, tot) {
          if (ix == tot.length - 1) {
            $scope.selectedTypeLegend = angular.copy($scope.selectedType);
            $scope.$apply();
            d3.select("#pack-legends").classed("show", true);
          }
        });
    }
  });
