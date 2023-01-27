<template>
  <div v-if="isOpen">
    <h1>Список участников</h1>
    <div class="participants">
      <ul>
        <template v-for="participant in participants" :id="friend.uid" :key="participant" >
          <li>
            <div class="avatar"> <img :src="friend.photo" width="45" height="45"> </div>
            {{participant.nick}}
            <div class="btn-group">
              <button class="info" ></button>
              <button class="delete" ></button>
            </div>
          </li>
        </template>     
      </ul>
      <button class="searchForFriends" @click="isOpen = !isOpen">
        <div class="add"></div>
        Пригласить друга        
      </button>      
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
            <button class="toAdd" ></button>
            <button class="delete" ></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>  
  import {HTTP} from '@/assets/http-common.js';
  import Cookies from "js-cookie"

  export default {
  data: () => ({
    timer: null,

    isOpen: true,
    show: false,

    currSession: "",
    nick: "",

    participants: [],
  }),

  methods: {

  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .participants {
    width: 100%;
    height: 340px;
  }
  .participants li {
    width: 100%;
    font-size: 18px;
  }
  .find {
    height: 340px;
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
}
@media screen and (min-width: 1000px) {
  .participants {
    width: 500px;
    height: 700px;
  }
  .participants li {
    width: 100%;
    font-size: 20px;
  }
  .find {
    width: 500px;
    height: 700px;
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
  .participants {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    overflow-y: auto;
  }
  .participants li {
    height: 75px;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .participants li:hover {
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