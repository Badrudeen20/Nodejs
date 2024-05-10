<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const items = ref({});
    const captain = ref({});
    const total = ref(0)
    const baseURL = import.meta.env.VITE_API_URL;
   
    const handleCaptain = (id,player,type,color)=>{
          
          if(captain[id]){ 
            let ctype = Object.keys(captain[id])[0]
            
            if(ctype==type){
              delete captain[id]
              delete captain[type]
              total.value--
            }else{
              if(captain[type]==undefined){
                captain[id] = {[type]:player}
                captain[type] = id
                delete captain[ctype]
                
              }
            } 
          }else{
            if(total.value < 2){
              if(captain[type]) return
              captain[id] = {[type]:player}
              captain[type] = id
              total.value++
             
            }
          }

          
         
       
    }
    const handlePlayer = async ()=>{
      try {
        const response = await fetch(baseURL+'/api/captain/csk-vs-rr',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(captain)
        }); 
        const data = await response.json();
        // router.push({ path: '/caption/csk-vs-rr' });
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL+'/api/captain/csk-vs-rr'); // Assuming Node.js server is running on the same host
        const data = await response.json();
        items.value = data.team;
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(fetchData);

    return {
      items,
      handleCaptain,
      captain,
      handlePlayer,
      total
    };
  }
};
</script>

<template>
  <div class="container">
      <h3>Select Captains</h3>
     
      <ul class="list-group">
            <li class="list-group-item my-1  d-flex justify-content-between" :id="`player${index}`" v-for="(value, index) in items" :key={index}>
              {{ value }} 
              <div>
                <button class="btn btn-outline-success mx-2" @click="handleCaptain(index,value,'c','success')">Captain</button>
                <button class="btn btn-outline-warning mx-2" @click="handleCaptain(index,value,'vc','warning')">Vise Captain</button>
              </div>
            </li> 
      </ul>
      <button v-if="total==2" @click="handlePlayer()" class="btn btn-primary">Start</button>
  </div>
</template>