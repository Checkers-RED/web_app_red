<template>
  <div class="row">
    <div class="col-1">      
      
      <Move />
    </div>
    <div class="col-2">   
      
      <Desk />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

import Move from '@/components/Move.vue'
import Desk from '@/components/Desk.vue'


export default {
  name: 'Play',
  components: {
    Move, Desk
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
          if (response.data.status == false) {
            this.$router.push('/')
          }
      })
    }
  },
  mounted: function () {
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
@media screen and (min-width: 1000px) {
  .row {    
    display: flex;    
  }
  .col-1 {
    flex: 50%;
    margin-left: 60px;
  }
  .col-2 {      
    flex: 50%;
  }
}
@media screen and (max-width: 1000px) {
  .row {
    display: flex;
    flex-direction: column;
  }
  .col-1 {
    flex: 100%;
    margin-right: 0%;
    order: 2;
  }
  .col-2 {
    flex: 100%;
    margin-left: 0%;
    order: 1;
  }
}
</style>