<script setup>

import { ref } from 'vue'
const message = ref('Hello World!')
console.log(message.value) // "Hello World!"
message.value = 'Changed'

</script>

<template>
  <div class="container">
    <RouterLink to="/player/csk-vs-rr" class="nav-link">
      <div class="card text-center my-2">
              <a href="<%-url%>player/csk-vs-rr" class="row" role="button" tabindex="0">
                <div class="col-5 my-2">
                    CSK
                </div>
                <div class="col-2 my-2">vs</div>
                <div class="col-5 my-2">RR</div>
              </a>
        </div>
    </RouterLink>
  </div>
</template>