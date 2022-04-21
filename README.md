# os-mlGeocodeConverter
## Background
A set of helper functions which convert the bespoke JSON from the **OS Names API** or the **OS Places API** into [Carmen-GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md), the accepted response format for MapLibre's [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) plugin.

### Supported Geocode Operations
- forwardGeocode

### Feature List
- Sits within the os.mlGeocodeConverter object, alongside os.Transform and os.Branding
- Compatable with both the OS Names and OS Places APIs
- Defines the total features returned using maplibre-gl-geocoder's `options.limit` value

## Installation
The os-mlGeocodeConverter requires [proj4js](https://github.com/proj4js/proj4js) and [os-transform](https://github.com/OrdnanceSurvey/os-transform) to support coordinate conversion from ESPG27700 into ESPG3857.

Download both os-transform and os-mlGeocodeConverter and import all the libraries (alongside MapLibre, OS Branding and MapLibre-GL-Geocoder)

```
<!-- Proj4js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.7.0/proj4.js"></script>

<!-- os-transform (local copy) -->
<script src="./os-transform.js"></script>

<!-- os-mlGeocodeConverter (local copy) -->
<script src="./os-MLGeocodeConverter.js"></script>
```

## Usage
Please read the [os-transform](https://github.com/OrdnanceSurvey/os-transform) documentation fully, you need to define the ESPG27700-to-ESPG3857 transformation prior to using os-mlGeocodeConverter. This is explained in the docs, and shown in the example (`example.html`).

Use the `os.mapLibreGeocodeConverter.apiKey` to define the OS Data Hub API Key (which is connected to the OS Names or Places API)

Create a new MapLibreGeocoder instance, and pass in either:
- `os.mlGeocodeConverter.places` for the OS Places API
- `os.mlGeocodeConverter.names` for the OS Names API

```
os.mapLibreGeocodeConverter.apiKey = <your-api-key-here>;

map.addControl(
    new MaplibreGeocoder(os.mlGeocodeConverter.places, {
        maplibregl: maplibregl,
        limit: 6,
        showResultsWhileTyping: true
    }), 'top-right'
);
```
Optionally, you may also wish to specify a `limit` or `showResultsWhileTyping` as demonstrated.

## Changelog
### Version 0.1.0 (April 2022)
- Initial release
