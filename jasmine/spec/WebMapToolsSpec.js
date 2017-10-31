
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

describe("WebMap", function () {
	let fakeRequest = new XMLHttpRequest(); 
	let fakeCallback = {};
	let fakeLayers = {};
	let fakeMap = new Map({
		basemap: "dark-gray",
		ground: "world-elevation",
		layers: fakeLayers
	});
	let fakeView = new SceneView({
		container: "viewDiv",
		map: fakeMap
	});
	let fakeLayerList = new LayerList({
		view: fakeView
	});
	let fakeBasemap = new BasemapToggle({
		view: fakeView,
		nextBasemap: "hybrid"
	});
	let fakeSearchWidget = Search({
		view: fakeView
	});
	let fakeHomeWidget = new Home({
		view: fakeView
	});
	let fakeCamera = new Camera({
		heading: 15,
		tilt: 48,
		position: getStartView()
	});
	let fakeLegend = new Legend({
		view: fakeView
	});
	beforeEach(function () {
		
	});

	describ("when loading the JSON file", function() {
		beforeEach(function (){
			loadJSON(fakeCallback);
		});
		it("should call for open on the request", function () {
			except(fakeRequest.open).toHaveBeenCalled();
		});
		it("should call for send on the request", function () {
			except(fakeRequest.send).toHaveBeenCalled();
		});
	})
	describe("when initializing the web map app", function () {
		beforeEach(function (){
			loadToolsToMap(fakeView, fakeLayerList, fakeBasemap, fakeSearchWidget, fakeCam, fakeLegend, fakeHomeWidget);
		});
		it("should add layer list to the view", function () {
			expect(fakeView.ui.add).toHaveBeenCalledWith(fakeLayerList);
		});
		it("should add a basemap to the view", function () {
			expect(fakeView.ui.add).toHaveBeenCalledWith(fakeBasemap);
		});
		it("should add a legend to the view", function () {
			expect(fakeView.ui.add).toHaveBeenCalledWith(fakeLegend);
		});
		it("should add a home button widget to the view", function () {
			expect(fakeView.ui.add).toHaveBeenCalledWith(fakeHomeWidget);
		});
		it("should add a search widget to the view", function () {
			expect(fakeView.ui.add).toHaveBeenCalledWith(fakeSearchWidget);
		});
		it("should set a camera to the view", function () {
			expect(fakeView.camera).toBe(fakeCamera);
		});
	});

	describe("when calling createScene", function () {
		let fakeSceneView = createScene(SceneView, fakeMap);
		it("should return a scene with a map", function () {
			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});

	describe("when calling createBasemap", function () {
		it("should return a Basemap to the view", function () {
			let fakeBase = createBasemap(BasemapToggle, fakeView);
			expect(fakeBase.view).toBe(fakeView);
		});
	});

	describe("when calling createSearch", function () {
		it("should return a search object", function () {

			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});

	describe("when calling createLayerList", function () {
		it("should return a layer list object", function () {

			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});

	describe("when calling createCam", function () {
		it("should return a camera object", function () {

			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});

	describe("when calling createLegend", function () {
		it("should return a legend object", function () {

			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});

	describe("when calling createHome", function () {
		it("should return a home object", function () {

			expect(fakeSceneView.map).toBe(fakeMap);
		});
	});
}));

function getStartView(){
	return {
		"latitude": 19.5,
		"longitude": -95.3,
		"z": 1000000,
		"spatialReference": { "wkid": 3857 }
	  }
};