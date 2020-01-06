//my personal api key
var apiKey = "xAXRmHcNK3xhm3mlwRexklWqGc6eRddz53KZMW7lfi8";

//Initialize the Platform object:
var platform = new H.service.Platform({
    'apikey': ''+apiKey+''
});

// Get the default map types from the Platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 13,
        center: { lng: 13.4, lat: 52.51 }
    });

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'de-DE');

var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');

mapSettings.setAlignment('top-left');
zoom.setAlignment('top-left');
scalebar.setAlignment('top-left');

// Create an info bubble object at a specific geographic location:
/*var bubble = new H.ui.InfoBubble({ lng: 13.4, lat: 52.51 }, {
    content: '<b>Hello World!</b>'
});*/

// Add info bubble to the UI:
//ui.addBubble(bubble);

// Create the parameters for the reverse geocoding request:
/*var reverseGeocodingParameters = {
    prox: '52.5309,13.3847,150',
    mode: 'retrieveAddresses',
    maxresults: 1
};*/

// Define a callback function to process the response:
function onSuccess(result) {
    var location = result.Response.View[0].Result[0];

    // Create an InfoBubble at the returned location with
    // the address as its contents:
    ui.addBubble(new H.ui.InfoBubble({
        lat: location.Location.DisplayPosition.Latitude,
        lng: location.Location.DisplayPosition.Longitude
        }, { content: location.Location.Address.Label }
    ));
};

// Get an instance of the geocoding service:
//var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
/*geocoder.reverseGeocode(
  reverseGeocodingParameters,
  onSuccess,
  function(e) { 
      alert(e); 
  }
);*/