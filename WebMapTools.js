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
    function (Map, SceneView, MapImageLayer, FeatureLayer, BasemapToggle, Legend, Search, LayerList) {

        var weatherLayer = new MapImageLayer({
            url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer"
        });

        var elevationLayer = new MapImageLayer({
            url: "https://services.nationalmap.gov/arcgis/rest/services/Contours/MapServer"
        });

        var publicPlaces = new MapImageLayer({
            url: "https://services.nationalmap.gov/arcgis/rest/services/structures/MapServer"
        });

        var featureLayer1 = new FeatureLayer({
            url: "https://services.nationalmap.gov/arcgis/rest/services/structures/MapServer/0"
        });

        var map = new Map({
            basemap: "dark-gray",
            layers: [weatherLayer, elevationLayer, publicPlaces]
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
        map.add(featureLayer1);
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
