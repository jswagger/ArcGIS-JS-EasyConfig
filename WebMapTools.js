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
			// Parse JSON string into object
			configData = JSON.parse(response);
		});

		document.getElementById("appTitle").innerHTML = configData.appName;

		
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
		//view.ui.add(legend, "bottom-right");
		view.ui.add(searchWidget, {
			position: "top-right",
			index: 2
		});
		view.ui.add(layerList, {
			position: "top-left"
		});

		var cam = new Camera({
			heading: 15, 
			tilt: 48, 
			position: configData.startView
		});

		view.camera = cam;
	});
function openLayerList() {
	document.getElementById("layerList").style.width = "300px";
}
function loadJSON(callback) {

	var xobj = new XMLHttpRequest();
	//xobj.overrideMimeType("application/json");
	xobj.open('GET', 'mapConfigData.json', false); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}