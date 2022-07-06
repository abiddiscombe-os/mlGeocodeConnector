// os-mlGeocodeConnector.js

window.os = window.os || {};

function _checkForKeyEntry() {
    if (!os.mlGeocodeConnector.apiKey) {
        // future upgrades will perform a better type of check
        throw('Provide a valid OS Data Hub API Key.')
    }
}

async function _callEndpoint(url) {
    try {
        const response = await fetch(url)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        throw(`Failed to reach the API Endpoint. ${error}`)
    }
}

async function _forwardGeocode(config, apiType) {
    try {
        // check key has been provided
        _checkForKeyEntry()
        let geocodedFeatures = []
        if (apiType == 'places') {
            // natively supports EPSG:3857
            let responseJSON = await _callEndpoint(`https://api.os.uk/search/places/v1/find?query=${config.query}&key=${os.mlGeocodeConnector.apiKey}&maxresults=${config.limit}&output_srs=EPSG%3a4326`)
            for (let i in responseJSON.results) {
                geocodedFeatures.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [ responseJSON.results[i].DPA.LNG, responseJSON.results[i].DPA.LAT ]
                    },
                    place_name: responseJSON.results[i].DPA.ADDRESS,
                    place_type: [ "place" ],
                    center: [ responseJSON.results[i].DPA.LNG, responseJSON.results[i].DPA.LAT ]
                });
            }
        } else if (apiType == 'names') {
            throw(`The Names API is not yet supported.`)
        } else {
            throw(`Please select which API to use.`)
        }
        return { features: geocodedFeatures }
    } catch (error) {
        console.error(`Geocode failed. ${error}`)
    }
}

async function _reverseGeocode(config, apiType) {
    throw(`Reverse geocoding is not yet supported.`)
}

os.mlGeocodeConnector = {
    apiKey: '',
    names: {
        forwardGeocode: function(config) { return _forwardGeocode(config, 'names') },
        reverseGeocode: function(config) { return _reverseGeocode(config, 'names') },
    },
    places: {
        forwardGeocode: function(config) { return _forwardGeocode(config, 'places') },
        reverseGeocode: function(config) { return _reverseGeocode(config, 'places') },
    }
}