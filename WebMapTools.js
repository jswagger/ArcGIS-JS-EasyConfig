require([
	"esri/Map",
	"esri/views/SceneView",
	"esri/layers/MapImageLayer",
	"esri/layers/FeatureLayer",
	"esri/widgets/BasemapToggle",
	"esri/widgets/Legend",
	"esri/widgets/Search",
	"esri/widgets/LayerList",
	"esri/widgets/Home",
	"esri/Camera",
	"dojo/domReady!"
],
WebMap.init = function init(Map, SceneView, MapImageLayer, FeatureLayer, BasemapToggle, Legend, Search, LayerList, Home, Camera) {
		var layersForMap = [];
		var configData = {}

		loadJSON(function (response) {
			configData = JSON.parse(response);
		});

		$('#appTitle').text(configData.appName);

		for (i = 0; i < configData.mapLayers.length; i++) {
			var newlayer = new MapImageLayer({ url: configData.mapLayers[i].url });
			layersForMap.push(newlayer);
		};

		var map = createMap(Map, view, layersForMap);

		var view = createScene(SceneView, map);

		var toggleBasemap = createBasemap(BasemapToggle, view);

		var searchWidget = createSearch(Search, view);

		var applayerList = createLayerList(LayerList, view);

		var cam = createCam(Camera, view, configData.startView);

		var legend = createLegend(Legend, view);

		var homeWidget = createHome(Home, view);

		loadToolsToMap(view, toggleBasemap, searchWidget, applayerList, cam, legend, homeWidget);
		$("#layerButton").click(toggleLayerList);
		$("#legendButton").click(toggleLegendList);
	});

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.open('GET', 'mapConfigData.json', false);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
};

WebMap.createMap = function (Map, view, layersForMap) {
	return new Map({
		basemap: "dark-gray",
		ground: "world-elevation",
		layers: layersForMap
	});
};

function createScene(SceneView, map) {
	return new SceneView({
		container: "viewDiv",
		map: map
	});
};

function createBasemap(BasemapToggle, view) {
	return new BasemapToggle({
		view: view,
		nextBasemap: "hybrid"
	});
};

function createSearch(Search, view) {
	return new Search({
		view: view
	});
};

function createLayerList(LayerList, view) {
	return new LayerList({
		view: view
	});
};

function createCam(Camera, view, startView) {
	return new Camera({
		heading: 15,
		tilt: 48,
		position: startView
	});
};

function createLegend(Legend, view) {
	return new Legend({
		view: view
	});
};

function createHome(Home, view) {
	return new Home({
		view: view
	});
};

function loadToolsToMap(view, applayerList, toggleBasemap, searchWidget, cam, legend, homeWidget) {
	view.ui.add(applayerList, "top-left");
	view.ui.add(toggleBasemap, "bottom-left");
	view.camera = cam;
	view.ui.add(legend, "bottom-right");
	view.ui.add(homeWidget, "top-right");
	view.ui.add(searchWidget, "top-right");
};

function toggleLayerList() {
	$(".esri-layer-list").toggleClass('visibility');
};

function toggleLegendList() {
	$(".esri-legend").toggleClass('visibility');
};