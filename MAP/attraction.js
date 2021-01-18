//全域
let url = "https://bsopendata.azurewebsites.net/api/LeisureTravel/Attractions";
let data = [];
let markers = [];
let AreaArr = [];
let InfoArr = [];
let SpotArr = [];
let contentArr = [];
let Add = document.getElementById("Add")
let checkBtn = document.getElementById("checkBtn")
let span = document.querySelector("span")
let marker;
let card;
let Loading = document.getElementById("Loading")



window.onload = function () {
    let promise1 = fetchJOSON(url);
    promise1
        .then(()=>{
            Loading.style.display='none';
             Add.disabled=false;
        });

    checkBtn.addEventListener("click", function () {
        deleteMarkers()
        getMarker(data);
        getCard()
    })
}


async function fetchJOSON(url) {
    await fetch(url)
        .then(response => response.json())
        .then(result => {
            data = result.XML_Head.Infos.Info
        })
        .catch(ex => {
            console.log("失敗" + ex)
        })
        .finally(() => {
        })
}



//地圖

let map;

function initMap() {
    const myLatLng = {

        lat: 25.041651893061086,
        lng: 121.53629958550256,
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: myLatLng,
    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Build School",
    });

    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,

                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    map.setZoom(15)

                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}


function getMarker(area) {

    AreaArr = area.filter(x => x.Region == Add.value)
    // console.log(AreaArr)
    for (let i = 0; i < AreaArr.length; i++) {
        let coords = AreaArr[i];
        // let lating = new google.maps.LatLng( coords.Px,coords.Py);
        const myLatLng = {
            lat: coords.Py,
            lng: coords.Px,
        };

        map.setCenter({
            lat: coords.Py,
            lng: coords.Px
        });
        marker = new google.maps.Marker({
            position: myLatLng,
            map,
            draggable: false,
            title: `${coords.Name}`
        });
        markers.push(marker)
        attachSecretMessage(marker, coords);
        map.setZoom(10)

    }

}

function deleteMarkers() {
    markers.forEach(function (e) {
        e.setMap(null);
    });
    markers = [];

}

function attachSecretMessage(marker, secretMessage) {
    const infowindow = new google.maps.InfoWindow({
        content: `${secretMessage.Name}<br><hr>
        電話: ${secretMessage.Tel}<br><br>
        地址: ${secretMessage.Add}<br><br>
        描述: ${secretMessage.Description}`,
    });
    marker.addListener("click", () => {
        if (currentInfoWindow != '') {

            currentInfoWindow.close();
            currentInfoWindow = '';


        }
        var infoWindow = new google.maps.InfoWindow({
            content: 'COntent'
        });
        infowindow.open(marker.get("map"), marker);
        currentInfoWindow = infowindow;
        setTimeout(() => {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }, 10);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 3000);

    });
    infowindow.addListener("closeclick", () => {
        marker.setAnimation(null);
    });

}
var currentInfoWindow = ''

function getCard() {
    let info = document.querySelector(".info");
    info.innerHTML = "";
    data.filter(x => x.Add.includes(Add.value)).forEach(x => {
        let div = document.createElement("div");
        div.className = "info-item";
        div.setAttribute("onclick", "Open(this)");
        div.setAttribute("id", `${x.Name}`)

        div.innerHTML = `<div class="info-title">
        ${x.Name}<span data-px="${x.Px}" data-py="${x.Py}" onclick="Choose(this)"><i class="fas fa-search-plus"></i></span></div><div class="info-content"> <hr>地址: ${x.Add}<br><br> 開放時間: ${x.Opentime}<br><br>  <img src=" ${x.Picture1}"> <button onclick="Close()">關閉</button>
        </div>`
        info.appendChild(div);
    })
}



function Open(target) {
    let infoItem = target.querySelector(".info-content")
    infoItem.style.display = "block";
}

function Close() {
    getCard();
    map.setZoom(10);
}

function Choose(xy) {
    map.setCenter({
        lat: parseFloat(xy.dataset.py),
        lng: parseFloat(xy.dataset.px),

    });
    map.setZoom(20)


}