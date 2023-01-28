<template>
  <div class="row">
    <div class="col-1">
      <h1>Лобби турнира</h1>
      <div class="lobby">
        <button class="lobby-item" @click="changeVisibility(0)">
          <div class="participant"></div>
          Список участников
        </button>

        <button class="lobby-item" @click="changeVisibility(1)">
          <div class="rules"></div>
          Правила турнира
        </button>
        
        <button class="lobby-item" @click="changeVisibility(2)">
          <div class="schedule"></div>
          Турнирная сетка
        </button>

        <button class="lobby-item" @click="changeVisibility(3)">
          <div class="events"></div>
          События турнира
        </button>
        
        <button class="lobby-item" @click="changeVisibility(4)">
          <div class="leave"></div>
          Покинуть турнир
        </button>
        <div class="nickname">
          <Profile />
          <SettingsButton />
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="participantList" v-if="isVisible[0]">
        <Participants />
      </div>

      <div class="ruleList" v-if="isVisible[1]">
        <Rules />
      </div>

      <div class="scheduleList" v-if="isVisible[2]">
        <Schedule />
      </div>

      <div class="eventsList" v-if="isVisible[3]">
        <Events />
      </div>

      <div class="toLeave" v-if="isVisible[4]">
        <Leave />
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

import SettingsButton from '@/components/SettingsButton.vue'
import Profile from '@/components/Profile.vue';
import Participants from "@/components/Participants.vue";
import Rules from "@/components/Rules.vue"
import Schedule from "@/components/Schedule.vue";
import Events from "@/components/Events.vue";
import Leave from "@/components/Leave.vue"

export default {
  data() {
    return {
      isVisible: [true, false, false, false, false],
    }
  },
  components: {
    SettingsButton, Profile, Participants, Rules, Schedule, Events, Leave,
  },
  methods: {
    changeVisibility(id) {
      for (let index = 0; index < this.isVisible.length; index++) {
        if (index != id)
          this.isVisible[index] = false;
      }
      this.isVisible[id] = !this.isVisible[id]

      if (!this.isVisible[id])
        this.isVisible[0] = true
    },
  }
}

</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .lobby {
    width: 100%;
    height: 380px;
    overflow: auto;
    margin-bottom: 25px;
  }
  .lobby-item {
    min-height: 75px;
    font-size: 18px;   
    border: none; 
    border-top: 1px solid #E0E0E0;
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
  .lobby {
    width: 500px;
    height: 700px;    
  }
  .lobby-item {
    font-size: 20px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  .lobby-item:first-of-type {
    border-radius: 11px 11px 0px 0px;
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
  .lobby {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .lobby-item {
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
  .lobby-item:hover {
    background-color: #e6e6e6;
  }  
  .lobby-item div {
    float: left;
    width: 45px;
    height: 45px;
    border-radius: 50%;    
    background-color: #e6e6e6; 
    margin-right: 12px;
  }
  .participant {
    background: url(/public/img/icons/system-users-symbolic.symbolic.png) no-repeat center/30px;
  }
  .rules {
    background: url(/public/img/icons/help-about-symbolic.symbolic.png) no-repeat center/30px;
  }
  .schedule {
    background: url(/public/img/icons/schedule.png) no-repeat center/30px;
  }
  .events {
    background: url(/public/img/icons/preferences-system-notifications-symbolic.symbolic.png) no-repeat center/30px;
  }
  .leave {
    background: url(/public/img/icons/application-exit-symbolic.symbolic.png) no-repeat center/30px;
  }
</style>