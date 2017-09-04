require([
	"esri/Map",
	"esri/views/SceneView",
	"esri/layers/MapImageLayer",
	"esri/layers/FeatureLayer",
	"esri/widgets/BasemapToggle",
	"esri/widgets/Legend",
	"esri/widgets/Search",
	"esri/widgets/LayerList",
	"esri/Camera",
	"dojo/domReady!"
],
	function init(Map, SceneView, MapImageLayer, FeatureLayer, BasemapToggle, Legend, Search, LayerList, Camera) {
		var layersForMap = [];
		var configData = {}

		loadJSON(function (response) {
			configData = JSON.parse(response);
		});

		$('#appTitle').text(configData.appName);
		for (i = 0; i < configData.mapLayers.length; i++) {
			var newlayer = new MapImageLayer({ url:configData.mapLayers[i].url });
			layersForMap.push(newlayer);
		};

		var featureLayer1 = new FeatureLayer({
			url: "https://services.nationalmap.gov/arcgis/rest/services/structures/MapServer/0"
		});

		var map = new Map({
			basemap: "dark-gray",
			ground: "world-elevation",
			layers: layersForMap
		});

		var view = new SceneView({
			container: "viewDiv",
			map: map
		});

		var toggle = new BasemapToggle({
			view: view,
			nextBasemap: "hybrid"
		});
		
		var searchWidget = new Search({
			view: view
		});
		var applayerList = new LayerList({
			view: view
		});
		view.ui.add(applayerList, {
			position: "top-left"
		});
		
		function toggleLayerList() {
			$(".esri-layer-list").toggleClass('visibility');
		};
		function toggleLegendList() {
			$(".esri-legend").toggleClass('visibility');
		};
		view.ui.add(toggle, "bottom-left");
		view.ui.add(searchWidget, {
			position: "top-right",
			index: 2
		});

		var cam = new Camera({
			heading: 15, 
			tilt: 48, 
			position: configData.startView
		});

		view.camera = cam;
		var legend = new Legend({
			view: view
		});

		view.ui.add(legend, "bottom-right");
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
}
