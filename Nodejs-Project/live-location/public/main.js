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
      socket.emit("join",{user:Math.floor(Math.random()*1000)});  
});
socket.on("user", (id) => {
      if (markers[id]) {
            markers[id].remove();
      }
      markers[id] = new mapboxgl.Marker({});
      user.id = id
});
socket.on("location", (latlong) => {
     if(Object.keys(latlong).length){
          for(const [key, value] of Object.entries(latlong)) {
           
            if (latlong[key].length && Object.keys(markers).length) {
                  for (const k in markers) { 
                    if (markers[k] == markers[user.id]) {
                       markers[k]
                      .setLngLat(latlong[k])
                      .addTo(map);
                    }
                  }
            }else{
                  markers[user.id] = new mapboxgl.Marker({});
            }
          }
     }
    
      
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

