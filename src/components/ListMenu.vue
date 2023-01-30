<template>
  <h1 v-show="!openNotifs">Главное меню</h1>
  <h1 v-show="openNotifs">Уведомления</h1>
  <div class="menu" v-show="!openNotifs">
    <div class="mobile">
      <Profile />
      <button class="btnNotifs" @click="openNotifs=!openNotifs"></button>
      <SettingsButton />
    </div>
    <button class="menu-item" @click="changeVisibility(0)">
      <div class="match"></div>
      Рейтинговый матч
    </button>
    <div class="panel" v-show="isVisible[0]">
      <SelectVariant ref="rankedGameVariant" />
      <button @click="enterTheQueue();">
          <span v-show="!inRankedQueue">Начать поиск</span>
          <span v-show="inRankedQueue">Остановить поиск </span>
      </button> 
      <span v-show="inRankedQueue"><sync-outlined spin/></span>
    </div>
    <!--<button class="menu-item" @click="joinTournament">
      <div class="tournament"></div>
      Присоединиться к турниру
    </button>
    
    <button class="menu-item" @click="createTournament">
      <div class="create"></div>
      Создать пользовательский турнир
    </button> -->
    
    <button class="menu-item" @click="changeVisibility(1)">
      <div class="bot"></div>
      Игра с ботом
    </button>
    <div class="panel" v-show="isVisible[1]">
      <SelectVariant ref="botGameVariant" />
      <p>Время на ход (секунды)</p>
      <div class="time">
        <input type="number" name="time" min="10" max="60" step="5" value="60">      
        <button>Начать игру</button>
      </div> 
    </div>    
    <div class="nickname">
      <Profile />
      <SettingsButton />
    </div>
  </div>
  
  <div class="notifs" v-show="openNotifs"> 
    <div class="mobile notify">
      <Profile />
      <button class="btnNotifs" @click="openNotifs=!openNotifs"></button>
      <SettingsButton />
    </div>
    <Notifications /> 
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

import { defineComponent } from 'vue';
import { SyncOutlined } from '@ant-design/icons-vue'; 

import SelectVariant from '@/components/SelectVariant.vue'
import SettingsButton from '@/components/SettingsButton.vue'
import Notifications from '@/components/Notifications.vue';
import Profile from './Profile.vue';

export default defineComponent({
  data: () => ({
    isVisible: [false, false],
    openNotifs: false,
    inRankedQueue: false,
    chosen_game: "text",
  }),
  components: {
    SelectVariant, SyncOutlined, SettingsButton, Notifications, Profile
  },
  methods: {
    enterTheQueue() {
      let current_session = Cookies.get('current_session')

      let payload = {"current_session": current_session, "rules_id": this.$refs.rankedGameVariant.chosen_game }

      //Если не в очереди
      if (!this.inRankedQueue)
        HTTP.post(`/InRankedMatch`, payload)
          .then(response => {
            this.inRankedQueue = true
            
          })
          
      //Если в очереди
      if (this.inRankedQueue)
        HTTP.post(`/OutRankedMatch`, payload)
          .then(response => {
            this.inRankedQueue = false

          })
    },

    changeVisibility(id) {
      for (let index = 0; index < this.isVisible.length; index++) {
        if (index != id)
          this.isVisible[index] = false;
      }
      this.isVisible[id] = !this.isVisible[id]
    },

    joinTournament() {
      this.$router.push('/tournament');
    },
    createTournament() {
      this.$router.push('/createtournament');
    },
    checkIfInRankedMatch() {      
      let current_session = Cookies.get('current_session')

      let payload = {"current_session": current_session }

      HTTP.post(`/IsInMatch`, payload)
        .then(response => {
          this.inRankedQueue = response.status

        })
    }
  },
  mounted() {
    this.checkIfInRankedMatch()
  }
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .menu {
    width: 100%;
    min-width: 380px;
    height: 380px;
    overflow: auto;
    margin-bottom: 25px;
  }
  .menu-item {
    min-height: 75px;
    font-size: 18px;   
    border: none; 
    border-top: 1px solid #E0E0E0;
  }  
  .menu-item:last-of-type {
    border-bottom: 1px solid #E0E0E0;
  }
  .panel button {
    font-size: 18px;
  }
  .panel p {
    font-size: 18px;
  }
  .time input {
    font-size: 20px;
  }
  .nickname {
    display: none;
  }
  .mobile {
    position: sticky;
    top: 0;
    width: 100%;
    height: 75px;
    border-radius: 11px 11px 0 0;
    background-color: #FFFFFF;
    padding: 15px;
    display: flex;
    align-items: center;   
  }
  .notifs {
    width: 100%;
    min-width: 380px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border: 1px solid #E0E0E0;
    border-radius: 11px;
    margin-bottom: 25px;
  }
  .btnNotifs {
    width: 45px;
    height: 45px;
    border: 1px solid #E0E0E0;
    background: url(/public/img/icons/preferences-system-notifications-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #e6e6e6;
  }
  ::-webkit-scrollbar-thumb {
      background: #bebebe;
      border-radius: 11px;
  }
}
@media screen and (min-width: 1000px) {
  .menu {
    width: 500px;
    height: 700px;    
  }
  .menu-item {
    font-size: 20px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  .menu-item:first-of-type {
    border-radius: 11px 11px 0px 0px;
  }
  .panel button {
    font-size: 18px;
  }
  .panel p {
    font-size: 20px;
  }
  .time input {
    font-size: 20px;
  }  
  .nickname {
    width: 500px; 
    height: 75px;   
    position: absolute;
    bottom: 0;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    display: flex;
  }
  .mobile {
    display: none;
  }
}
  .menu {
    position: relative;
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
    display: flex;
    align-items: center;
    background: #FFFFFF;
    font-weight: 400;
    line-height: 24px;
    padding: 0px 15px;
    text-align: left;
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: #e6e6e6;
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
    line-height: 24px;
  }  
</style>