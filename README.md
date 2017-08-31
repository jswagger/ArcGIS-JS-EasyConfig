# ArcGIS-JS-EasyConfig
Create quick and easy implementations of the ArcGIS JavaScript 4.X API. Simply plug in REST service URLs to the JSON config and start enjoying a custom 3D web map.

Check out a basic working example here: https://codepen.io/Jswag/pen/jLxjRm
### Instructions:

    "appName": Specify name of the app as a string
    "mapLayers": Load up multiple layer objects in this array
    [
      {
        "name": Name of layer as a string
        "url": Reference to the map service layer, ending ing "/MapServer"
        "listMode": Include "show" for layer(s) in map service to be listed in the layer list
        "visible": Include "true" to be visible
        "opacity": Specify a number, leave at 0 if not transparency is desired
      }
    ],
    "startView": Specify the home/default location
    {
      "latitude": Coordinates in decimal degrees
      "longitude": Coordinates in decimal degrees
      "z": Specify a number to control the zoom level to start with
      "spatialReference": Usually an object with wkid of 3857, but other wkids will work
      { "wkid": 3857 }
    }
  }

### Planned Improvements:

Add featureLayer capabilities

Add pop up functionality

More configurable initial map settings
