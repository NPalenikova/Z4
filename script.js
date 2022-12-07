let pics = [
    {
        "filename":"1.jpg",
        "name": "Repkové pole",
        "description": "Pole plné repky olejnej niekde za Ružindolom",
        "date":"6.5.2020",
        "coordinates":[48.370037, 17.469789],
        "path":"/photos/1.jpg"
    },
    {
        "filename":"2.jpg",
        "name": "Výhľad na hory",
        "description": "Výhľad na východ slnka nad horami",
        "date":"2.3.2022",
        "coordinates":[46.80044876051801, 13.611891792061295],
        "path":"/photos/2.jpg"
    },
    {
        "filename":"3.jpg",
        "name": "Impozantný kaktus",
        "description": "Kaktus na stene v kaktusovej záhrade",
        "date":"27.6.2022",
        "coordinates":[29.08107787842252, -13.473440256638664],
        "path":"/photos/3.jpg"
    },
    {
        "filename":"4.jpg",
        "name": "Kaňon",
        "description": "Kaňon Las Grietas",
        "date":"28.6.2022",
        "coordinates":[28.974528679739464, -13.635363630687099],
        "path":"/photos/4.jpg"
    },
    {
        "filename":"5.jpg",
        "name": "Výhľad na more",
        "description": "Voda je modrá",
        "date":"30.6.2022",
        "coordinates":[28.86259907707701, -13.86020863068296],
        "path":"/photos/5.jpg"
    },
    {
        "filename":"6.jpg",
        "name": "Obloha",
        "description": "Diera v strope",
        "date":"5.8.2022",
        "coordinates":[43.50873290911745, 16.4400111],
        "path":"/photos/6.jpg"
    },
    {
        "filename":"7.jpg",
        "name": "Západ slnka",
        "description": "Západ slnka nad morom",
        "date":"6.8.2022",
        "coordinates":[43.550957, 16.351390],
        "path":"/photos/7.jpg"
    },
    {
        "filename":"8,jpg",
        "name": "Hmla",
        "description": "Ranná hmla v horách",
        "date":"30.8.2022",
        "coordinates":[48.59594445550843, 19.565012994265064],
        "path":"/photos/8.jpg"
    },
    {
        "filename":"9.jpg",
        "name": "Táborisko",
        "description": "Takto vyzerá skautský tábor",
        "date":"27.8.2022",
        "coordinates":[48.59594445550843, 19.565012994265064],
        "path":"/photos/9.jpg"
    },
    {
        "filename":"10.jpg",
        "name": "Výstava",
        "description": "Výstava kaktusov a prírodného kameňa",
        "date":"16.9.2022",
        "coordinates":[48.78081211355137, 18.5752974830569],
        "path":"/photos/10.jpg"
    }
];

var filteredPics = []
var lightGal

const createGalleryData = (images) => {
    for(let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i].path;
        const div = document.createElement("div");
        div.classList.add("item");
        div.setAttribute("data-src", images[i].path);
        div.setAttribute("data-sub-html",
            `<div class="lightGallery-captions">
                <h4>${images[i].name}</h4>
                <p>${images[i].description}</p>
                <p>Taken on ${images[i].date} at ${images[i].coordinates}</p>
            </div>`);
        div.appendChild(img);
        document.querySelector(".gallery").appendChild(div);
    }
}

const createGallery = (images) => {
    createGalleryData(images)
    lightGal = lightGallery(document.querySelector(".gallery"), {
        selector: '.item',
        mobileSettings: { controls: true, showCloseIcon: true, download: false},
        slideShowInterval: 1000,
        download: false,
        plugins: [lgAutoplay, lgThumbnail],
    });
}
if(document.querySelector("body").classList.value === 'indexBody') {
    createGallery(pics)
    var searchBar = document.getElementById("search")
    searchBar.addEventListener("input", event => {
        filterPictures()
    })
}

const filterPictures = () => {
    filteredPics = []
    document.getElementById("indexGallery").innerHTML = ''
    pics
        .filter(image => image.name.indexOf(event.target.value) !== -1 || image.description.indexOf(event.target.value) !== -1)
        .forEach(image => {
            filteredPics.push(image)
        })
    createGallery(filteredPics)
}

//////////////////////////////////////////////////////////
// Map
//////////////////////////////////////////////////////////
function initMap() {
    var centerOfMap = new google.maps.LatLng(48.330220663664264, 12.657655859336842);
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: centerOfMap,
        zoom: 5,
    });
    var directionsService = new google.maps.DirectionsService
    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    })

    var pointA = new google.maps.LatLng(48.370037, 17.469789),
        pointB = new google.maps.LatLng(46.80044876051801, 13.611891792061295),
        pointC = new google.maps.LatLng(29.08107787842252, -13.473440256638664)
    if(routeToggled) {
        displayRoute(directionsService, directionsDisplay, pointA, pointB, pointC);
    }
    pics.forEach(image => {
        var location = new google.maps.LatLng(image.coordinates[0], image.coordinates[1]);
        const newMarker = new google.maps.Marker({
            position: location,
            map,
        });
        newMarker.addListener("click", () => {
            openMarker(image)
        })
    })

    directionsDisplay.addListener("directions_changed", () => {
        const directions = directionsDisplay.getDirections();

        if (directions) {
            computeTotalDistance(directions);
        }
    });
}

const openMarker = (image) => {
    filterPicturesByLocation(image.coordinates)
}

const filterPicturesByLocation = (location) => {
    filteredPics = []
    document.querySelector(".gallery").innerHTML = ''
    pics
        .filter(image => image.coordinates[0].toString().indexOf(location[0].toString()) !== -1 && image.coordinates[1].toString().indexOf(location[1].toString()) !== -1)
        .forEach(image => {
            filteredPics.push(image)
        })
    createGallery(filteredPics)
    lightGal.openGallery(0)
}

var routeToggled = false
if(document.querySelector("body").classList.value === 'mapBody') {
    document.getElementById('toggleRoute').addEventListener('change', () => {
        routeToggled = !routeToggled
        document.getElementById('totalDistance').innerHTML = ''
        initMap()
    })
}


const fillWaypoints = () => {
    var waypoints = []
    pics.forEach(pic => {
        waypoints.push({location: new google.maps.LatLng(pic.coordinates[0], pic.coordinates[1]), stopover: false})
    })
    return waypoints
}

function displayRoute(directionsService, directionsDisplay) {
    var waypointsList = fillWaypoints()
    directionsService.route({
        origin: waypointsList[0].location,
        destination: waypointsList[waypointsList.length-1].location,
        waypoints: waypointsList,
        travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById('totalDistance').innerHTML = "The total distance is: <b>" + total + "km. </b>"
}


























