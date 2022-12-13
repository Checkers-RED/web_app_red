<template>
  <div class="row">
    <div class="col">      
      <h1>Главное меню</h1>
      <ListMenu />
    </div>
    <div class="col">     
      <h1>Друзья</h1>
      <Friends />
      <h1>Уведомления</h1>
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

<style lang="scss" scoped>
  .row {
    display: flex;
  }

  .col {
      flex: 50%;
  }
</style>