<template>
  <div class="row">
    <div class="col-1">      
      
      <Move />
    </div>
    <div class="col-2">   
      
      <Desk />
    </div>
  </div>
</template>

<script>
import Move from '@/components/Move.vue'
import Desk from '@/components/Desk.vue';


export default {
  name: 'Play',
  components: {
    Move, Desk
  }
  
}
</script>

<style lang="scss">
  .row {    
    display: flex;    
  }
  .col-1 {
    flex: 50%;
    margin-left: 60px;
  }
  .col-2 {      
    flex: 50%;
  }
</style>