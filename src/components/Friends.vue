<template>
  <div v-if="isOpen">
    <h1>Список друзей</h1>
    <div class="friends">
      <ul>
        <template v-for="friend in friends" :key="friend" >
        <li @click="isVisible=!isVisible">
          <div class="avatar"></div>
          {{friend.nickname}}
          <div class="btn-group">
            <button class="info"></button>
            <button class="delete"></button>
          </div>
        </li> 
        <div class="panel" v-show="isVisible">
          <SelectVariant />
          <p>Время на ход (секунды)</p>
          <div class="time">
            <input type="number" name="time" min="10" max="60" step="5" value="30">
            <div class="btn">
              <span v-show="show"><sync-outlined spin/></span>
              <button @click="show = !show">
                  <span v-show="!show">Отправить приглашение</span>
                  <span v-show="show">Ожидание ответа...</span>
              </button>
            </div>
          </div>         
        </div>
        </template>     
      </ul>
      <button class="addfriend" @click="isOpen=!isOpen">
        <div class="add"></div>
        Добавить друга        
      </button>      
    </div>
    <Notifications />
  </div>

  <div v-else>
    <h1>Поиск друга</h1>
  <div class="find">
    <button class="back" @click="isOpen=!isOpen">
      <div class="backicon"></div> 
      Вернуться к окну входа
    </button>
    <div class="input-container">
      <i class="icon"></i>
      <input type="text" placeholder="Имя пользователя" name="uname">
    </div> 
  </div>
  </div>
</template>

<script>  
  import { SyncOutlined } from '@ant-design/icons-vue';
  import Notifications from '@/components/Notifications.vue';
  import SelectVariant from './SelectVariant.vue';

  export default {
  data: () => ({
    isOpen: true,
    isVisible: false,
    show: false,
  
    friends: [
      {nickname: 'Никнейм_1'},
      {nickname : 'Никнейм_2'}
    ]
    
  }),
  components: {
    Notifications, SelectVariant, SyncOutlined
  }
  
}
</script>

<style lang="scss" scoped>
  .friends {
    width: 500px;
    height: 340px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    margin-bottom: 25px;
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
  .friends li {
    height: 75px;
    width: 494px;
    margin: 0 -40px;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .friends li:hover {
    background-color: #e6e6e6;
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
  .delete:hover {
    background-color: #ff5b5b;
  }
  .panel {
    width: 500px;
    margin: 0 -40px;
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
    font-size: 20px; 
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
    width: 60px;
    text-align: center;
    border-radius: 0;
    border: 1px solid #E0E0E0;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .addfriend {
    height: 75px;
    width: 100%;
    margin: -15px 0;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    border: none;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    background: #FFFFFF;
  }
  .addfriend:hover {
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
  .find {
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
    font-size: 20px;
    line-height: 24px; 
  }
  .back {
    height: 75px;
    width: 100%;
    padding: 15px;
    font-weight: 400;
    font-size: 20px;
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