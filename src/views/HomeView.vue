<template>
  <div class="row">
    <div class="col-1">      
      
      <ListMenu />
    </div>
    <div class="col-2">     
      
      <Friends />      
      
    </div>
  </div>
</template>

<script>
import ListMenu from '@/components/ListMenu'
import Friends from '@/components/Friends.vue'


export default {
  name: 'HomeView',
  components: {
    ListMenu, Friends, 
  }
  
}
</script>

<style lang="scss">  
  .row {    
    display: flex;    
  }
  .col-1 {
    flex: 50%;
    margin-right: 60px;
  }
  .col-2 {      
    flex: 50%;
    margin-left: 60px;
  }
</style>