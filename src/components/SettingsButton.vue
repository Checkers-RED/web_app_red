<template>
  <a-dropdown :trigger="['click']" placement="topRight">
    <button>        
    </button>
    <template #overlay>
      <ul style="overflow:hidden">
        <li>
          <span class="status"></span>
          Статус: {{ current_status }}
        </li>
        <li class = "interactive">
          <span class="help"></span>
          Помощь
        </li>  
        <li class = "interactive" @click="endSession()">
          <span class="exit"></span>
          Выйти из учетной записи
        </li>          
      </ul>
    </template>
  </a-dropdown>
</template>

<script>
import {HTTP} from '@/assets/http-common.js';
import Cookies from "js-cookie"

import { defineComponent } from 'vue';
    
export default defineComponent({
  data: () => ({
    timer: null,
    
    current_status: "в сети"
  }),
  components: {
    
  },
  methods: {
    checkFriends() {      
      HTTP.get(`/TestConnection`)
        .then(response => {
          this.current_status = "в сети"
      })
        .catch(err => {this.current_status = "не в сети"})
    },
    endSession() {
          Cookies.remove("current_session")
          this.$router.push('/login');
    }
  },
  beforeMount(){
    this.checkFriends()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.checkFriends()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  button {
    border-radius: 0 50% 50% 0;    
    width: 45px;
  }
  li {
    font-size: 18px;
  }
}
@media screen and (min-width: 1000px) {
  button {
    border-radius: 50%;    
    width: 45px;
  }
  li {
    font-size: 20px;
  }
}
  button {
    float: right;
    height: 45px;
    border: 1px solid #E0E0E0;        
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  button:hover {
    background-color: #bebebe;
  }
  ul {
    padding: 0px;
    width: 340px;
    height: fit-content;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    background-color: #fff;
  }
  li {
    height: 60px;
    width: 100%;
    padding-left: 15px;
    list-style: none;
    font-weight: 400;
    line-height: 24px;
    display: flex;
    align-items: center;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #E0E0E0;
  }
  span {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
  }
  .help {
    background: url(/public/img/icons/help-about-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  .exit {
    background: url(/public/img/icons/application-exit-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  .interactive {
    background-color: #fff;
  }
  .interactive:hover {
    background-color: #e6e6e6;
  }
</style>