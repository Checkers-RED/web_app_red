<template>
  <div class="row">
    <div class="col-1">      
      
      <ListMenu />
    </div>
    <div class="col-2">     
      
      <Friends />      
      
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

import ListMenu from '@/components/ListMenu'
import Friends from '@/components/Friends.vue'


export default {
  name: 'HomeView',
  components: {
    ListMenu, Friends, 
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    checkIsInMatch() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/IsInMatch`, payload)
        .then(response => {
          if (response.data.status == true) {
            this.$router.push('/play')
          }
      })
    },
    checkIsLoggedIn() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      if (current_session === undefined)
        this.$router.push('/login')
        
      if (current_session == "")
        this.$router.push('/login')
        
      HTTP.post(`/UserScore`, payload)
        .then(response => {

        })
        .catch(error => {
          this.$router.push('/login');
        })
    }
  },
  beforeMount() {
    this.checkIsInMatch()
  },
  mounted() {
    this.checkIsLoggedIn()
    this.timer = setInterval(() => {
      this.checkIsInMatch()
    }, 5000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
  
}
</script>

<style lang="scss">  
  .row {    
    display: flex;    
  }
  .col-1 {
    flex: 50%;
    margin-right: 60px;
  }
  .col-2 {      
    flex: 50%;
    margin-left: 60px;
  }

  @media screen and (max-width: 1000px) {
    .row {
      display: flex;
      flex-direction: column;
    }
    .col-1 {
      flex: 100%;
      margin-right: 0%;
    }
    .col-2 {
      flex: 100%;
      margin-left: 0%;
    }
  }
</style>