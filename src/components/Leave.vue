<template>
  <h1>Покинуть турнир</h1>
  <div class="leave">
    <ul>
      <li>
        <span class="alert"></span>
        <p>Вы уверены, что желаете покинуть <br>турнир? Вам будет засчитано <br> поражение в текущем турнире.</p>
      </li>
      <li>
        <span class="confirm"></span>
        <button>Да, я желаю покинуть турнир</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

export default {
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .leave {
    width: 100%;
    overflow: auto;
    margin-bottom: 25px;
  }
  .leave li {
    font-size: 18px;   
    border: none; 
    border-top: 1px solid #E0E0E0;
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
}
@media screen and (min-width: 1000px) {
  .leave {
    width: 500px;
    height: 700px;
  }
  .leave li {
    font-size: 20px;
  }
}
.leave {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  overflow-y: auto;
}
.leave li {
  padding: 15px;
  list-style: none;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 24px;
  border-bottom: 1px solid #E0E0E0;
}
ul {
  padding: 0;
}
span {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #E0E0E0;
  margin-right: 12px;
}
.alert{
  background: url(/public/img/icons/help-faq-symbolic.symbolic.png) no-repeat center/30px;
}
.confirm {
  background: url(/public/img/icons/user-away-symbolic.symbolic.png) no-repeat center/30px;
}
button { 
  background-color: #FF8181;
  border: 1px solid #E0E0E0;
  border-radius: 11px;
  height: 45px;
  padding-left: 45px;
  background-image: url(/public/img/icons/application-exit-symbolic.symbolic.png);
  background-repeat: no-repeat, repeat;
  background-size: 24px auto, 100%;
  background-position: left .7em top 50%, 0 0;
}
</style>
