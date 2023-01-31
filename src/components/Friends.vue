<template>
  <div v-if="isOpen">
    <h1>Список друзей</h1>
    <div class="friends">
      <ul>
        <template v-for="friend in friends" :id="friend.uid" :key="friend" >
          <li @click="changeVisibility(friend.uid)">
            <div class="avatar"> <img :src="friend.photo" width="45" height="45"> </div>
            {{friend.nick}}
            <div class="btn-group">
              <button class="info" @click="changeVisibility(friend.uid);"></button>
              <button class="delete" @click="changeVisibility(friend.uid); removeFriend(friend.uid)"></button>
            </div>
          </li> 
          <div class="panel" v-show="isVisible[friend.uid - 1]">
            <SelectVariant get_game="chosen_game" />
            <p>Время на ход (секунды)</p>
            <div class="time">
              <input type="number" v-model="moveTimer" name="time" min="10" max="600" step="5">
              <div class="btn">
                <span v-show="show"><sync-outlined spin/></span>
                <button @click="inviteFriend(friend.uid)">
                    <span v-show="!show">Отправить приглашение</span>
                    <span v-show="show">Ожидание ответа...</span>
                </button>
              </div>
            </div>         
          </div>
        </template>     
      </ul>
      <button class="searchForFriends" @click="switchInterface()">
        <div class="add"></div>
        Добавить друга        
      </button>      
    </div>
    <div class="notifs">
    <Notifications />
    </div>
  </div>

  <div v-else>
    <h1>Поиск друга</h1>
    <div class="find">
      <button class="back" @click="isOpen=!isOpen; isFound=false; nick=''; ">
        <div class="backicon"></div> 
        Вернуться к окну входа
      </button>
      <div class="input-container">
        <i class="icon"></i>
        <input v-model="nick" type="text" placeholder="Имя пользователя" name="uname">
      </div> 
      <ul v-if="isFound">
        <li>
          <div class="avatar"> <img :src="found.photo" width="45" height="45"> </div>
          {{found.nick}}
          <div class="btn-group">
            <button class="info"></button>
            <button class="toAdd" v-if="!isFriend(found.uid)" @click="addFriend(found.uid)"></button>
            <button class="delete" v-if="isFriend(found.uid)" @click="removeFriend(found.uid)"></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>  
  import {HTTP} from '@/assets/http-common.js';
  import { SyncOutlined } from '@ant-design/icons-vue';
  import Notifications from '@/components/Notifications.vue';
  import SelectVariant from './SelectVariant.vue';
  import Cookies from "js-cookie"

  export default {
  data: () => ({
    timer: null,

    isOpen: true,
    isVisible: [],
    show: false,

    currSession: "",
    nick: "",

    friends: [],
    found: {},

    isFound: false,
    moveTimer: 60,

    chosen_game: 0
    
  }),
  components: {
    Notifications, SelectVariant, SyncOutlined
  },
  methods: {
    switchInterface() {
      this.isOpen = !this.isOpen;

      for (let index = 0; index < this.isVisible.length; index++) {
        this.isVisible[index] = false;
      }

    },
    changeVisibility(id) {

      while (this.isVisible.length < id) {
        this.isVisible.push(false)
      }

      for (let index = 0; index < this.isVisible.length; index++) {
        if (index != id - 1)
          this.isVisible[index] = false;
      }
      this.isVisible[id - 1] = !this.isVisible[id - 1]
    },
    

    checkFriends() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetFriends`, payload)
        .then(response => {
          this.friends = response.data
      })
    },
    findUser() {
      this.isFound=false
      let payload = {"nick": this.nick}
      
      HTTP.post(`/SearchUser`, payload)
        .then(response => {
          this.found = response.data
          this.isFound=true
      }).catch(error => {})
    },
    isFriend(id) {
      for (let index = 0; index < this.friends.length; index++) {
        if (id == this.friends[index].uid)
          return true
      }
      return false
    },

    addFriend(id) {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session, "f_id": id}
      
      HTTP.post(`/AddFriend`, payload)
        .then(response => {
          alert("Friend added")
          this.checkFriends()
      })
    },
    removeFriend(id) {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session, "f_id": id}
      
      HTTP.post(`/DeleteFriend`, payload)
        .then(response => {
          alert("Friend removed")
          this.checkFriends()
      })
    },
    inviteFriend(id) {
      this.show = !this.show
      let current_session = Cookies.get('current_session')

      //let payload = { "current_session": current_session, "rules_id": this.$refs.userGameVariant.chosen_game }
      console.log(this.chosen_game)

      /*
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
          */
    }
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.checkFriends()
    }, 5000)
  },
  watch: {
    nick: function() {
      this.findUser()
    }
  },
  beforeMount(){
    this.checkFriends()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}

</script>

<style lang="scss" scoped>
@media screen and (max-width: 1120px) {
  .friends {
    width: 100%;    
    margin-bottom: 25px;
    height: 340px;
  }
  .friends li {
    width: 100%;
    font-size: 18px;
  }
  .find {
    height: 340px;
  }
  .time button {
    font-size: 18px; 
  }
  .panel p {
    font-size: 18px;
  }
  .time input {
    font-size: 18px;
  }
  .searchForFriends {
    font-size: 18px;
  }
  input {
    font-size: 18px;
  }
  .back {
    font-size: 18px;
  }
  .notifs {
    display: none;
  }
}
@media screen and (min-width: 1120px) {
  .friends {
    width: 500px;
    height: 340px;
  }
  .friends li {
    width: 100%;
    font-size: 20px;
  }
  .find {
    width: 500px;
    height: 700px;
  }
  .time button {
    font-size: 20px; 
  }
  .panel p {
    font-size: 20px;
  }
  .time input {
    font-size: 20px;
  }
  .searchForFriends {
    font-size: 20px;
  }
  input {
    font-size: 20px;
  }
  .back {
    font-size: 20px;
  }
}
  ul {
    padding: 0px;
  }
  .friends {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    margin-bottom: 25px;
    overflow-y: auto;
  }
  .friends li {
    height: 75px;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .friends li:hover {
    background-color: #e6e6e6;
  }
  .find {
    position: relative;
    display: flex;
    margin-top: 0;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .find li {
    height: 75px;
    width: 100%;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
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
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
    overflow: hidden;
  }  
  .btn-group {
    margin-left: auto;
  }
  .btn-group button {
    height: 35px;
    width: 60px;
    border: none;
  }
  .info {
    background: url(/public/img/icons/user-info-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #e6e6e6;
    border-radius: 17.5px 0px 0px 17.5px;
  }
  .info:hover {
    background-color: #bebebe;
  }
  .delete {
    background: url(/public/img/icons/action-unavailable-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #ff8181;
    border-radius: 0px 17.5px 17.5px 0px;
  }
  .toAdd {
    background: url(/public/img/icons/contact-new-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #9AFF89;
    border-radius: 0px 17.5px 17.5px 0px;
  }
  .toAdd:hover {
    background-color: #72D761;
  }
  .delete:hover {
    background-color: #ff5b5b;
  }
  .panel {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #E0E0E0;
  }
  .time {
    display: flex;
    align-items: center;
  }
  .btn {
    margin-left: auto;
  }
  .btn span {
    margin-right: 5px;
  }
  .time button {
    height: 45px;
    background-color: #e6e6e6;
    border: none;
    border-radius: 11px;
    padding: 0px 15px;
    line-height: 24px;
    margin-left: auto;
  }
  .panel button:hover {
    background-color: #bebebe;
  }
  .panel button:focus {
    background-color: #bebebe;
  }
  .panel p {
    padding-top: 24px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .time input {
    height: 45px;
    width: 90px;
    text-align: center;
    border-radius: 0;
    border: 1px solid #E0E0E0;
    font-weight: 400;
    line-height: 24px;
  }
  .searchForFriends {
    height: 75px;
    width: 100%;
    margin: -15px 0;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border: none;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    background: #FFFFFF;
  }
  .searchForFriends:hover {
    background: #e6e6e6;
  }
  .add {
    background: url(/public/img/icons/contact-new-symbolic.symbolic.png) no-repeat center/30px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
  }
  .input-container { 
    height: 75px;   
    padding: 15px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;    
  }
  .icon {
    width: 45px;
    height: 45px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 11px 0px 0px 11px;
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat center/30px;
  }
  input {
    height: 45px;
    width: 100%;
    padding: 15px;        
    display: inline-block;
    border: 1px solid #e0e0e0;  
    border-radius: 0 11px 11px 0;
    font-weight: 400;
    line-height: 24px; 
  }
  .back {
    height: 75px;
    width: 100%;
    padding: 15px;
    font-weight: 400;
    line-height: 24px;  
    text-align: left;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 11px 11px 0px 0px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  .back:hover {
    background-color: #e6e6e6;
  }
  .backicon {
    float: left;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: url(/public/img/icons/go-home-symbolic.symbolic.png) no-repeat center/30px;
    background-color: #e6e6e6; 
    margin-right: 12px;
  }
</style>