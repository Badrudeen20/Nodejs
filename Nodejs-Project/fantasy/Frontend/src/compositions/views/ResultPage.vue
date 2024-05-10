<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const result = ref({});

    const baseURL = import.meta.env.VITE_API_URL;
   

  
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL+'/api/point/csk-vs-rr',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(players)
        }); // Assuming Node.js server is running on the same host
        const data = await response.json();
        console.log(data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(fetchData);

    return {
      result,
     
    };
  }
};
</script>

<template>
  <div class="container">
      <h3>Result</h3>
     
      
  </div>
</template>