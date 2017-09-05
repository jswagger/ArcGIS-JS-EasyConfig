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
	 
	        var cam = new Camera({
			heading: 15, 
			tilt: 48, 
			position: configData.startView
		});
	 
	        var legend = new Legend({
			view: view
		});
	 
		view.ui.add(applayerList, {
			position: "top-left"
		});
		view.ui.add(toggle, "bottom-left");
		view.ui.add(searchWidget, {
			position: "top-right",
			index: 2
		});
		view.camera = cam;
		view.ui.add(legend, "bottom-right");
	 
	        function toggleLayerList() {
			$(".esri-layer-list").toggleClass('visibility');
		};
		function toggleLegendList() {
			$(".esri-legend").toggleClass('visibility');
		};
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
