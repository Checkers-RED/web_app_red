<template>
  <h1>Поиск друга</h1>
  <div class="find">
    <button class="back" @click="href='#'">
      <div class="backicon"></div> 
      Вернуться к окну входа
    </button>
    <div class="input-container">
      <i class="icon"></i>
      <input type="text" placeholder="Имя пользователя" name="uname">
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