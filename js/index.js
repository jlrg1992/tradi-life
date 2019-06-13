// Global variables
let place = locaciones[0];
let mymap;
let marker;

//Framework 7 stuff
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Misa Tradi',
    // App id
    id: 'org.catolicosenred.tradi',
    // Add default routes
    routes: [
      {
        path: '/inicio/',
        url: 'index.html',
      },
      {
        path: '/mapa/',
        url: 'map.html',
      }
    ],
  });
  
  var mainView = app.views.create('.view-main');
  var $$ = Dom7;
// Map script
function runMap(){
    mymap = L.map('mymap').setView(place.coordinates, 15);
    let attribution = '&copy <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>';
    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);
    marker = L.marker(place.coordinates).addTo(mymap);
    marker.setLatLng(place.coordinates);
    marker.bindPopup("<b>Horario:</b><br> "+place.horario);
    L.circle(place.coordinates, 15).addTo(mymap);
}


$$(document).on('page:init', '.page[data-name="mapa"]', function (e) {
    searchPage(); 
})

$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
    runMap();
})

function getListaMisas(){
    let laUl = document.getElementById("lugares");
    for(l in locaciones){
        let str = `<li class="accordion-item"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                        <div class="item-title">${locaciones[l].nombre}</div>
                        </div></a>
                    <div class="accordion-item-content">
                        <div class="block">
                            <p>${locaciones[l].horario} <a onclick="setCoordinates(this)" class="loc-hold" data-mapa-loc="${l}" href="/inicio/">Ver mapa</a></p>
                        </div>
                    </div>
                    </li>`
        laUl.innerHTML += str;
    }
    
}





function searchPage(){
    let searchbar = app.searchbar.create({
        el: '.searchbar',
        searchContainer: '.list',
        searchIn: '.item-title',
        on: {
          search(sb, query, previousQuery) {
          }
        }
      });
    getListaMisas();
}

function setCoordinates(e){
    place = locaciones[Number(e.getAttribute("data-mapa-loc"))];
}

runMap();


mymap.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;
    L.circle(e.latlng, radius).addTo(map);
}

mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);
