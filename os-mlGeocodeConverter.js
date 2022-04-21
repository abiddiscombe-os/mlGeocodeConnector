// os-mlGeocodeConverter.js
// v 0.1.0 (beta)

window.os = window.os || {};

function _checkForKeyEntry() {
    if (!os.mlGeocodeConverter.apiKey) {
        throw('Provide a valid OS Data Hub API Key.')
    }
}

async function _forwardGeocode(config, apiType) {
    try {
        _checkForKeyEntry()
        let geocodedFeatures = []
        let url = `https://api.os.uk/search/${apiType}/v1/find?query=${config.query}&key=${os.mlGeocodeConverter.apiKey}&maxresults=${config.limit}`
        const response = await fetch(url)
        const responseJSON = await response.json()
        for (let i in responseJSON.results) {
            let featureGeometry, featureName
            if ("GAZETTEER_ENTRY" in responseJSON.results[i]) {
                featureGeometry = os.Transform.toLatLng({
                    ea: parseInt(responseJSON.results[i].GAZETTEER_ENTRY.GEOMETRY_X),
                    no: parseInt(responseJSON.results[i].GAZETTEER_ENTRY.GEOMETRY_Y)
                })
                featureName = responseJSON.results[i].GAZETTEER_ENTRY.NAME1  + ', ' + responseJSON.results[i].GAZETTEER_ENTRY.POPULATED_PLACE + ', ' + responseJSON.results[i].GAZETTEER_ENTRY.REGION
            } else {
                featureGeometry = os.Transform.toLatLng({
                    ea: parseInt(responseJSON.results[i].DPA.X_COORDINATE),
                    no: parseInt(responseJSON.results[i].DPA.Y_COORDINATE)
                })
                featureName = responseJSON.results[i].DPA.ADDRESS
            }
            geocodedFeatures.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [ featureGeometry.lng, featureGeometry.lat ]
                },
                place_name: featureName,
                place_type: [ "place" ],
                center: [ featureGeometry.lng, featureGeometry.lat ]
            });
        }
        return { features: geocodedFeatures }
    } catch (error) {
        console.error(`Geocode failed. ${error}`)
    }
}

os.mlGeocodeConverter = {
    apiKey: undefined,
    names: {
        forwardGeocode: function(config) {
            return _forwardGeocode(config, 'names')
        }
    },
    places: {
        forwardGeocode: function(config) {
            return _forwardGeocode(config, 'places')
        }
    },
}