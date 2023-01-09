<template>
  <h1>Главное меню</h1>
  <div class="menu">
    <button class="menu-item" @click="isVisible=!isVisible; isVisible2=false">
      <div class="match"></div>
      Рейтинговый матч
    </button>
    <div class="panel" v-show="isVisible">
      <SelectVariant />
      <button @click="show = !show">
          <span v-show="!show">Начать поиск</span>
          <span v-show="show">Остановить поиск </span>
      </button> 
      <span v-show="show"><sync-outlined spin/></span>
    </div>
    <button class="menu-item" @click="href='#'">
      <div class="tournament"></div>
      Присоединиться к турниру
    </button>
    
    <button class="menu-item" @click="href='#'">
      <div class="create"></div>
      Создать пользовательский турнир
    </button>
    
    <button class="menu-item" @click="isVisible2=!isVisible2; isVisible=false">
      <div class="bot"></div>
      Игра с ботом
    </button>
    <div class="panel" v-show="isVisible2">
      <SelectVariant />
      <p>Время на ход (секунды)</p>
      <div class="time">
        <input type="number" name="time" min="10" max="60" step="5" value="30">      
        <button>Начать игру</button>
      </div> 
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

<style lang="scss" scoped>
  .menu {
    width: 500px;
    height: 700px;
    position: relative;
    display: flex;
    margin-top: 0;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .menu-item {
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
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
  .menu-item div {
    float: left;
    width: 45px;
    height: 45px;
    border-radius: 50%;    
    background-color: #e6e6e6; 
    margin-right: 12px;
  }
  .match {
    background: url(/public/img/icons/attack.png) no-repeat center/30px;
  }
  .tournament {
    background: url(/public/img/icons/attack.png) no-repeat center/30px;
  }
  .create {
    background: url(/public/img/icons/schedule.png) no-repeat center/30px;
  }
  .bot {
    background: url(/public/img/icons/preferences-desktop-display-symbolic.symbolic.png) no-repeat center/30px;
  }
  .panel button {
    height: 45px;
    background-color: #e6e6e6;
    border: none;
    border-radius: 11px;
    margin-top: 20px;
    padding: 0px 15px;
    font-size: 20px; 
    line-height: 24px
  }
  .panel button:hover {
    background-color: #bebebe;
  }
  .panel button:focus {
    background-color: #bebebe;
  }
  .panel {
    padding: 15px;
    border-bottom: 1px solid #E0E0E0;
  }
  .panel p {
    padding-top: 24px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .time {
    display: flex;
    align-items: center;
  }
  .time button{
    margin-left: auto;
    margin-top: 0px;
  }
  .time input {
    height: 45px;
    width: 60px;
    text-align: center;
    border: 1px solid #E0E0E0;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }  
  .nickname {
    width: 500px; 
    height: 75px;   
    position: absolute;
    bottom: 0;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
</style>