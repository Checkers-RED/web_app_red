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
          <button class="exit" @click="giveUp()">Выйти из матча</button>
          <button class="continue">Продолжить матч</button>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

export default {
  data() {
    return {
      currSession: "",
    }
  },
  methods: {
    giveUp() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}

      HTTP.post(`/GiveUp`, payload)
        .then(response => {
          this.$router.push('/');
        })
    }
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1120px) {
  .giveup {
    border-radius: 0 50% 50% 0;    
    width: 45px;
  }
  p {
    width: 250px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
}
@media screen and (min-width: 1120px) {
  .giveup {
    border-radius: 50%;    
    width: 45px;
    transform: rotate(15deg);
  }
  .alert {
    width: 420px;
    height: 165px;
    font-size: 20px;
  }
  p {
    width: 346px;
    font-size: 20px;
  }
}
  .giveup {
    float: right;
    width: 45px;
    height: 45px;
    border: 1px solid #FF8181;        
    background: url(/public/img/icons/emoji-flags-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #FF8181;
  }
  .alert {
    background-color: #fff;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    font-weight: 400;
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
    font-weight: 400;
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
  .exit:hover {
    background-color: #FF5B5B;
  }
  .continue {
    margin-left: auto;
    background-color: #9AFF89;
  }
  .continue:hover {
    background-color: #72D761;
  }
</style>