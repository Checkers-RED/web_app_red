<template>
  <div class="profile">
    <div class="avatar">
      <img src='' height="45px" width="45px">
    </div>
    <div class="nickname">
      <p>{{ nickname }}</p>
    </div>
    <div class="scores">
      <p>{{ score }}</p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

export default {
  data() {
    return {
      currSession: "",
      nickname: "",
      score: "",
      photo: "",
    }
  },
  methods: {
    UserData() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      if (current_session) {
        HTTP.post(`/UserScore`, payload)
          .then(response => {
            this.nickname = response.data.nick
            this.score = response.data.score
            this.photo = response.data.photo
          })
          .catch(error => {
            this.$router.push('/login');
          })
        
      } else {
        this.$router.push('/login');
      }
    }
  },
 beforeMount(){
    this.UserData()
 }
}
</script>

<style lang="scss" scoped>
.profile {  
  margin-right: auto;
  display: flex;
  align-items: center;
}
.avatar {
  height: 45px;
  width: 45px;
  border-radius: 22.5px 0 0 22.5px;
}
.nickname {
  height: 45px;
  width: 135px;
  background-color: #e6e6e6;  
}
.scores {
  height: 45px;
  width: 180px;
  border-radius: 0px 22.5px 22.5px 0px;
  background-color: #e6e6e6;
}
.profile div {
  padding-top: 10px;
  border: 1px solid #e0e0e0;
}
.profile div:not(:last-child) {
  border-right: none;
}
p {
  text-align: center;
  vertical-align: middle;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
</style>