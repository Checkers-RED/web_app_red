<template>
  <div class="page">
    <h1 style="text-align:center">Вход в учетную запись</h1>
    <div class="container">
      <div class="input-container">
        <i class="usericon"></i>
        <input type="text" placeholder="Имя пользователя" name="uname" required>
      </div> 
      <div class="input-container">
        <i class="passicon"></i>   
        <input type="password" placeholder="Пароль" name="psw" required>
        <button class="show"></button>
      </div>
      <div class="btn-group">
        <button class="settings"><i class="settingsicon"></i></button>
        <button class="forgot">Забыли пароль?</button>
        <button class="registration">Регистрация</button>
        <button class="login" type="submit">Вход</button>
      </div>    
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';  

  export default defineComponent({    
    components: {
        
    },  
  });
</script>

<style lang="scss" scoped>  
  .page {
    padding-top: 100px;
  }
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
    background: url(/public/img/icons/avatar-default-symbolic.symbolic.png) no-repeat center;
    background-size: 30px;
  }
  .passicon {
    background: url(/public/img/icons/dialog-password-symbolic.symbolic.png) no-repeat center;
    background-size: 30px;
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
  input[type="text"] {
    border-radius: 0px 11px 11px 0px;
  }
  .btn-group {
    padding: 15px 0;
    width: 100%; 
  }  
  .btn-group button {        
    height: 45px;    
    background-color: #e6e6e6;      
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;       
    border: 1px solid #e0e0e0;
    cursor: pointer;        
  }
  .btn-group button:not(:last-child) {
    border-right: none;
  }
  button:hover {
    background-color: #bebebe;
  }
  .settings {
    border-radius: 11px 0px 0px 11px;    
    width: 45px;        
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
  }
  .forgot {
    width: 183px;
  }
  .registration {
    width: 148px;
  }
  .login {
    width: 94px;
    border-radius: 0px 11px 11px 0px;
  }
</style>