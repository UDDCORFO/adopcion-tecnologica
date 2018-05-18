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
  .controller("SankeyCtrl", function(TabletopService, $scope, $rootScope) {
    $rootScope.loading = true;
    TabletopService.getData().then(function(data) {
      $rootScope.loading = false;
      $scope.rawdata = data;
      renderSankeyChart();
    });

    var sankeychart = {};

    function renderSankeyChart() {
      sankeychart.w = d3
        .select("#sankey-chart-container")
        .node()
        .getBoundingClientRect().width;

      sankeychart.w =
        !sankeychart.svg || sankeychart.w < 500 ? sankeychart.w : sankeychart.w;

      sankeychart.h = 700;
      sankeychart.margin = 100;

      function prepareSankeyData() {
        //set up graph in same style as original example but empty
        var graph = { nodes: [], links: [] };

        var data = [];

        //{source: "1", target: "Espacio Público", value: 7}
        //{source: "Espacio Público", target: "Finalizada", value: 5}

        function calculateChildrens(techList, type, total) {
          var fields = $scope.fieldNames[type];

          var children = {};
          var totalTechList = 0;
          angular.forEach(fields, function(v, k) {
            var qty = _.reduce(
              techList,
              function(sum, n) {
                return sum + (n[k] == true ? 1 : 0);
              },
              0
            );
            totalTechList += qty;
            children[v] = {
              qty: qty,
              type: "tech"
            };
          });

          return {
            qty: totalTechList,
            children: children,
            type: "level"
          };
        }

        var temp = d3
          .nest()
          .key(function(d) {
            return d.tech_entrepreneur
              ? $scope.catNames["tech"]
              : $scope.catNames["no_tech"];
          })
          .rollup(function(hojasTech) {
            var basic = hojasTech.filter(function(n) {
              return n.rcount_basictech > 0;
            });
            var basicTotal = _.reduce(
              $scope.rawdata,
              function(sum, n) {
                return sum + (n.rcount_basictech > 0 ? 1 : 0);
              },
              0
            );
            var advanced = hojasTech.filter(function(n) {
              return n.rcount_advancetech > 0;
            });
            var advancedTotal = _.reduce(
              $scope.rawdata,
              function(sum, n) {
                return sum + (n.rcount_advancetech > 0 ? 1 : 0);
              },
              0
            );
            var none = hojasTech.filter(function(n) {
              return n.adopt_notech == true;
            });
            var noneTotal = _.reduce(
              $scope.rawdata,
              function(sum, n) {
                return sum + (n.adopt_notech == true ? 1 : 0);
              },
              0
            );
            var children = {};
            children[$scope.catNames["advanced"]] = calculateChildrens(
              advanced,
              "advanced",
              advancedTotal
            );
            children[$scope.catNames["basic"]] = calculateChildrens(
              basic,
              "basic",
              basicTotal
            );
            children[$scope.catNames["none"]] = calculateChildrens(
              none,
              "none",
              noneTotal
            );

            return {
              qty: hojasTech.length,
              type: "company",
              children: children
            };
          })
          .map($scope.rawdata);

        var ref = {};

        function setReferenceItem(key, data) {
          ref[key] = {
            type: data.type
          };
        }

        _.each(temp, function(c, company) {
          company = company.replace("$", "");
          setReferenceItem(company, c);
          _.each(c.children, function(t, level) {
            level = level.replace("$", "");
            setReferenceItem(level, t);
            data.push({
              source: company,
              target: level,
              value: t.qty,
              type: t.type
            });
            _.each(t.children, function(e, tech) {
              tech = tech.replace("$", "");
              setReferenceItem(tech, e);
              data.push({
                source: level,
                target: tech,
                value: e.qty,
                type: e.type
              });
            });
          });
        });

        var links = {};

        data.forEach(function(d) {
          var s = d.source.replace("$", "");
          var t = d.target.replace("$", "");

          graph.nodes.push({ name: s });
          graph.nodes.push({ name: t });

          if (!links[s + "|" + t]) {
            links[s + "|" + t] = {
              source: s,
              target: t,
              value: 0
            };
          }

          links[s + "|" + t].value += d.value;

          /*graph.links.push({ "source": d.source,
                             "target": d.target,
                             "value": +d.value });*/
        });

        _.forOwn(links, function(value, key) {
          graph.links.push(value);
        });

        // return only the distinct / unique nodes
        graph.nodes = d3.keys(
          d3
            .nest()
            .key(function(d) {
              return d.name;
            })
            .map(graph.nodes)
        );

        graph.nodes = graph.nodes
          .filter(function(d) {
            return d.indexOf("$") == 0 ? true : false;
          })
          .map(function(d) {
            return d.replace("$", "");
          });

        // loop through each link replacing the text with its index from node
        graph.links.forEach(function(d, i) {
          graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
          graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

        //now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        graph.nodes.forEach(function(d, i) {
          graph.nodes[i] = { "node:": i, name: d, data: ref[d] };
        });

        return graph;
      }

      if (!sankeychart.svg) {
        //Create
        sankeychart.svg = d3.select("#sankey-chart-container").append("svg");
        sankeychart.mainGroup = sankeychart.svg
          .append("g")
          .classed("main-group", true);
        sankeychart.mainGroup.append("rect").attr("fill", "white");
      }

      //Update
      sankeychart.svg
        .attr("width", sankeychart.w)
        .attr("height", sankeychart.h + 10);

      sankeychart.mainGroup
        .select("rect")
        .attr("width", sankeychart.w)
        .attr("height", sankeychart.h);

      sankeychart.sankey = d3
        .sankey()
        .nodeWidth(20)
        .nodePadding(2)
        .size([sankeychart.w, sankeychart.h]);

      sankeychart.path = sankeychart.sankey.link();

      sankeychart.graph = prepareSankeyData();

      //render
      sankeychart.sankey
        .nodes(sankeychart.graph.nodes)
        .links(sankeychart.graph.links)
        .layout(32);

      sankeychart.link = sankeychart.mainGroup
        .selectAll(".link")
        .data(sankeychart.graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", sankeychart.path)
        .style("stroke-width", function(d) {
          return Math.max(1, d.dy);
        })
        .style("stroke", function(d) {
          return $scope.tipo_colors.domain().indexOf(d.source.name) > -1
            ? $scope.tipo_colors(d.source.name)
            : $scope.tipo_colors(d.target.name);
        })
        .sort(function(a, b) {
          return b.dy - a.dy;
        });

      // add the link titles
      sankeychart.link.append("title").text(function(d) {
        var from = d.source.name;
        return from + " → " + d.target.name;
      });

      // add in the nodes
      sankeychart.node = sankeychart.mainGroup
        .selectAll(".node")
        .data(sankeychart.graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      // add the rectangles for the nodes
      sankeychart.node
        .append("rect")
        .attr("height", function(d) {
          return d.dy;
        })
        .attr("width", sankeychart.sankey.nodeWidth())
        .style("fill", function(d) {
          return $scope.tipo_colors.domain().indexOf(d.name) > -1
            ? $scope.tipo_colors(d.name)
            : "#000";
        })
        .append("title")
        .text(function(d) {
          var name = d.name;
          return name;
        });

      // add in the title for the nodes
      sankeychart.node
        .append("text")
        .attr("y", function(d) {
          return d.dy / 2;
        })
        .attr("x", function(d) {
          return d.data.type != "company"
            ? -3
            : 3 + sankeychart.sankey.nodeWidth();
        })
        .attr("text-anchor", function(d) {
          return d.data.type != "company" ? "end" : "start";
        })
        .attr("dy", ".35em")
        .attr("transform", null)
        .style("font-size", function(d) {
          return isNaN(d.name) ? "14px" : "10px";
        })
        .text(function(d) {
          return d.name;
        })
        .filter(function(d) {
          return d.x < sankeychart.width / 2;
        });
    }
  });
