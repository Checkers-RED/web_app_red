<template>
    <h1>Уведомления</h1>
    <div class="notify">
      <ul>
        <li v-for="notification in notifications"  :key="notification" >
          <template v-if="notification.type == 1">
            <span class="invite"></span>
            Приглашение в друзья от {{ notification.actEl1 }}
            <div class="btn-group">
              <button class="accept" ></button>
              <button class="reject" ></button>
            </div>
          </template> 
          <template v-if="notification.type == 2">
            <span class="invite"></span>
            Приглашение сыграть с {{ notification.actEl1 }}
            <div class="btn-group">
              <button class="accept" @click="acceptMatch(notification.actEl1)"></button>
              <button class="reject" @click="rejectMatch(notification.actEl1)"></button>
            </div>
          </template> 
          <template v-if="notification.type == 3">
            <span class="invite"></span>
            Приглашение в турнир от {{ notification.actEl1 }}
            <div class="btn-group">
              <button class="accept" ></button>
              <button class="reject" ></button>
            </div>
          </template> 
          <template v-if="notification.type == 4">
            <span class="win"></span>
            Победа против {{ notification.actEl1 }}: +{{ notification.actEl2 }} очков
          </template> 
          <template v-if="notification.type == 5">
            <span class="lose"></span>
            Поражение против {{ notification.actEl1 }}: -{{ notification.actEl2 }} очков
          </template>
          <template v-if="notification.type == 6">
            <span class="decline"></span>
            Отклонение приглашения {{ notification.actEl1 }}
          </template>
        </li>
      </ul>
    </div>
</template>

<script>
import {HTTP} from '@/assets/http-common.js';
import Cookies from "js-cookie"

export default {
  data () {
    return {
      timer: null,
      notifications: [
        {
          type: 1,
          actEl1: "Никнейм",
          actEl2: ""
        },
        {
          type: 2,
          actEl1: "Никнейм",
          actEl2: ""
        },
        {
          type: 3,
          actEl1: "Никнейм",
          actEl2: ""
        },
        {
          type: 4,
          actEl1: "Никнейм",
          actEl2: "30"
        },
        {
          type: 5,
          actEl1: "Никнейм",
          actEl2: "25"
        },
        {
          type: 6,
          actEl1: "Никнейм",
          actEl2: ""
        }
      ],
    }
  },
  methods: {
    getNotifs() {
      return
      
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetNotifs`, payload)
        .then(response => {
          this.notifications = response.data
      })
    },

    acceptMatch(org_nick) {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session, "org_nick": org_nick}

      HTTP.post(`/AcceptMatch`, payload)
        .then(response => {
          this.$router.push('/play');
        })
    },

    rejectMatch(org_nick) {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session, "org_nick": org_nick}

      HTTP.post(`/RejectMatch`, payload)
    },
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.getNotifs()
    }, 5000)
  },
  beforeMount(){
    this.getNotifs()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .notify {
    width: 100%;
    height: 280px;
    border-radius: 0 0 11px 11px;
    border-top: 1px solid #E0E0E0;
  }
  h1 {
    display: none;
  }
  li {
    width: 100%;
    font-size: 18px;    
  }
}

@media screen and (min-width: 1000px) {
  .notify {
    width: 500px;
    height: 273px;
    border-radius: 11px;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25); 
  }
  li {
    width: 100%;
    font-size: 20px;    
  }
}
  .notify {
    background: #FFFFFF;
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
  ul {
    padding: 0px;
  }
  li {
    height: 75px;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .btn-group {
    display: flex;
    margin-left: auto;
  }
  .btn-group button {
    height: 35px;
    width: 60px;
    border: 1px solid #E0E0E0;
  }
  .reject {
    background: url(/public/img/icons/process-stop-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #ff8181;
    border-radius: 0px 17.5px 17.5px 0px;
  }
  .reject:hover {
    background-color: #ff5b5b;
  }
  .accept {
    background: url(/public/img/icons/object-select-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #9AFF89;
    border-radius: 17.5px 0px 0px 17.5px;
  }
  .accept:hover {
    background-color: #72D761;
  }
  span {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
  }
  .invite {
    background-color: #51D5FF;
  }
  .win {
    background-color: #A0FF55;
  }
  .lose {
    background-color: #FF5B5B;
  }
  .decline {
    background-color: #FF5B5B;
  }
</style>