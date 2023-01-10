<template>
  <div class="page">
    <div v-show="step == 1" class="step">
      <h1>Восстановление пароля</h1>    
      <div class="container">
        <a class="back" href="/login">
          <div class="backicon"></div> 
          Вернуться к окну входа
        </a>
        <div class="input-container">
          <i class="icon"></i>
          <input v-model="username" type="text" placeholder="Имя пользователя" name="uname" required>
        </div>
        <button class="settings"><i></i></button>                  
        <button class="btn" @click="RequestNick, nextStep">Продолжить</button>
      </div>
    </div>

    <div v-show="step == 2" class="step">
      <h1>Контрольный вопрос</h1>    
      <div class="container">
        <a class="back" href="/login">
          <div class="backicon"></div> 
          Вернуться к окну входа
        </a>
        <div class="question">
          <i class="quest icon"></i>
          <p>{{ question }}</p>
        </div> 
        <div class="input-container">
          <i class="answ icon"></i>   
          <input v-model="answer" :type="answerFieldType" placeholder="Ответ на контрольный вопрос" name="answer" required>
          <button class="show" @click="switchVisibilityAnswer"></button>
        </div>
        <button class="settings"><i></i></button>
        <button class="btn" @click="AnsQues, nextStep">Продолжить</button>        
      </div>      
    </div>

    <div v-show="step == 3" class="step">
      <h1>Контрольный вопрос</h1>    
      <div class="container">
        <a class="back" href="/login">
          <div class="backicon"></div> 
          Вернуться к окну входа
        </a>
        <div class="input-container">
          <i class="pass icon"></i>   
          <input v-model="password" :type="passwordFieldType" placeholder="Пароль" name="psw" required>
          <button class="show" @click="switchVisibility"></button>
        </div>
        <div class="input-container">
          <i class="pass icon"></i>   
          <input v-model="passwordConfirm" :type="passwordConfirmFieldType" placeholder="Повторите пароль" name="confpsw" required>
          <button class="show"  @click="switchVisibilityConfirm"></button>
        </div>
        <button class="settings"><i></i></button>
        <button class="btn" type="submit" @click="ChangePass">Изменить пароль</button>        
      </div>
    </div>
  </div>
</template>

<script>
  import {HTTP} from '@/assets/http-common.js';

  export default {     
    data() {
      return {
        step: 1,
        username: "",
        token: "",
        question: "",
        answer: "",
        answerFieldType: "password",
        password: "",
        passwordFieldType: "password",      
        passwordConfirm: "",      
        passwordConfirmFieldType: "password",
        currSession: "",
      }
    },
    methods: {
      nextStep() {
        this.step++
      },
      switchVisibilityAnswer() {
        this.answerFieldType = this.answerFieldType === "password" ? "text" : "password";
      },
      switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      },
      switchVisibilityConfirm() {
        this.passwordConfirmFieldType = this.passwordConfirmFieldType === "password" ? "text" : "password";
      },

      RequestNick() {
        HTTP.post(`/ReqNick`, username)
          .then(response => {
            this.token = response.data.token
            this.password = response.data.question

          })
          .catch(error => {
            alert("Пользователь не найден")
          })
      },

      AnsQues() {
        HTTP.post(`/AnsQues`, token, answer)
          .then(response => {
            this.token = response.data
          })
          .catch(error => {
            alert("Неверный ответ")
          })
      },

      ChangePass() {
        if (this.password == this.passwordConfirm) {
          HTTP.post(`/ChangePass`, token, password)
            .then(response => {
              this.currSession = response.data
            })
        } else {
          alert("Пароли не совпадают")
        }        
      }
    }
  };
</script>

<style lang="scss" scoped>  
  .container {
    width: 500px;
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
  .question {
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  .question p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000; 
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
    border-radius: 11px 0px 0px 11px;
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat center/30px;
  }
  .pass {
    background: url(/public/img/icons/channel-secure-symbolic.symbolic.png) no-repeat center/30px;
  }
  .quest {
    border-radius: 50%;
    margin-right: 12px;
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
    border-left: none;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;   
  }
  input[name="uname"] input[name="answer"] {
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
    margin: 15px;
    border-radius: 50%;
    width: 45px;
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #E0E0E0;    
  }
  .btn {
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