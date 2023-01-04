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
  name: 'HomeView',
  components: {
    Move, Desk
  }
  
}
</script>

<style lang="scss">
  .row {
    width: 1400px;
    margin-left: 260px;
    margin-right: 260px;
    display: flex;
    padding-top: 100px;
  }
  .col-1 {
    flex: 50%;
    padding-left: 60px;
  }
  .col-2 {      
    flex: 50%;
  }
</style>