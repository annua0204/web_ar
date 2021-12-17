window.onload = () => {
    const promise = new Promise((resolve, reject) => {
        let lat = 0;
        let lng = 0;

        if (navigator.geolocation) {
            //有拿到位置就呼叫 showPosition 函式
            navigator.geolocation.getCurrentPosition((position) => {
                // success: 緯度 (Latitude), 經度 (Longitude)
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                console.log('success: lat:[' + lat + '], lng:[' + lng + ']')
                resolve([{
                    name: 'Magnemite',
                    location: {
                        lat,
                        lng
                    }
                }])
            }, () => {
                staticLoadPlaces(resolve)
            });
        } else {
            staticLoadPlaces(resolve)
        }
    })

    promise.then((places) => {
        renderPlaces(places);
    })
};



function staticLoadPlaces(resolve) {
    let arr = [];
    let getObj = ((lat, lng) => {
        return {
            name: 'Magnemite',
            location: {
                lat,
                lng
            }
        }
    });
    // 公司
    arr.push(getObj(25.080340, 121.569930))
    // 新莊家
    arr.push(getObj(25.027830, 121.415760))
    resolve(arr);
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