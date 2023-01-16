<template>
    <h1>Уведомления</h1>
    <div class="notify">

    </div>
</template>

<script>
import {HTTP} from '@/assets/http-common.js';
import Cookies from "js-cookie"

export default {
  data () {
    return {
      timer: null,
      notifications: [

      ]
    }
  },
  methods: {
    getNotifs() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetNotifs`, payload)
        .then(response => {
          this.notifications = response.data
      })
    }
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.getNotifs()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
  .notify {
    width: 500px;
    height: 273px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    overflow-y: auto;
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
</style>