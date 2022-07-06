# mlGeocodeConnector
A tool to convert the JSON responses of the OS Names API and the OS Places API into [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md). This is the response format accepted by MapLibre's [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) plugin.

> **Warning**  
> At this time, mlGeocodeConnector only supports only supports forwardGeocode operations on the OS Places API. This project is a work-in-progress and further functionality will be added in the future.

## Installation
Insert the `mlGeocodeConnector.js` script into your HTML.

```html
<script src="./mlGeocodeConnector.js"></script>
```

## Usage
Like other Ordnance Survey libraries such as [os-transform](https://github.com/OrdnanceSurvey/os-transform), mlGeocodeConnector is nested within the `os.` namespace.

You must specify an API key which permits access to either the OS Names API or the OS Places API:
```javascript
os.mlGeocodeConnector.apiKey = 'your-key-goes-here';
```

### 1. Reverse Geocode on the OS Places API
Initialise a new MapLibreGeocoder control. Pass in `os.mlGeocodeConnector.places` as the first argument.

```javascript
map.addControl(
    new MaplibreGeocoder(os.mlGeocodeConverter.places, {
        maplibregl: maplibregl,
        limit: 6,
        showResultsWhileTyping: true
    }), 'top-right'
);
```

Optionally you may specify a `limit` for the number of results returned or set `showResultsWhileTyping` to update the geocode response with each keystroke.

> **Warning**  
> Enabling `showResultsWhileTyping` may eat up your OS API usage, resulting in higher costs.