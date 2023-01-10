<template>
  <a-dropdown :trigger="['click']" placement="topRight">
    <button class="giveup"></button>
    <template #overlay>
      <div class="alert">
        <div class="msg">
          <span class="info"></span>
          <p>Вы уверены, что желаете сдаться?         
            Вам будет засчитано поражение.</p>
        </div>
        <div class="btn">
          <button class="exit">Выйти из матча</button>
          <button class="continue">Продолжить матч</button>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<style lang="scss" scoped>
  .giveup {
    float: right;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;        
    background: url(/public/img/icons/emoji-flags-symbolic.symbolic.png) no-repeat center/25px;
    transform: rotate(15deg);
    background-color: #FF8181;
  }
  .alert {
    width: 420px;
    height: 165px;
    background-color: #fff;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .msg {    
    padding: 15px;    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
    background: url(/public/img/icons/help-about-symbolic.symbolic.png) no-repeat center/25px;
  }
  p {
    width: 346px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    border-top: 1px solid #E0E0E0;
  }
  .btn button {
    height: 45px;
    border-radius: 11px;
    border: 1px solid #E0E0E0;
  }
  .exit {
    background-color: #FF8181;
  }
  .continue {
    margin-left: auto;
    background-color: #9AFF89;
  }
</style>