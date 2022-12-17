<template>
  <div class="row">
    <div class="col-1">      
      
      <ListMenu />
    </div>
    <div class="col-2">     
      
      <Friends />
      
      <Notifications />
    </div>
  </div>
</template>

<script>
import ListMenu from '@/components/ListMenu'
import Friends from '@/components/Friends.vue';
import Notifications from '@/components/Notifications.vue';

export default {
  name: 'HomeView',
  components: {
    ListMenu, Friends, Notifications
  }
  
}
</script>

<style lang="scss">
  .row {
    display: flex;
    padding-top: 100px;
  }
  .col-1 {
    margin-left: 400px;
  }
  .col-2 {      
    margin-left: 120px;
  }
</style>