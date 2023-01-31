<template>
  <h1>Оставшееся время: {{ timerCount }}</h1>
  <div class="move">
    <ul id="list">
      <li v-for="move in moves" :key="move">
        {{ move.note }}
      </li>
    </ul>
    
    <div class="opponent">
      <Opponent />
      <GiveUp />
    </div>
    <div class="nickname">
      <Profile />
      <SettingsButton />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

import SettingsButton from '@/components/SettingsButton.vue'
import Profile from '@/components/Profile.vue'
import Opponent from '@/components/Opponent.vue'
import GiveUp from '@/components/GiveUp.vue'

export default {
  name: 'HomeView',
  components: {
    SettingsButton, Profile, Opponent, GiveUp
  },
  data () {
    return {
      //Таймер по умолчанию и обратный отсчёт
      defaultTimer: 60,
      
      timerCount: 60,
      fieldTimer: null,
      timer: null,
      moves: [],
      
    }
  },
  methods: {
    getGameInfo() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetGameInfo`, payload)
        .then(response => {
          this.defaultTimer = response.data.move_time
          this.timerCount = this.defaultTimer
      })
      .catch(error => {
        this.defaultTimer = 60,
        this.timerCount = 60
      })
    },
    GetMoves() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      let result_moves = ""
      
      HTTP.post(`/GetMoves`, payload)
        .then(response => {
          this.moves = response.data
      })
    },
    reduceTimer() {
      if (this.timerCount > 0)
        this.timerCount -= 1
    }
  },
  beforeMount() {
    this.GetMoves()
  },
  mounted() {
    this.fieldTimer = setInterval(() => {
      this.reduceTimer()
    }, 1000)

    this.timer = setInterval(() => {
      this.GetMoves()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}

</script>

<style lang="scss" scoped>
@media screen and (max-width: 1120px) {
  .move {
    width: 100%;
    min-width: 380px;
    height: 300px;
  }
  .move li {
    font-size: 18px;
  }
  .opponent {
    width: 100%;
    font-size: 18px;
  }
  .nickname {
    width: 100%; 
    font-size: 18px;
  }
}
@media screen and (min-width: 1120px) {
  .move {
    width: 500px;
    height: 700px;
  }
  .move li {
    font-size: 20px;
  }
  .opponent {
    width: 500px;
    font-size: 20px;
  }
  .nickname {
    width: 500px; 
    font-size: 20px;
  }
}
  .move {
    position: relative;
    display: flex;
    margin-top: 0;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .move ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;

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
  .move li {
    height: 75px;
    width: 100%;
    padding: 15px;
    list-style: circle;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .opponent {
    height: 75px;   
    position: absolute;
    bottom: 75px;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    font-weight: 400;
    line-height: 24px;
    display: flex;
  }
  .nickname {
    height: 75px;   
    position: absolute;
    bottom: 0;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    font-weight: 400;
    line-height: 24px;
    display: flex;
  }
</style>