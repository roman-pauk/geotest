/*
navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
    var lastCheckedPosition,
        locationEventCount = 0,
        watchID,
        timerID;

    options = options || {};

    var checkLocation = function (position) {
        lastCheckedPosition = position;
        locationEventCount = locationEventCount + 1;
        // We ignore the first event unless it's the only one received because some devices seem to send a cached
        // location even when maxaimumAge is set to zero
        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        } else {
            geoprogress(position);
        }
    };

    var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    };

    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
    };

    var foundPosition = function (position) {
        geolocationSuccess(position);
    };

    if (!options.maxWait) options.maxWait = 10000; // Default 10 seconds
    if (!options.desiredAccuracy) options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout) options.timeout = options.maxWait; // Default to maxWait

    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

    watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
};
*/



if ('geolocation' in navigator) {
    //navigator.geolocation.getAccurateCurrentPosition(posSuccess, posError, posCoords, { maxWait: 7000, desiredAccuracy: 10 });
    //navigator.geolocation.watchPosition(posCoords, posError, { enableHighAccuracy: true, maximumAge: 1000 });
} else {
    $('error').text('Not suport')
}

function posSuccess(pos) {
    $('#success').text(pos.coords.accuracy);
    console.log(pos);
}
function posError(pos) {
    $('error').text('Error');
}
function posCoords(pos) {
    var lt = pos.coords.latitude,
        lg = pos.coords.longitude;

    $('#progres').text(pos.coords.accuracy);
    $('#lt').text(lt);
    $('#lg').text(lg);

    $('#altitude').text(pos.coords.altitude ? pos.coords.altitude : 'not support');
    console.log(pos);

    //map.map.setCenter(new google.maps.LatLng(45, 19));
    setPosOnce(lt, lg);

    var latlng = new google.maps.LatLng(lt, lg);
    m.setPosition(latlng);
    
}
var counter = 0;
function setPosOnce(lt, lg) {
    if (counter == 0) {
        myMap.setCenter(new google.maps.LatLng(lt, lg));
        marker.setPosition(new google.maps.LatLng(lt, lg));
        counter++;
    } 
}