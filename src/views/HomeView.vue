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
import Friends from '@/components/Friends.vue';


export default {
  name: 'HomeView',
  components: {
    ListMenu, Friends, 
  }
  
}
</script>

<style lang="scss">
  .row {
    width: 1120px;
    margin-left: 400px;
    margin-right: 400px;
    display: flex;
    padding-top: 100px;
  }
  .col-1 {
    flex: 50%;
    padding-right: 60px;
  }
  .col-2 {      
    flex: 50%;
    margin-left: 60px;
  }
</style>