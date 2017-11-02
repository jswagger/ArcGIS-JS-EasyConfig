# ArcGIS-JS-EasyConfig
Create quick and easy implementations of the ArcGIS JavaScript 4.X API. Simply plug in REST service URLs to the JSON config and start enjoying a custom 3D web map.

First clone this repository to your localhost, then fill out the JSON config file. Once complete, try hitting "http://localhost/WebMap.html" in Chrome.

Check out a basic working example here: https://codepen.io/Jswag/pen/jLxjRm
### Config Instructions:

    "appName": Specify name of the app as a string
    "mapLayers": Load up multiple layer objects in this array
    [
      {
        "name": Name of layer as a string
        "url": Reference to the map service layer, ending in "/MapServer"
        "listMode": Include "show" for layer(s) in map service to be listed in the layer list
        "visible": Include "true" to be visible
        "opacity": Specify a number, leave at 0 if no transparency is desired
      }
    ],
    "startView": Specify the home/default location
    {
      "latitude": Coordinates in decimal degrees
      "longitude": Coordinates in decimal degrees
      "z": Specify a number to control the zoom level to start with (i.e. "10000")
      "spatialReference": Usually an object with wkid of 3857, but other wkids will work
      { "wkid": 3857 }
    }
  
### Planned Improvements:

Add featureLayer capabilities

Add pop up functionality

More configurable initial map settings
