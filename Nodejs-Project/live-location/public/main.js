const markers = {};
mapboxgl.accessToken ="pk.eyJ1IjoiYmFkcnVkZWVuMjAiLCJhIjoiY2t0bGt6b2huMXgzbzJ2cW51YjVpbTU5dyJ9.CIhNiYM7itOcqIDp5cgYjA";
const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [78.9629, 20.5937],
      zoom: 4
});
const socket = io();
let user = {};
socket.on("connect", () => {
      socket.emit("join");  
});
socket.on("user", (id) => {
      user.id = id
});
socket.on("location", (latlong) => {
      for (const [id, val] of Object.entries(latlong)) {
            if(markers[id] && latlong[id].length){
                  markers[id]
                  .setLngLat(val)
                  .addTo(map);
                 
            }else{
                  markers[id] = new mapboxgl.Marker({}); 
            }
      }
      console.log(latlong)
      
});

socket.on("destroy", (id) => {
      if(markers[id]) markers[id].remove()
});

navigator.geolocation.watchPosition((data) => {
     if(user.id){
            let { latitude, longitude } = data.coords;
            let userData = {
                  latitude: latitude,
                  longitude: longitude,
                  id:user.id
            };
            socket.emit("latlog", userData);
     }
     
     
},(err) =>{
   console.log(err)
},{enableHighAccuracy: true});

/* setInterval(()=>{
      let userData = {
            latitude:  generateRandomCoordinate(-90, 90),
            longitude: generateRandomCoordinate(-180, 180),
            id:user.id
      };
      socket.emit("latlog", userData);
},2000)

function generateRandomCoordinate(min, max) {
      return Math.random() * (max - min) + min;
} */

