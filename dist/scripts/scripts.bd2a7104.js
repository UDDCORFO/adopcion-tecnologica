"use strict";angular.module("adopcionTecnologicaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/sankey",{templateUrl:"views/sankey.html",controller:"SankeyCtrl",controllerAs:"sankey"}).otherwise({redirectTo:"/"}),b.hashPrefix("")}]).service("TabletopService",["$q","$rootScope",function(a,b){function c(a){return"Yes"==a?!0:!1}function d(a){return 1==parseInt(a)?!0:!1}function e(a){return isNaN(a)?0:parseInt(a)}this.data=!1,this.loading=!1,this.getData=function(){var b=this;return a(function(a,f){b.data?a(angular.copy(b.data)):Tabletop.init({key:"1QPAULewdG_e8bnIVzr2MhnoVQQPKzs6Orry8w8-IHak",callback:function(f,g){b.data=f.map(function(a){return{tech_entrepreneur:c(a.tech_entrepreneur),rcount_adoptdigitech:e(a.rcount_adoptdigitech),rcount_advancetech:e(a.rcount_advancetech),rcount_basictech:e(a.rcount_basictech),adopt_notech:d(a.adopt_notech),adopt_basictech:d(a.adopt_basictech),adopt_advancetech:d(a.adopt_advancetech),adopt_digitech_online:c(a.adopt_digitech_online),adopt_digitech_web:c(a.adopt_digitech_web),adopt_digitech_ecommerce:c(a.adopt_digitech_ecommerce),adopt_digitech_socialmedia:c(a.adopt_digitech_socialmedia),adopt_digitech_erp:c(a.adopt_digitech_erp),adopt_digitech_diseno:c(a.adopt_digitech_diseno),adopt_digitech_crm:c(a.adopt_digitech_crm),adopt_digitech_bigdata:c(a.adopt_digitech_bigdata),adopt_digitech_iot:c(a.adopt_digitech_iot),adopt_digitech_cloud:c(a.adopt_digitech_cloud),adopt_digitech_virtreality:c(a.adopt_digitech_virtreality),adopt_digitech_cogtech:c(a.adopt_digitech_cogtech),adopt_digitech_other:c(a.adopt_digitech_other),adopt_digitech_notsure:c(a.adopt_digitech_notsure),adopt_digitech_none:c(a.adopt_digitech_none)}}),a(angular.copy(b.data))},simpleSheet:!0,parseNumbers:!1})})}}]).run(["$rootScope",function(a){a.tipo_colors=d3.scale.ordinal().range(["#036633","#698AC6","#956336","#92C14D","#2B3180","#E3117E","#EF830C","#E31F20"]),a.catNames={tech:"Tecnológico",no_tech:"No tecnológico",basic:"Tecnología básica",advanced:"Tecnología avanzada",none:"No adoptó nada"},a.fieldNames={basic:{adopt_digitech_online:"Online",adopt_digitech_web:"Web",adopt_digitech_ecommerce:"Ecommerce",adopt_digitech_socialmedia:"Social Media",adopt_digitech_erp:"ERP",adopt_digitech_diseno:"Diseño",adopt_digitech_crm:"CRM"},advanced:{adopt_digitech_bigdata:"Big Data",adopt_digitech_iot:"IOT",adopt_digitech_cloud:"Cloud",adopt_digitech_virtreality:"VR",adopt_digitech_cogtech:"Cogtech",adopt_digitech_other:"Other"},none:{adopt_digitech_notsure:"No estoy seguro",adopt_digitech_none:"Ninguna"}}}]),d3.sankey=function(){function a(){n.forEach(function(a){a.sourceLinks=[],a.targetLinks=[]}),o.forEach(function(a){var b=a.source,c=a.target;"number"==typeof b&&(b=a.source=n[a.source]),"number"==typeof c&&(c=a.target=n[a.target]),b.sourceLinks.push(a),c.targetLinks.push(a)})}function b(){n.forEach(function(a){a.value=Math.max(d3.sum(a.sourceLinks,i),d3.sum(a.targetLinks,i))})}function c(){for(var a,b=n,c=0;b.length;)a=[],b.forEach(function(b){b.x=c,b.dx=k,b.sourceLinks.forEach(function(b){a.push(b.target)})}),b=a,++c;d(c),e((m[0]-k)/(c-1))}function d(a){n.forEach(function(b){b.sourceLinks.length||(b.x=a-1)})}function e(a){n.forEach(function(b){b.x*=a})}function f(a){function b(){var a=d3.min(g,function(a){return(m[1]-(a.length-1)*l)/d3.sum(a,i)});g.forEach(function(b){b.forEach(function(b,c){b.y=c,b.dy=b.value*a})}),o.forEach(function(b){b.dy=b.value*a})}function c(a){function b(a){return h(a.source)*a.value}g.forEach(function(c,d){c.forEach(function(c){if(c.targetLinks.length){var d=d3.sum(c.targetLinks,b)/d3.sum(c.targetLinks,i);c.y+=(d-h(c))*a}})})}function d(a){function b(a){return h(a.target)*a.value}g.slice().reverse().forEach(function(c){c.forEach(function(c){if(c.sourceLinks.length){var d=d3.sum(c.sourceLinks,b)/d3.sum(c.sourceLinks,i);c.y+=(d-h(c))*a}})})}function e(){g.forEach(function(a){var b,c,d,e=0,g=a.length;for(a.sort(f),d=0;g>d;++d)b=a[d],c=e-b.y,c>0&&(b.y+=c),e=b.y+b.dy+l;if(c=e-l-m[1],c>0)for(e=b.y-=c,d=g-2;d>=0;--d)b=a[d],c=b.y+b.dy+l-e,c>0&&(b.y-=c),e=b.y})}function f(a,b){return a.y-b.y}var g=d3.nest().key(function(a){return a.x}).sortKeys(d3.ascending).entries(n).map(function(a){return a.values});b(),e();for(var j=1;a>0;--a)d(j*=.99),e(),c(j),e()}function g(){function a(a,b){return a.source.y-b.source.y}function b(a,b){return a.target.y-b.target.y}n.forEach(function(c){c.sourceLinks.sort(b),c.targetLinks.sort(a)}),n.forEach(function(a){var b=0,c=0;a.sourceLinks.forEach(function(a){a.sy=b,b+=a.dy}),a.targetLinks.forEach(function(a){a.ty=c,c+=a.dy})})}function h(a){return a.y+a.dy/2}function i(a){return a.value}var j={},k=40,l=8,m=[10,10],n=[],o=[];return j.nodeWidth=function(a){return arguments.length?(k=+a,j):k},j.nodePadding=function(a){return arguments.length?(l=+a,j):l},j.nodes=function(a){return arguments.length?(n=a,j):n},j.links=function(a){return arguments.length?(o=a,j):o},j.size=function(a){return arguments.length?(m=a,j):m},j.layout=function(d){return a(),b(),c(),f(d),g(),j},j.relayout=function(){return g(),j},j.link=function(){function a(a){var c=a.source.x+a.source.dx,d=a.target.x,e=d3.interpolateNumber(c,d),f=e(b),g=e(1-b),h=a.source.y+a.sy+a.dy/2,i=a.target.y+a.ty+a.dy/2;return"M"+c+","+h+"C"+f+","+h+" "+g+","+i+" "+d+","+i}var b=.5;return a.curvature=function(c){return arguments.length?(b=+c,a):b},a},j},angular.module("adopcionTecnologicaApp").controller("MainCtrl",["TabletopService","$scope",function(a,b){b.rawdata=[],b.loading=!0,a.getData().then(function(a){console.log("data",a),b.rawdata=a,b.loading=!1})}]),angular.module("adopcionTecnologicaApp").controller("SankeyCtrl",["TabletopService","$scope",function(a,b){function c(){function a(){function a(a,c,d){var e=b.fieldNames[c],f={},g=0;return angular.forEach(e,function(b,c){var d=_.reduce(a,function(a,b){return a+(1==b[c]?1:0)},0);g+=d,f[b]={qty:d,type:"tech"}}),{qty:g,children:f,type:"level"}}function c(a,b){g[a]={type:b.type}}var d={nodes:[],links:[]},e=[],f=d3.nest().key(function(a){return a.tech_entrepreneur?b.catNames.tech:b.catNames.no_tech}).rollup(function(c){var d=c.filter(function(a){return a.rcount_basictech>0}),e=_.reduce(b.rawdata,function(a,b){return a+(b.rcount_basictech>0?1:0)},0),f=c.filter(function(a){return a.rcount_advancetech>0}),g=_.reduce(b.rawdata,function(a,b){return a+(b.rcount_advancetech>0?1:0)},0),h=c.filter(function(a){return 1==a.adopt_notech}),i=_.reduce(b.rawdata,function(a,b){return a+(1==b.adopt_notech?1:0)},0),j={};return j[b.catNames.advanced]=a(f,"advanced",g),j[b.catNames.basic]=a(d,"basic",e),j[b.catNames.none]=a(h,"none",i),{qty:c.length,type:"company",children:j}}).map(b.rawdata),g={};_.each(f,function(a,b){c(b,a),_.each(a.children,function(a,d){c(d,a),e.push({source:b,target:d,value:a.qty,type:a.type}),_.each(a.children,function(a,b){c(b,a),e.push({source:d,target:b,value:a.qty,type:a.type})})})});var h={};return e.forEach(function(a){d.nodes.push({name:a.source}),d.nodes.push({name:a.target}),h[a.source+"|"+a.target]||(h[a.source+"|"+a.target]={source:a.source,target:a.target,value:0}),h[a.source+"|"+a.target].value+=a.value}),_.forOwn(h,function(a,b){d.links.push(a)}),d.nodes=d3.keys(d3.nest().key(function(a){return a.name}).map(d.nodes)),d.links.forEach(function(a,b){d.links[b].source=d.nodes.indexOf(d.links[b].source),d.links[b].target=d.nodes.indexOf(d.links[b].target)}),d.nodes.forEach(function(a,b){d.nodes[b]={"node:":b,name:a,data:g[a]}}),d}d.w=d3.select("#sankey-chart-container").node().getBoundingClientRect().width,d.w=!d.svg||d.w<500?d.w:d.w,d.h=700,d.margin=100,d.svg||(d.svg=d3.select("#sankey-chart-container").append("svg"),d.mainGroup=d.svg.append("g").classed("main-group",!0),d.mainGroup.append("rect").attr("fill","white")),d.svg.attr("width",d.w).attr("height",d.h),d.mainGroup.select("rect").attr("width",d.w).attr("height",d.h),d.sankey=d3.sankey().nodeWidth(20).nodePadding(2).size([d.w,d.h]),d.path=d.sankey.link(),d.graph=a(),d.sankey.nodes(d.graph.nodes).links(d.graph.links).layout(32),d.link=d.mainGroup.selectAll(".link").data(d.graph.links).enter().append("path").attr("class","link").attr("d",d.path).style("stroke-width",function(a){return Math.max(1,a.dy)}).style("stroke",function(a){return b.tipo_colors.domain().indexOf(a.source.name)>-1?b.tipo_colors(a.source.name):b.tipo_colors(a.target.name)}).sort(function(a,b){return b.dy-a.dy}),d.link.append("title").text(function(a){var b=a.source.name;return b+" → "+a.target.name+"\nCantidad: "+a.value}),d.node=d.mainGroup.selectAll(".node").data(d.graph.nodes).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"}),d.node.append("rect").attr("height",function(a){return a.dy}).attr("width",d.sankey.nodeWidth()).style("fill",function(a){return b.tipo_colors.domain().indexOf(a.name)>-1?b.tipo_colors(a.name):"#000"}).append("title").text(function(a){var b=a.name;return b+="\nCantidad: "+a.value}),d.node.append("text").attr("y",function(a){return a.dy/2}).attr("x",function(a){return console.log(a),"company"!=a.data.type?-3:3+d.sankey.nodeWidth()}).attr("text-anchor",function(a){return"company"!=a.data.type?"end":"start"}).attr("dy",".35em").attr("transform",null).style("font-size",function(a){return isNaN(a.name)?"14px":"10px"}).text(function(a){return a.name}).filter(function(a){return a.x<d.width/2})}b.loading=!0,a.getData().then(function(a){b.loading=!1,b.rawdata=a,c()});var d={}}]),angular.module("adopcionTecnologicaApp").run(["$templateCache",function(a){a.put("views/main.html",'<p class="text-center"><span ng-if="loading">Cargando...</span></p> <div class="row"> <div class="col-md-4"> <div class="jumbotron text-center"> <h1><span ng-if="!loading">{{rawdata.length}}</span><span ng-if="loading">...</span></h1> <p>registros</p> </div> </div> </div>'),a.put("views/sankey.html",'<p class="text-center"><span ng-if="loading">Cargando...</span></p> <div class="row"> <div class="col-sm-12"> <div id="sankey-chart-container"></div> </div> </div>')}]);