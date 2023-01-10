<template>
  <button @click="doPing()">TestPing</button>
    <p>{{ response_result }}</p>
  <div class="page">
    <h1>Вход в учетную запись</h1>
    <div class="container">
      <div class="input-container">
        <i class="usericon"></i>
        <input type="text" v-model="username" placeholder="Имя пользователя" name="uname" required>
      </div> 
      <div class="input-container">
        <i class="passicon"></i>   
        <input :type="passwordFieldType" v-model="password" placeholder="Пароль" name="psw" required>
        <button class="show" @click="switchVisibility"></button>
      </div>
      <div class="btn-group">
        <button class="btn settings"><i class="settingsicon"></i></button>
        <a href="/forgot" class="btn forgot">Забыли пароль?</a>
        <a href="/registration" class="btn registration">Регистрация</a>
        <button class="btn login" type="submit.prevent" @click="login">Вход</button>
      </div>    
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/assets/http-common.js';
export default {
  name: 'App',
  data() {
    return {
      username: "",
      password: "",
      passwordFieldType: "password",
      currSession: "",
      response_result: "nothing"
    }
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    
    login() {
      HTTP.post(`/Authorization/`, username, password)
        .then((response) => {
          this.currSession = response.data
        })
        .catch(err => {console.log('error')})
      console.log('login')
    },

    doPing() {
      let payload = JSON.stringify({field: "test"});
      payload = JSON.parse(payload)

      HTTP.get(`TestConnection/`)
        .then((response) => {
          alert(response.status)
      })

      HTTP.post(`TestConnection/`, payload )
        .then(
          (response) => {
          console.log(response)
          this.response_result = response.data.field; //запись в переменную ответа от сервера
          //this.response_result = JSON.parse(response.data); //вообще возвращаться должен
          //JSON payload, но я успешно об этом забыл. Нужно доделать.
      })
        
    }
  }
}
</script>

<style lang="scss" scoped>    
  .container {
    width: 500px;
    height: 225px;
    margin: auto;     
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    text-align: center;        
  }
  .input-container { 
    height: 75px;   
    padding: 15px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;    
  }
  .show {
    width: 45px;
    height: 45px;
    border-radius: 0px 11px 11px 0px;
    border: 1px solid #e0e0e0;
    border-left: none;
    background: url(/public/img/icons/view-conceal-symbolic.symbolic.png) no-repeat center/23px;
    background-color: #e6e6e6;
  }
  .input-container i {
    width: 45px;
    height: 45px;
    padding: 0 15px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 11px 0px 0px 11px;
  }
  .usericon {
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat center/30px;
  }
  .passicon {
    background: url(/public/img/icons/dialog-password-symbolic.symbolic.png) no-repeat center/30px;
  }
  input {
    height: 45px;
    width: 100%;
    padding: 15px;        
    display: inline-block;
    border: 1px solid #e0e0e0; 
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;   
  }
  input[name="uname"] {
    border-radius: 0px 11px 11px 0px;
  }
  .btn-group {
    padding: 15px 0;
    width: 100%; 
  }  
  .btn {
    display: inline-block;    
    height: 45px;    
    background-color: #e6e6e6;    
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;    
    border: 1px solid #e0e0e0;
    cursor: pointer;
    vertical-align: middle; 
  }
  .btn:not(:last-child) {
    border-right: none;
  }
  button:hover, a:hover {
    background-color: #bebebe;
  }
  .settings {
    border-radius: 11px 0px 0px 11px;    
    width: 45px;
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6; 
  }
  .forgot {    
    width: 183px;
    padding: 10px 0;
  }
  .registration {
    width: 148px;
    padding: 10px 0;
  }
  .login {
    width: 94px;
    border-radius: 0px 11px 11px 0px;
  }
</style>