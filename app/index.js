/**
 * Created by xujie on 2016/6/16 0016.
 */
import mapboxgl from 'mapbox-gl';
import Draw from 'mapbox-gl-draw';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../node_modules/mapbox-gl-draw/dist/mapbox-gl-draw.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2xhbmsiLCJhIjoiY2lpcjc1YzQxMDA5NHZra3NpaDAyODB4eSJ9.z6uZHccXvtyVqA5zmalfGg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
});

const drawControl = Draw({position:"top-left"});

map.on('load', ()=> {
    map.addControl(drawControl);
});


