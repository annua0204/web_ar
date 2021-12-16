window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function getLocation() { //取得 經緯度

}

function staticLoadPlaces() {
    let lat = 0;
    let lng = 0;

    if (navigator.geolocation) {
        //有拿到位置就呼叫 showPosition 函式
        navigator.geolocation.getCurrentPosition(showPosition);
        // 緯度 (Latitude)
        // 經度 (Longitude)
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console('position lat:[' + lat + '], lng:[' + lng + ']')
    } else {
        lat = 25.080340;
        lng = 121.569930;
        console('static lat:[' + lat + '], lng:[' + lng + ']')
    }

    return [{
        name: 'Magnemite',
        location: {
            lat,
            lng
        }
    }, ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', '../assets/magnemite/scene.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}