<template>
    <div class="page">
    <h1>Регистрация</h1>    
    <div class="container">
      <a class="back" href="/login">
        <div class="backicon"></div> 
        Вернуться к окну входа
      </a>
      <div class="input-container">
        <i class="icon"></i>
        <input v-model="username" type="text" placeholder="Имя пользователя" name="uname" required>
      </div> 
      <div class="input-container">
        <i class="pass icon"></i>   
        <input v-model="password" :type="passwordFieldType" placeholder="Пароль" name="psw" required>
        <button class="show" @click="switchVisibility"></button>
      </div>
      <div class="input-container">
        <i class="pass icon"></i>   
        <input v-model="passwordConfirm" :type="passwordConfirmFieldType" placeholder="Повторите пароль" name="confpsw" required>
        <button class="show" @click="switchVisibilityConfirm"></button>
      </div>
      <div class="input-container">
        <i class="quest icon"></i>
        <input v-model="question" type="text" placeholder="Контрольный вопрос" name="question" required>
      </div> 
      <div class="input-container">
        <i class="answ icon"></i>   
        <input v-model="answer" :type="answerFieldType" placeholder="Ответ на контрольный вопрос" name="answer" required>
        <button class="show" @click="switchVisibilityAnswer"></button>
      </div>      
      <button class="settings"><i></i></button>
                
      <button class="registration" type="submit" @click="CreateAccount">Зарегистрироваться</button>        
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {HTTP} from '@/assets/http-common.js';
import { Alert } from 'ant-design-vue';

  export default {    
    data() {
      return {
        username: "",
        password: "",
        passwordFieldType: "password",      
        passwordConfirm: "",      
        passwordConfirmFieldType: "password",
        question: "",
        answer: "",
        answerFieldType: "password",
        currSession: "",
      }
    },
    methods: {
      switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      },
      switchVisibilityConfirm() {
        this.passwordConfirmFieldType = this.passwordConfirmFieldType === "password" ? "text" : "password";
      },
      switchVisibilityAnswer() {
        this.answerFieldType = this.answerFieldType === "password" ? "text" : "password";
      },

      CreateAccount() {

        if (this.password == this.passwordConfirm) {
          let payload = {"nick": this.username, "pass": this.password, "ques": this.question, "ans": this.answer}

          HTTP.post(`/CreateAccount`, payload)
            .then((response) => {
              Cookies.set("current_session", response.data.current_session)
              this.currSession = response.data.current_session
              this.$router.push('/');
            })
        } else {
          alert("Ошибка во введённых данных")
        }       
      }
    }
  }
</script>

<style lang="scss" scoped>    
@media screen and (min-width: 1120px) {
  .container {
    width: 500px;
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 1120px) {
  .container {
    width: 95%;
  }
}
  .container {
    height: 520px;
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
  .icon {
    width: 45px;
    height: 45px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 11px 0px 0px 11px;
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat center/30px;
  }
  .pass {
    background: url(/public/img/icons/channel-secure-symbolic.symbolic.png) no-repeat center/30px;
  }
  .quest {
    background: url(/public/img/icons/help-faq-symbolic.symbolic.png) no-repeat center/30px;
  }
  .answ {
    background: url(/public/img/icons/user-away-symbolic.symbolic.png) no-repeat center/30px;    
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
  input[name="uname"] input[name="question"] {
    border-radius: 0px 11px 11px 0px;
  }    
  button {        
    height: 45px;    
    background-color: #e6e6e6;        
    padding: 0 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;       
    border: 1px solid #e0e0e0;
    cursor: pointer;        
  }
  .settings {
    float: left;
    margin: 15px;
    border-radius: 50%;
    width: 45px;
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #E0E0E0;
    
  }
  .registration {
    float: right;
    margin: 15px;
    border-radius: 11px;
  }  
  button:hover {
    background-color: #bebebe;
  }  
  .back {
    height: 75px;
    width: 100%;
    padding: 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;    
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