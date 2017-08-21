require([
	"esri/Map",
	"esri/views/SceneView",
	"esri/layers/MapImageLayer",
	"esri/layers/FeatureLayer",
	"esri/widgets/BasemapToggle",
	"esri/widgets/Legend",
	"esri/widgets/Search",
	"esri/widgets/LayerList",
	"dojo/domReady!"
],
	function init(Map, SceneView, MapImageLayer, FeatureLayer, BasemapToggle, Legend, Search, LayerList) {

		var configData = {}

		loadJSON(function (response) {
			// Parse JSON string into object
			var configData = JSON.parse(response);
		});



		//var data = "\mapConfigData.json";
		//var convertData = JSON.stringify(data);
		//var configData = JSON.parse(convertData);

		var layersForMap = [];
		for (i = 0; i < configData.length; i++) {
			layersForMap += configData.mapLayers[i];
		};

		var featureLayer1 = new FeatureLayer({
			url: "https://services.nationalmap.gov/arcgis/rest/services/structures/MapServer/0"
		});

		var map = new Map({
			basemap: "dark-gray",
			layers: featureLayer1
		});

		var view = new SceneView({
			container: "viewDiv",
			map: map
		});

		var toggle = new BasemapToggle({
			view: view,
			nextBasemap: "hybrid"
		});

		var legend = new Legend({
			view: view,
			layerInfos: [{
				layer: featureLayer1,
				title: "Public Places"
			}]
		});

		var searchWidget = new Search({
			view: view
		});

		var layerList = new LayerList({
			view: view
		});
		//map.add(featureLayer1);
		view.ui.add(toggle, "bottom-left");
		view.ui.add(legend, "bottom-right");
		view.ui.add(searchWidget, {
			position: "top-right",
			index: 2
		});
		view.ui.add(layerList, {
			position: "top-left"
		});
	});
function openLayerList() {
	document.getElementById("layerList").style.width = "300px";
}
function loadJSON(callback) {

	var xobj = new XMLHttpRequest();
	//xobj.overrideMimeType("application/json");
	xobj.open('GET', 'mapConfigData.json', true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}