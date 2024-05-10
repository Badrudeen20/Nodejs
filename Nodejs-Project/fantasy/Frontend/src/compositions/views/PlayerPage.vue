<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const items = ref({});
    const players = ref({});
    const total = ref(0)
    const router = useRouter();
    const baseURL = import.meta.env.VITE_API_URL;
    const handleClick = (event,player,key) => {
      if(players[key] && players[key].includes(player)){
            players[key] = players[key].filter((item)=>{
                  return item!=player
            })
            event.target.classList.remove('active');
            total.value--
            return
      }
      if((players[key] && players[key].length == 8) || total.value==11){
           return
      }
     
      if(players[key] && players[key].length < 8){
            
         
          players[key] = [...players[key],player]
          total.value++
         
         
      }else{
        players[key] = [player]
        total.value++
      }
      event.target.classList.add('active');
      
      // Add your logic here
    };
    const handlePlayer = async ()=>{
      try {
        const response = await fetch(baseURL+'/api/select/csk-vs-rr',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(players)
        }); // Assuming Node.js server is running on the same host
        const data = await response.json();
        router.push({ path: '/caption/csk-vs-rr' });
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL+'/api/player/csk-vs-rr'); // Assuming Node.js server is running on the same host
        const data = await response.json();
        items.value = data.player;
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(fetchData);

    return {
      items,
      handleClick,
      total,
      handlePlayer
    };
  }
};
</script>

<template>
  <div class="container">
      <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item" role="presentation" v-for="(value, key) in items">
               <button :class="`nav-link ${(key === 'BATTER') ? 'active' : ''}`" :id="`${key}-tab`" data-bs-toggle="tab" :data-bs-target="`#${key}-tab-pane`" type="button" role="tab" :aria-controls="`${key}-tab-pane`" aria-selected="true">
                  {{ key }}
               </button>
            </li>
          
      </ul>
      <div class="tab-content" id="myTabContent">
           
            <div :class="`tab-pane  ${(key === 'BATTER') ? 'show active' : ''}`" v-for="(value, key) in items" :id="`${key}-tab-pane`" role="tabpanel"  tabindex="0">
                
                  <button class="btn btn-outline-primary my-2" v-for="(val, index) in value" :key="index"  @click="handleClick($event,val.Player,key)">
                             {{ val.Player }}
                 </button>
            </div>
         
      </div>
      <button v-if="total==11" class="btn btn-primary" @click="handlePlayer()">Next</button>
  </div>
</template>