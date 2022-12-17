<template>
    <div class="page">
    <h1 style="text-align:center">Регистрация</h1>    
    <div class="container">
      <button class="back" @click="href">
        <i class="backicon"></i>
        Вернуться к окну входа
      </button>
      <div class="input-container">
        <i class="icon"></i>
        <input type="text" placeholder="Имя пользователя" name="uname" required>
      </div> 
      <div class="input-container">
        <i class="pass icon"></i>   
        <input type="password" placeholder="Пароль" name="psw" required>
        <button class="show"></button>
      </div>
      <div class="input-container">
        <i class="pass icon"></i>   
        <input type="password" placeholder="Повторите пароль" name="confpsw" required>
        <button class="show"></button>
      </div>
      <div class="input-container">
        <i class="quest icon"></i>
        <input type="text" placeholder="Контрольный вопрос" name="question" required>
      </div> 
      <div class="input-container">
        <i class="answ icon"></i>   
        <input type="password" placeholder="Ответ на контрольный вопрос" name="answer" required>
        <button class="show"></button>
      </div>      
      <button class="settings"><i><setting-filled/></i></button>
                
      <button class="registration" type="submit">Зарегистрироваться</button>        
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { SettingFilled} from '@ant-design/icons-vue';

  export default defineComponent({    
    components: {
        SettingFilled
    },  
  });
</script>

<style lang="scss" scoped>  
  .page {
    padding-top: 100px;
  }
  .container {
    width: 500px;
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
  }
  .icon {
    width: 45px;
    height: 45px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 11px 0px 0px 11px;
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat;
  }
  .pass {
    background: url(/public/img/icons/dialog-password-symbolic.symbolic.png) no-repeat;
  }
  input {
    height: 45px;
    width: 100%;
    padding: 15px;        
    display: inline-block;
    border: 1px solid #e0e0e0;    
  }
  input[type="text"] {
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
  }
  .registration {
    float: right;
    margin: 15px;
    border-radius: 11px;
  }
  .back {
    height: 75px;
    width: 100%;
    text-align: start;
    background-color: #FFFFFF;
    border-radius: 11px 11px 0px 0px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  button:hover {
    background-color: #bebebe;
  }
  .backicon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: url(/public/img/icons/go-home-symbolic.symbolic.png) no-repeat;
    background-color: #e6e6e6;
  }
</style>