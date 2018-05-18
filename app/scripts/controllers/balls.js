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
  .controller("BallsCtrl", function(
    TabletopService,
    $scope,
    $rootScope,
    $interval,
    Slug
  ) {
    $rootScope.loading = true;
    $scope.intervalSeconds = 500;
    var intervalPromise;
    TabletopService.getData().then(function(data) {
      $rootScope.loading = false;

      $scope.totales = $rootScope.groupResults(data, true);

      $scope.ballsData = [];

      $scope.networkData = { root: { name: "root", parent: null } };

      angular.forEach($scope.totales, function(companyType, ixComp) {
        angular.forEach(companyType.children, function(level, ixLevel) {
          $scope.networkData[level.name] = { name: level.name, parent: "root" };
          angular.forEach(level.children, function(tech, ixTech) {
            $scope.networkData[tech.name] = {
              name: tech.name,
              parent: level.name
            };
            for (var i = 0; i < tech.qty; i++) {
              $scope.ballsData.push({
                tech: tech.name,
                level: level.name,
                company: companyType.name
              });
            }
          });
        });
      });

      $scope.treeData = d3
        .stratify()
        .id(function(d) {
          return d.name;
        })
        .parentId(function(d) {
          return d.parent;
        })(d3.values($scope.networkData));

      $scope.treeData.each(function(d) {
        d.name = d.id;
      });

      renderTree();
      run();
    });

    function getRandomTech() {
      return $scope.intervalData.splice(
        Math.floor(Math.random() * $scope.intervalData.length),
        1
      )[0];
    }

    function run() {
      $rootScope.renderBallsLegend();
      $scope.intervalData = angular.copy($scope.ballsData);
      intervalPromise = $interval(function() {
        newBall(getRandomTech());
        if ($scope.intervalData.length == 0) {
          $scope.intervalData = angular.copy($scope.ballsData);
        }
      }, $scope.intervalSeconds);
    }

    var ballTree = {};
    function renderTree() {
      ballTree.container = d3.select("#balls-chart-container");
      $scope.size = ballTree.container.node().getBoundingClientRect().width;

      var margin = { top: 20, right: 100, bottom: 20, left: 50 },
        width = $scope.size - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

      // declares a tree layout and assigns the size
      var treemap = d3.tree().size([height, width]);

      //  assigns the data to a hierarchy using parent-child relationships
      var nodes = d3.hierarchy($scope.treeData, function(d) {
        return d.children;
      });

      // maps the node data to the tree layout
      nodes = treemap(nodes);

      // append the svg object to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = ballTree.container
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg
          .append("g")
          .attr("id", "main-g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      // adds the links between the nodes
      var link = g
        .selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("id", function(d) {
          return Slug.slugify(d.parent.data.id + "-" + d.data.id);
        })
        .attr("d", function(d) {
          return (
            "M" +
            d.y +
            "," +
            d.x +
            "C" +
            (d.y + d.parent.y) / 2 +
            "," +
            d.x +
            " " +
            (d.y + d.parent.y) / 2 +
            "," +
            d.parent.x +
            " " +
            d.parent.y +
            "," +
            d.parent.x
          );
        });

      // adds each node as a group
      var node = g
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr("class", function(d) {
          return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("id", function(d) {
          return "node-" + Slug.slugify(d.data.name);
        })
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // adds the circle to the node
      node.append("circle").attr("r", 0);

      // adds the text to the node
      node
        .append("text")
        .attr("dy", ".35em")
        .attr("x", function(d) {
          return d.children ? 0 : 13;
        })
        .attr("y", function(d) {
          return d.children ? -20 : 0;
        })
        .style("text-anchor", function(d) {
          return d.children ? "middle" : "start";
        })
        .text(function(d) {
          return d.data.id != "root" ? d.data.name : "";
        });
    }

    function newBall(data) {
      //console.log("newBall", data);
      var startNode = d3.select("#node-root");
      var firstPath = d3.select("path#root-" + Slug.slugify(data.level));
      var secondPath = d3.select(
        "path#" + Slug.slugify(data.level) + "-" + Slug.slugify(data.tech)
      );

      var newball = ballTree.container
        .select("#main-g")
        .append("circle")
        .attr("r", 10)
        .attr("cx", startNode.datum().y)
        .attr("cy", startNode.datum().x)
        .style("fill", function(d) {
          return $rootScope.legend_company_colors(
            "Adopción de emprendimiento " + data.company
          );
        })
        .attr("class", function(d) {
          return "ball ball-" + Slug.slugify(data.company);
        });

      transition(newball, firstPath, secondPath, startNode.datum().x);
    }

    function transition(ball, firstPath, secondPath, yOffset) {
      ball
        .transition()
        .duration(1000)
        .attrTween("transform", translateAlong(firstPath.node(), yOffset))
        .on("end", function() {
          ball
            .transition()
            .duration(1000)
            .attrTween("transform", translateAlong(secondPath.node(), yOffset))
            .on("end", function() {
              ball
                .transition()
                .duration(500)
                .style("opacity", 0)
                .on("end", function() {
                  ball.remove();
                });
            });
        });
    }

    // Returns an attrTween for translating along the specified path element.
    function translateAlong(path, yOffset) {
      var l = path.getTotalLength();
      return function(d, i, a) {
        return function(t) {
          var p = path.getPointAtLength(l - t * l);
          return "translate(" + p.x + "," + (p.y - yOffset) + ")";
        };
      };
    }

    $scope.$on("$destroy", function() {
      if (intervalPromise) $interval.cancel(intervalPromise);
    });
  });
