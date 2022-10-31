import 'leaflet/dist/leaflet.css';
import L from "leaflet";

let map: any;

function showMap(lat: number, lon: number) {
    if(map !== undefined || null) {
        map.remove();
    }

    map = L.map('map').setView([lat, lon], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat,lon]).addTo(map);
}

export default showMap;
