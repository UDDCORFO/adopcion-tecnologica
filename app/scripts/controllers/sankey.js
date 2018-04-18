"use strict";

/**
 * @ngdoc function
 * @name adopcionTecnologicaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the adopcionTecnologicaApp
 */
angular
  .module("adopcionTecnologicaApp")
  .controller("SankeyCtrl", function(TabletopService, $scope) {
    $scope.loading = true;
    TabletopService.getData().then(function(data) {
      $scope.loading = false;
      console.log("data", data);
      $scope.rawdata = data;
      renderSankeyChart();
    });

    var sankeychart = {};

    $scope.obras = [
      {
        id: "1167",
        entorno: "Entorno Retiro",
        nombre:
          "Entorno Retiro: Retiro Etapa III: Suipacha II + Arroyo + Juncal",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -Como Parte Del Plan Integral Para El \u00c1rea De Retiro, En La Etapa II Se Propone La Nivelaci\u00f3n De La Calle Arroyo Entre Carlos Pellegrini Y Esmeralda Y De La Calle Suipacha Entre Juncal Y Av. Del Libertador, El Ensanche De Aceras Sobre La Calle Arroyo Y La Correcci\u00f3n De Ritmos De Arbolado Y Luminarias.",
        monto_contrato: "24490004",
        comuna: "1",
        lat: "-34.6239225542",
        lng: "-58.3655131199",
        fecha_inicio: "10/01/2016",
        fecha_fin_inicial: "07/01/2017",
        plazo_meses: "9",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/ba-obras/1167.JPG",
        licitacion_oferta_empresa: "Da Fr\u00e9 Obras Civiles S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/retiro"
      },
      {
        id: "1168",
        entorno: "Entorno Retiro",
        nombre: "Entorno Retiro: Retiro I: Basavilbaso + Juncal",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -Como Parte Del Plan Integral Para El \u00c1rea De Retiro, En La Etapa I Se Propone La Nivelaci\u00f3n De La Calle Basavilbaso Entre Arenales Y Av. Del Libertador, El Ensanche De Aceras En La Calle Juncal Entre Esmeralda Y Maip\u00fa/Av. Del Libertador, Incorporaci\u00f3n De Una Segunda L\u00ednea De Arbolado Sobre Juncal, La Correcci\u00f3n Del Ritmo De Arbolado Y Luminarias. Se Propone Adem\u00e1s La Exaltaci\u00f3n De La Esquina Basavilbaso Y Juncal Mediante Luminarias Y El Reemplazo De Estacionamiento A 90\u00ba Por Paralelo Sobre La Calle Juncal.",
        monto_contrato: "22259416",
        comuna: "1",
        lat: "-34.6239225542",
        lng: "-58.3655131199",
        fecha_inicio: "11/01/2016",
        fecha_fin_inicial: "07/01/2017",
        plazo_meses: "8",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/ba-obras/1168.JPG",
        licitacion_oferta_empresa: "Cunumi S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/retiro"
      },
      {
        id: "1171",
        entorno: "Plan Tribunales",
        nombre:
          "Plan Tribunales: Tribunales I: Renovaci\u00f3n Integral De Plaza Lavalle",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -En El Marco Del Plan Para El \u00c1rea De Tribunales, El Proyecto Plantea La Traza De Un Camino Principal Que \u201cEnlaza Las Tres Manzanas Uniendo Los Puntos Principales Y De Tr\u00e1nsito Frecuente. El Mismo Nace En El Extremo De Diagonal Norte, Uniendo La Plaza Con El Obelisco Y La Boca Del Subte L\u00ednea D, Hasta Llegar A Av. C\u00f3rdoba En Su Intersecci\u00f3n Con La Calle Libertad. Se Incorporan Caminos Secundarios M\u00e1s Angostos Y Se Prev\u00e9 El Ensanche De La Vereda Frente Al Teatro Col\u00f3n, Proyectando Un Espacio A Modo De \u201cAtrio. Se Contempla La Reubicaci\u00f3n De La Feria De Libreros, Y La Disminuci\u00f3n De La Presencia De Autom\u00f3viles Trasladando Los Estacionamientos Al Subsuelo, Se Incorpora Un Nuevo Patio De Juegos Y Nuevo Solado Perimetral.",
        monto_contrato: "48969994",
        comuna: "1",
        lat: "-34.5865878232",
        lng: "-58.3858530117",
        fecha_inicio: "11/01/2016",
        fecha_fin_inicial: "08/01/2017",
        plazo_meses: "10",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_tribunales1_plazalavalle.jpg",
        licitacion_oferta_empresa: "Algieri S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/plan-tribunales"
      },
      {
        id: "1172",
        entorno: "Plan Tribunales",
        nombre:
          "Plan Tribunales: Tribunales II: Calles Lavalle, Diagonal Norte Y Pasaje Del Carmen",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -En La Etapa II Del Plan Integral Para El \u00c1rea De Tribunales, Se Propone La Reparaci\u00f3n De Solados Sobre Av. Diagonal R. S. Pe\u00f1a, La Nivelaci\u00f3n De La Calle Lavalle Entre Cerrito Y Libertad, El Ajuste De Radios De Esquina En Diagonal R. S\u00e1enz Pe\u00f1a Y Lavalle, El Ensanche De Aceras En La Calle Libertad Entre Av. Corrientes Y Lavalle Y La Correcci\u00f3n E Intensificaci\u00f3n De Ritmos De Arbolado Y Alumbrado.",
        monto_contrato: "14898796",
        comuna: "1",
        fecha_inicio: "10/01/2016",
        fecha_fin_inicial: "5/01/2017",
        plazo_meses: "7",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_tribunales2_calles.jpg",
        licitacion_oferta_empresa: "Da Fr\u00e9 Obras Civiles S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/plan-tribunales"
      },
      {
        id: "91",
        entorno: "Parque Del Bajo",
        nombre: "Parque Del Bajo: Helipuerto Y Obras Civiles",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Desarrollo Urbano Y Transporte",
        monto_contrato: "16972287",
        comuna: "1",
        barrio: "Montserrat",
        lat: "-34.60778447453",
        lng: "-58.413461744785",
        fecha_inicio: "27/07/2017",
        fecha_fin_inicial: "31/01/2018",
        plazo_meses: "6",
        porcentaje_avance: "80",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/baobras/mduyt/helipuerto%20_2.png",
        imagen_2:
          "http://cdn2.buenosaires.gob.ar/baobras/mduyt/helipuerto_1.png",
        licitacion_oferta_empresa: "Kir Srl",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/Parque-Del-Bajo",
        pliego_descarga:
          "http://www.buenosaires.gov.ar/areas/planeamiento_obras/licitations/web/frontend_dev.php/licitation/index/id/284"
      },
      {
        id: "123",
        entorno: "Paseo De La Ribera",
        nombre: "Paseo De La Ribera: Etapa II Rocha Y Cerri",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Desarrollo Urbano Y Transporte",
        descripcion:
          "Continuaci\u00f3n De Paseo De La Ribera Etapa I. Construcci\u00f3n De Un Paseo Lineal Sobre El Riachuelo Entre Las Calles Cerri Y Hernandarias. Provisi\u00f3n De Barandas, Iluminaci\u00f3n, Bicisendas, Arbolado, Mobiliario, Juegos Infantiles Y Estaci\u00f3n Aer\u00f3bica.",
        monto_contrato: "14534310",
        comuna: "4",
        barrio: "La Boca",
        calle_1: "Rocha",
        lat: "-34.6494123063",
        lng: "-58.4045608842",
        fecha_inicio: "04/12/2017",
        fecha_fin_inicial: "15/07/2017",
        plazo_meses: "3",
        porcentaje_avance: "100",
        licitacion_oferta_empresa: "Villarex S.A.",
        licitacion_anio: "2017",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/Paseo-De-La-Ribera",
        pliego_descarga:
          "http://www.buenosaires.gov.ar/areas/planeamiento_obras/licitations/web/frontend_dev.php/licitation/index/id/267"
      },
      {
        id: "695",
        entorno: "Barrio Los Piletones",
        nombre:
          "Barrio Los Piletones: Nexo Conexi\u00f3n De Red De Agua Potable ( Lacarra) Barrio Los Piletones",
        etapa: "Finalizada",
        tipo: "Hidr\u00e1ulica E Infraestructura",
        area_responsable: "Corporaci\u00f3n Buenos Aires Sur",
        descripcion:
          "Nexo Para La Provisi\u00f3n De Agua Potable Barrio Los Piletones Contempla Ejecuci\u00f3n De C\u00e1maras, Empalmes, Etc",
        monto_contrato: "1832840",
        comuna: "8",
        barrio: "Villa Soldati",
        seccion: "66",
        manzana: "071z",
        parcela: "Plz1",
        lat: "-34.603869",
        lng: "-58.431242",
        fecha_inicio: "17/03/2017",
        fecha_fin_inicial: "16/03/2017",
        plazo_meses: "1",
        porcentaje_avance: "100",
        imagen_1:
          "cdn2.buenosaires.gob.ar/baobras/corporacionsur4/Nexoconexionderedaguapotable_foto1.jpg",
        imagen_2:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur4/Nexoconexionderedaguapotable_foto2.jpg",
        imagen_3:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur4/Nexoconexionderedaguapotable_foto3.jpg",
        imagen_4:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur4/Nexoconexionderedaguapotable_foto4.jpg",
        licitacion_oferta_empresa: "Kopar S.A",
        licitacion_anio: "2017",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/barrio-los-piletones"
      },
      {
        id: "696",
        entorno: "Barrio Los Piletones",
        nombre:
          "Barrio Los Piletones: Finalizaci\u00f3n Edificios 10 Y 11 (Piletones)",
        etapa: "Finalizada",
        tipo: "Vivienda",
        area_responsable: "Corporaci\u00f3n Buenos Aires Sur",
        descripcion:
          "Obras De Finalizaci\u00f3n Correspondientes Al Conjunto Habitacional Piletones, Ejecutadas Con El Sistema Constructivo Cassaforma.",
        monto_contrato: "22035450",
        comuna: "8",
        barrio: "Villa Soldati",
        seccion: "66",
        manzana: "197",
        lat: "-34.684704",
        lng: "-58.455339",
        fecha_inicio: "30/01/2017",
        fecha_fin_inicial: "30/06/2017",
        plazo_meses: "5",
        porcentaje_avance: "100",
        imagen_1:
          "cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios10y11-12y13_foto1.jpg",
        imagen_2:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios10y11_foto2.jpg",
        imagen_3:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios10y11_foto3.jpg",
        imagen_4:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios10y11_foto4.jpg",
        licitacion_oferta_empresa: "Wayro Ingenier\u00eda S.A.",
        licitacion_anio: "2017",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/barrio-los-piletones"
      },
      {
        id: "697",
        entorno: "Barrio Los Piletones",
        nombre:
          "Barrio Los Piletones: Finalizaci\u00f3n Edificios 12 Y 13 (Piletones)",
        etapa: "Finalizada",
        tipo: "Vivienda",
        area_responsable: "Corporaci\u00f3n Buenos Aires Sur",
        descripcion:
          "Obras De Finalizaci\u00f3n Correspondientes Al Conjunto Habitacional Piletones, Ejecutadas Con El Sistema Constructivo Cassaforma.",
        monto_contrato: "24498933",
        comuna: "8",
        barrio: "Villa Soldati",
        seccion: "66",
        manzana: "197",
        lat: "-34.580121",
        lng: "-58.430596",
        fecha_inicio: "30/01/2017",
        fecha_fin_inicial: "30/06/2017",
        plazo_meses: "5",
        porcentaje_avance: "100",
        imagen_1:
          "cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios12y13_foto1.jpg",
        imagen_2:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios12y13_foto2.jpg",
        imagen_3:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios12y13_foto3.jpg",
        imagen_4:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Finalizaci%C3%B3nEdificios12y13_foto4.jpg",
        licitacion_oferta_empresa: "Bosquimano S.A",
        licitacion_anio: "2017",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/barrio-los-piletones"
      },
      {
        id: "1060",
        entorno: "Barrio Los Piletones",
        nombre:
          "Barrio Los Piletones: Cercado Y Mejoramiento - Plaza Mz 191 - Ch Piletones",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Corporaci\u00f3n Buenos Aires Sur",
        descripcion:
          "Se Trata De Realizar Una Reja Perimetral A Fin De Mantener En Optimo Estado La Plaza Y Evitar Vandalismos",
        monto_contrato: "950170",
        comuna: "8",
        barrio: "Villa Soldati",
        seccion: "66",
        manzana: "191",
        lat: "-34.6984349949",
        lng: "-58.4706449041",
        fecha_inicio: "29/12/2016",
        fecha_fin_inicial: "28/01/2017",
        porcentaje_avance: "100",
        imagen_1:
          "cdn2.buenosaires.gob.ar/baobras/corporacionsur/Cercadoymejoramiento-PlazaMz191CHP_foto1.jpg",
        imagen_2:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Cercadoymejoramiento-PlazaMz191CHP_foto2.jpg",
        imagen_3:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Cercadoymejoramiento-PlazaMz191CHP_foto3.jpg",
        imagen_4:
          "http://cdn2.buenosaires.gob.ar/baobras/corporacionsur/Cercadoymejoramiento-PlazaMz191CHP_foto4.jpg",
        licitacion_oferta_empresa: "Cooperativa",
        licitacion_anio: "2017",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/barrio-los-piletones"
      },
      {
        id: "1093",
        entorno: "Asev",
        nombre: "Asev: \u00c1rea De Servicios En Parque Patricios",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Parques Urb.-Incorporaci\u00f3n De Un \u00c1rea De Servicios En Espacios Verdes En El Play\u00f3n Lindero A La Biblioteca Infantil Enrique Banchs, La Cual Se Conserva Intacta. El Programa Consta De Un Sector De Confiter\u00eda (50m2) Y Un N\u00facleo De Sanitarios (40m2) Con Accesibilidad Universal Que Cumplimentan Lo Normado Por La Ley 4950. Tambi\u00e9n Se Incorporar\u00e1 Equipamiento Exterior En El Parque Como Bicicleteros, Bancos Y Equipos De Actividad F\u00edsica.",
        monto_contrato: "5224224",
        comuna: "4",
        lat: "-34.6474854056",
        lng: "-58.513715914",
        fecha_inicio: "07/01/2017",
        fecha_fin_inicial: "08/01/2017",
        plazo_meses: "1",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_serviciosparquepatricios.jpeg",
        licitacion_oferta_empresa: "Ingenor S.A",
        licitacion_anio: "2016",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/area-de-servicios-en-espacios-verdes"
      },
      {
        id: "1094",
        entorno: "Entorno Monte Castro",
        nombre:
          "Entorno Monte Castro: Centro Comercial A Cielo Abierto Av. \u00c1lvarez Jonte (E/Joaqu\u00edn V. Gonz\u00e1lez Y Lope De Vega)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -Los Trabajos Que Se Realizar\u00e1n Est\u00e1n Orientados Extender Las Pautas De Dise\u00f1o Existentes En El Tramo Lope De Vega \u2013 Segurola, Al Tramo Que Arranca Desde Esta \u00daltima Hasta La Av. Joaqu\u00edn V. Gonz\u00e1lez. Se Propone El Recambio De Veredas En Todo El Sector A Intervenir, El Soterramiento De Cables, Se Renueva Y Completa La Iluminaci\u00f3n A Nivel Peatonal, Se Incorpora Arbolado Y Equipamiento Urbano.",
        monto_contrato: "52300000",
        comuna: "10",
        lat: "-34.615495280",
        lng: "-58.463753050000",
        fecha_inicio: "1/8/2017",
        fecha_fin_inicial: "04/01/2018",
        plazo_meses: "8",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialalvarezjonte.jpg",
        licitacion_oferta_empresa: "Ilubaires S.A",
        licitacion_anio: "2016",
        link_interno:
          "http://www.buenosaires.gob.ar/baobras/entorno-monte-castro"
      },
      {
        id: "1095",
        entorno: "Plan Tribunales",
        nombre:
          "Plan Tribunales: Rehabilitaci\u00f3n De Av. C\u00f3rdoba (E/ Cerrito Y Callao)",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -La Intervenci\u00f3n Propone La Renovaci\u00f3n De Las Aceras, Incorporaci\u00f3n De Planteras Y Arbolados, Continuando Con Lo Realizado En La Primera Etapa. A Su Vez Se Realizara El Soterramiento De Cables En Toda El \u00c1rea De Intervenci\u00f3n Y Se Incorporara Equipamiento Urbano.",
        monto_contrato: "17970000",
        comuna: "1",
        lat: "-34.635991980",
        lng: "-58.421874590000",
        fecha_inicio: "11/01/2016",
        fecha_fin_inicial: "05/01/2017",
        plazo_meses: "6",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_rehabilitacioncordoba.jpg",
        licitacion_oferta_empresa: "Naku Construcciones S.R.L",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/plan-tribunales"
      },
      {
        id: "1096",
        entorno: "Entorno Once",
        nombre:
          "Entorno Once: Centro Comercial A Cielo Abierto Av. Corrientes ( E/ Callao Y Pueyrred\u00f3n).",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -En El Marco Del Plan Integral Once, Se Propone La Reparaci\u00f3n De Veredas La Renovaci\u00f3n Integral De Aceras, Cazoletas Y Vados Peatonales, El Soterramiento De Cableado A\u00e9reo, La Incorporaci\u00f3n De Iluminaci\u00f3n Peatonal Y El Completamiento Del Arbolado.",
        monto_contrato: "10000000",
        comuna: "1",
        lat: "-34.614292700",
        lng: "-58.524739800000",
        fecha_inicio: "1/9/2017",
        fecha_fin_inicial: "02/01/2018",
        plazo_meses: "6",
        porcentaje_avance: "25",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-once"
      },
      {
        id: "1097",
        entorno: "Eje Corrientes",
        nombre:
          "Eje Corrientes: Centro Comercial A Cielo Abierto Av. Corrientes (E/ Acevedo Y Juli\u00e1n \u00c1lvarez)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Propone La Renovaci\u00f3n Integral De Aceras, Cazoletas Y Vados Peatonales, El Soterramiento De Cableado A\u00e9reo, La Incorporaci\u00f3n De Iluminaci\u00f3n Peatonal Y El Completamiento Del Arbolado De Alineaci\u00f3n. Se Incluye Adem\u00e1s La Renovaci\u00f3n Del Monumento A Osvaldo Pugliese.",
        monto_contrato: "19300000",
        comuna: "15",
        lat: "-34.638668920",
        lng: "-58.374586950000",
        fecha_inicio: "05/01/2017",
        fecha_fin_inicial: "08/01/2017",
        plazo_meses: "4",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/ba-obras/1097.jpeg",
        licitacion_oferta_empresa: "Contrata - Altote S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/eje-corrientes"
      },
      {
        id: "1098",
        entorno: "Eje Corrientes",
        nombre:
          "Eje Corrientes: Centro Comercial A Cielo Abierto Av. Corrientes (E/ Mario Bravo Y Palestina)",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Propone La Renovaci\u00f3n Integral De Aceras, Cazoletas Y Vados Peatonales, El Soterramiento De Cableado A\u00e9reo, La Incorporaci\u00f3n De Iluminaci\u00f3n Peatonal Y El Completamiento Del Arbolado De Alineaci\u00f3n.",
        monto_contrato: "28753492",
        comuna: "5",
        lat: "-34.608292090",
        lng: "-58.406073900000",
        fecha_inicio: "05/01/2017",
        fecha_fin_inicial: "1/9/2017",
        plazo_meses: "5",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialcorrientes_mariobravo.jpg",
        licitacion_oferta_empresa: "Naku Construcciones S.R.L",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/eje-corrientes"
      },
      {
        id: "1104",
        entorno: "Entorno Flores",
        nombre:
          "Entorno Flores: Centro Comercial A Cielo Abierto Av. Gaona (E/ Donato \u00c1lvarez Y Argerich)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, La Intervenci\u00f3n Proyectada Corresponde A La Avenida Gaona, Incluyendo El Per\u00edmetro De La Plaza Comprendida Entre Las Calles Gavil\u00e1n, Caracas, Luis Viale Y Av. Gaona. La Intervenci\u00f3n Propone La Renovaci\u00f3n Del Solado De Veredas, Incluyendo El Soterrado Del Cableado A\u00e9reo, El Completamiento Del Arbolado De Alineaci\u00f3n Retirando Aquellos Ejemplares Que Se Encuentran En Mal Estado Y Plantando Nuevos. Se Incorporar\u00e1n Luminarias Peatonales Y Se Actualizar\u00e1n A Tecnolog\u00eda Led Aquellos Artefactos Que Sean De Mercurio Halogenado Para Reforzar La Iluminaci\u00f3n De La Avenida. Se Incorporar\u00e1 Equipamiento Urbano Para Incentivar El Uso, Goce Y Tr\u00e1nsito Seguro Del Espacio Urbano.",
        monto_contrato: "35956532",
        comuna: "7",
        lat: "-34.640343450",
        lng: "-58.457707140000",
        fecha_inicio: "05/01/2017",
        fecha_fin_inicial: "12/01/2017",
        plazo_meses: "8",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialgaona.jpg",
        licitacion_oferta_empresa: "Dynco S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-flores"
      },
      {
        id: "1105",
        entorno: "Entorno Boedo",
        nombre:
          "Entorno Boedo: Puesta En Valor Del Entorno Esquinas Salcedo, M\u00e1rmol, Las Casas Y Mu\u00f1iz",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -Nivelaci\u00f3n De Calzada Y Vereda En Las Esquinas, Incorporaci\u00f3n De Nuevas P\u00e9rgolas Y \u00c1reas De Recreaci\u00f3n Y Descanso, Refuerzo De La Iluminaci\u00f3n Peatonal, Completamiento Del Arbolado Urbano, Ordenamiento Vehicular.",
        monto_contrato: "17389000",
        comuna: "5",
        lat: "-34.543662190",
        lng: "-58.473530630000",
        fecha_inicio: "07/01/2017",
        fecha_fin_inicial: "08/01/2017",
        plazo_meses: "2",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_equinasboedo.jpg",
        licitacion_oferta_empresa: "Miavasa S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-boedo"
      },
      {
        id: "1106",
        entorno: "Entorno Villa Devoto",
        nombre:
          "Entorno Villa Devoto: Centro Comercial A Cielo Abierto Av. Lope De Vega (E/ Tinogasta Y Gral. Paz)",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Propone La Renovaci\u00f3n De Aceras, El Ordenamiento Del Espacio P\u00fablico, La Correcci\u00f3n Del Ritmo Arbolado Y Alumbrado, La Intensificaci\u00f3n Del Alumbrado Peatonal Y Se Proponen Nuevos Cruces Nivelados.",
        monto_contrato: "32712692",
        comuna: "11",
        lat: "-34.627192480",
        lng: "-58.474467880000",
        fecha_inicio: "1/3/2017",
        fecha_fin_inicial: "08/01/2017",
        plazo_meses: "7",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialvilladevoto.jpg",
        licitacion_oferta_empresa: "Miavasa S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/villa-devoto"
      },
      {
        id: "1107",
        entorno: "Entorno Barracas",
        nombre:
          "Entorno Barracas: Centro Comercial A Cielo Abierto Av. Montes De Oca (E/ Su\u00e1rez U Av. Mart\u00edn Garc\u00eda)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Propone La Incorporaci\u00f3n De Nuevo Arbolado, Incorporaci\u00f3n De Farolas Ornamentales Led En Aceras, Incorporaci\u00f3n De Luminarias Viales Led En El Boulevard De Montes De Oca, Renovaci\u00f3n Total De Aceras, Soterrado De Servicios E Incorporaci\u00f3n De Nuevo Equipamiento Urbano.",
        monto_contrato: "28050000",
        comuna: "4",
        lat: "-34.627069400",
        lng: "-58.381865510000",
        fecha_inicio: "1/11/2017",
        fecha_fin_inicial: "07/01/2018",
        plazo_meses: "9",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialbarracas.jpg",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-barracas"
      },
      {
        id: "1108",
        entorno: "Entorno Once",
        nombre:
          "Entorno Once: Centro Comercial A Cielo Abierto Av. Pueyrred\u00f3n Tramo I",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -Obra Enmarcada En El Plan Integral Once, Propone La Reparaci\u00f3n De Veredas La Renovaci\u00f3n Integral De Aceras, Cazoletas Y Vados Peatonales, El Soterramiento De Cableado A\u00e9reo, La Incorporaci\u00f3n De Iluminaci\u00f3n Peatonal, El Completamiento Del Arbolado Y Mobiliario Urbano.",
        monto_contrato: "8200000",
        comuna: "3",
        lat: "-34.684479490",
        lng: "-58.464559440000",
        fecha_inicio: "ene-17",
        fecha_fin_inicial: "ene-17",
        plazo_meses: "2",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_planonce_tramo1.jpeg",
        licitacion_oferta_empresa: "Miavasa S.A",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-once"
      },
      {
        id: "1109",
        entorno: "Entorno Once",
        nombre:
          "Entorno Once: Centro Comercial A Cielo Abierto Av. Pueyrred\u00f3n Tramo II",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -Obra Enmarcada En El Plan Integral Once, Propone La Reparaci\u00f3n De Veredas, La Renovaci\u00f3n Integral De Aceras, Cazoletas Y Vados Peatonales, El Soterramiento De Cableado A\u00e9reo, La Incorporaci\u00f3n De Iluminaci\u00f3n Peatonal, El Completamiento Del Arbolado Y Mobiliario Urbano.",
        monto_contrato: "15300000",
        comuna: "3",
        lat: "-34.612350940",
        lng: "-58.427412270000",
        fecha_inicio: "ene-17",
        fecha_fin_inicial: "ene-17",
        plazo_meses: "5",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_planonce_tramo2.jpeg",
        licitacion_oferta_empresa: "Miavasa S.A",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-once"
      },
      {
        id: "1110",
        entorno: "Entorno Flores",
        nombre:
          "Entorno Flores: Centro Comercial A Cielo Abierto Av. Rivadavia (E/ Helguera Y Av. Donato \u00c1lvarez)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Propone La Renovaci\u00f3n Y Reparaci\u00f3n De Veredas En Todo El Sector, Se Refuerza Y Corrige La Iluminaci\u00f3n Peatonal, Se Incorpora Arbolado, Se Realiza Un Ordenamiento Del Espacio P\u00fablico Y Soterramiento Del Cableado A\u00e9reo. A Su Vez, Se Propone La Nivelaci\u00f3n De Algunos Cruces Peatonales, Para Acentuar La Continuidad Del Recorrido Peatonal.",
        monto_contrato: "55128386",
        comuna: "7",
        lat: "-34.609886690",
        lng: "-58.422609760000",
        fecha_inicio: "06/01/2017",
        fecha_fin_inicial: "01/01/2018",
        plazo_meses: "8",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_ejecomercialrivadavia.jpg",
        licitacion_oferta_empresa: "Pelque S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-flores"
      },
      {
        id: "1111",
        entorno: "Entorno Once",
        nombre:
          "Entorno Once: Centro Comercial A Cielo Abierto Av. Rivadavia (E/ Callao Y Pueyrred\u00f3n)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "\u00c1reas Ambientales -En El Marco Del Plan Once, Se Propone La Renovaci\u00f3n Y Reparaci\u00f3n De Veredas En Todo El Sector, Se Refuerza Y Corrige La Iluminaci\u00f3n Peatonal, Se Incorpora Arbolado, Se Hace Un Ordenamiento Del Espacio P\u00fablico Y Soterramiento Del Cableado A\u00e9reo. A Su Vez, Se Propone La Nivelaci\u00f3n De Algunos Cruces Peatonales, Para Acentuar La Continuidad Del Recorrido Peatonal.",
        monto_contrato: "27760000",
        comuna: "3",
        lat: "-34.603623350",
        lng: "-58.380223140000",
        fecha_inicio: "02/01/2018",
        fecha_fin_inicial: "11/01/2018",
        plazo_meses: "10",
        porcentaje_avance: "25",
        licitacion_anio: "2017",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-once"
      },
      {
        id: "1112",
        entorno: "Entorno Boedo",
        nombre:
          "Entorno Boedo: Centro Comercial A Cielo Abierto Av. San Juan (E/ Colombres Y Virrey Liniers)",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, Se Realiza La Reparaci\u00f3n Y Reposici\u00f3n Aceras, Ordenamiento General, Correcci\u00f3n Ritmo Arbolado Y Alumbrado, Intensificaci\u00f3n Alumbrado Peatonal.",
        monto_contrato: "4596094",
        comuna: "5",
        lat: "-34.603446990",
        lng: "-58.377343740000",
        fecha_inicio: "1/10/2016",
        fecha_fin_inicial: "12/01/2016",
        plazo_meses: "3",
        porcentaje_avance: "100",
        licitacion_oferta_empresa: "Naku Construcciones S.R.L",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-boedo"
      },
      {
        id: "1113",
        entorno: "Entorno Palermo",
        nombre: "Entorno Palermo: Paseo Av. Sarmiento (Ram\u00edrez)",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -Puesta En Valor De La Av. Sarmiento Y El Paseo Ram\u00edrez. Se Propone La Renovaci\u00f3n De Veredas En Un Amplio Sector Y Se Incorpora Una D\u00e1rsena Vehicular. A Su Vez, La Propuesta Mejora Las Cualidades Ambientales Del \u00c1rea Mediante La Incorporaci\u00f3n De Arbolado Y Equipamiento Urbano.",
        monto_contrato: "17919644",
        comuna: "14",
        lat: "-34.604051100",
        lng: "-58.387249580000",
        fecha_inicio: "1/11/2016",
        fecha_fin_inicial: "1/5/2017",
        plazo_meses: "6",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_paseosarmiento.jpg",
        licitacion_oferta_empresa: "Altote S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-palermo"
      },
      {
        id: "1114",
        entorno: "Entorno Flores",
        nombre:
          "Entorno Flores: Centro Comercial A Cielo Abierto Av. Varela (E/ Eva Per\u00f3n Y Bajo Autopista Au. 25 De Mayo)",
        etapa: "En Ejecuci\u00f3n",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -En El Marco Del Plan De Puesta En Valor De Centros Comerciales A Cielo Abierto, En Av. Varela, En El Tramo Comprendido Entre La Calle Primera Junta Y La Av. Eva Per\u00f3n, Se Propone El Recambio De La Totalidad De Las Veredas, El Soterramiento De Cables, La Renovaci\u00f3n De La Iluminaci\u00f3n A Nivel Peatonal, La Incorporaci\u00f3n De Arbolado, Nuevas Rampas De Accesibilidad E Intervenciones Art\u00edsticas En El Sector Del Bajo Autopista.",
        monto_contrato: "14118038",
        comuna: "7",
        lat: "-34.604051930",
        lng: "-58.387901460000",
        fecha_inicio: "04/01/2017",
        fecha_fin_inicial: "09/01/2017",
        plazo_meses: "6",
        porcentaje_avance: "50",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/ba-obras/1114.jpg",
        licitacion_oferta_empresa: "Avinco Construcciones S.A",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-flores"
      },
      {
        id: "1115",
        entorno: "Entorno Saavedra",
        nombre:
          "Entorno Saavedra: Renovaci\u00f3n De Boulevard San Isidro Labrador",
        etapa: "Finalizada",
        tipo: "Espacio P\u00fablico",
        area_responsable: "Ministerio De Ambiente Y Espacio P\u00fablico",
        descripcion:
          "Av Y Ccca -Se Canalizan Flujos Vehiculares Mediante Intervenci\u00f3n Peatonal. Demarcaci\u00f3n Sendas Peatonales Logrando Cruces Seguros Y Cortos Ejecuci\u00f3n De Nuevos Vados Peatonales . Demarcaci\u00f3n Horizontal En Los Extremos Del Boulevard Evitando El Estacionamiento Indebido. Incorporaci\u00f3n De Mobiliario Urbano En Las Intervenciones Peatonales. Colocaci\u00f3n De Elementos Reflectivos Para Incrementar La Visibilidad En Las Intersecciones.",
        monto_contrato: "9981000",
        comuna: "12",
        lat: "-34.571481760",
        lng: "-58.451963160000",
        fecha_inicio: "09/01/2016",
        fecha_fin_inicial: "03/01/2017",
        plazo_meses: "6",
        porcentaje_avance: "100",
        imagen_1:
          "http://cdn2.buenosaires.gob.ar/desarrollourbano/observatorio-de-obras/mayep_renovacionboulevardsanisidro.jpg",
        licitacion_oferta_empresa: "Salvatori S.A Parques Y Jardines",
        licitacion_anio: "2016",
        link_interno: "http://www.buenosaires.gob.ar/baobras/entorno-saavedra"
      }
    ];

    function renderSankeyChart() {
      sankeychart.w = d3
        .select("#sankey-chart-container")
        .node()
        .getBoundingClientRect().width;

      sankeychart.w =
        !sankeychart.svg || sankeychart.w < 500 ? sankeychart.w : sankeychart.w;

      sankeychart.h = 700;
      sankeychart.margin = sankeychart.w / 100;

      function prepareSankeyData() {
        //set up graph in same style as original example but empty
        var graph = { nodes: [], links: [] };

        var data = [];

        //{source: "1", target: "Espacio Público", value: 7}
        //{source: "Espacio Público", target: "Finalizada", value: 5}

        var temp = d3
          .nest()
          .key(function(d) {
            return d.tech_entrepreneur ? "TECH" : "NO-TECH";
          })
          .rollup(function(hojasTech) {
            return {
              cantidad: hojasTech.length,
              hijos: {
                Avanzada: {
                  cantidad: _.reduce(
                    hojasTech,
                    function(sum, n) {
                      return sum + (n.rcount_advancetech > 0 ? 1 : 0);
                    },
                    0
                  )
                },
                Básica: {
                  cantidad: _.reduce(
                    hojasTech,
                    function(sum, n) {
                      return sum + (n.rcount_basictech > 0 ? 1 : 0);
                    },
                    0
                  )
                },
                Ninguna: {
                  cantidad: _.reduce(
                    hojasTech,
                    function(sum, n) {
                      return sum + (n.adopt_notech ? 1 : 0);
                    },
                    0
                  )
                }
              }
            };
          })
          .map($scope.rawdata);

        console.log(temp);

        _.each(temp, function(c, comuna) {
          _.each(c.hijos, function(t, tipo) {
            data.push({
              source: comuna,
              target: tipo,
              value: t.cantidad
            });
            _.each(t.hijos, function(e, etapa) {
              data.push({
                source: tipo,
                target: etapa,
                value: e.cantidad
              });
            });
          });
        });

        console.log(data);

        var links = {};

        data.forEach(function(d) {
          graph.nodes.push({ name: d.source });
          graph.nodes.push({ name: d.target });

          if (!links[d.source + "|" + d.target]) {
            links[d.source + "|" + d.target] = {
              source: d.source,
              target: d.target,
              value: 0
            };
          }

          links[d.source + "|" + d.target].value += d.value;

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

        // loop through each link replacing the text with its index from node
        graph.links.forEach(function(d, i) {
          graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
          graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

        //now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        graph.nodes.forEach(function(d, i) {
          graph.nodes[i] = { "node:": i, name: d };
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
        .attr("height", sankeychart.h);

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
        return from + " → " + d.target.name + "\nEmpresas: " + d.value;
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
          name += "\nEmprendimientos: " + d.value;
          return name;
        });

      // add in the title for the nodes
      sankeychart.node
        .append("text")
        .attr("y", function(d) {
          return d.dy / 2;
        })
        .attr("x", function(d) {
          return isNaN(d.name) ? -3 : 3 + sankeychart.sankey.nodeWidth();
        })
        .attr("text-anchor", function(d) {
          console.log(d);
          return isNaN(d.name) ? "end" : "start";
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
