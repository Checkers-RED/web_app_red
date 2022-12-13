<template>
  <div class="menu">
    <button class="menu-item" @click="isVisible=!isVisible">
      Рейтинговый матч
    </button>
    <div class="panel" v-if="isVisible">
      <SelectVariant />
      <button @click="show = !show">
          <span v-show="!show">Начать поиск</span>
          <span v-show="show">Остановить поиск </span>
      </button> 
      <span v-if="show"><sync-outlined spin/></span>
    </div>
    <button class="menu-item" @click="href='#'">
      Присоединиться к турниру
    </button>
    
    <button class="menu-item" @click="href='#'">
      Создать пользовательский турнир
    </button>
    
    <button class="menu-item" @click="isVisible2=!isVisible2">
      Игра с ботом
    </button>
    <div class="panel" v-if="isVisible2">
      <SelectVariant />
      <button>
          Начать игру          
      </button> 
    </div>
    
    <div class="nickname">
      Никнейм
      <SettingsButton />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { SyncOutlined } from '@ant-design/icons-vue'; 

import SelectVariant from '@/components/SelectVariant'
import SettingsButton from '@/components/SettingsButton.vue'

export default defineComponent({
  data: () => ({
    isVisible: false,
    isVisible2: false,
    show: false,
  }),
  components: {
    SelectVariant, SyncOutlined, SettingsButton
  },  
});
</script>

style.<style lang="scss" scoped>
  .menu {
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .menu-item {
    width: 100%;
    height: 75px;
    background: #FFFFFF;
    border: none;
    border-bottom: 1px solid #E0E0E0;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    padding: 0px 15px;
    text-align: left;
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: #e6e6e6;
  }
  .menu-item:first-child {
    border-radius: 11px 11px 0px 0px;
  }
  .panel button {
    height: 45px;
    background-color: #e6e6e6;
    border: none;
    border-radius: 11px;
    margin: 20px 20px 0px 0px;
    padding: 0px 15px;
  }
  .panel {
    padding: 15px;
    border-bottom: 1px solid #E0E0E0;
  }
  .nickname {
    width: 500px;
    
    position: fixed;
    bottom: 0;
    border-top: 1px solid #E0E0E0;
    padding: 0px 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
</style>