<template>
  <div class="profile">
    <div class="avatar">
      <img src='' height="45px" width="45px">
    </div>
    <div class="nickname">
      <p>{{ nickname }}</p>
    </div>
    <div class="scores">
      <p>{{ score }} очков</p>
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
      
      HTTP.post(`/UserScore`, payload)
        .then(response => {
          this.nickname = response.data.nick
          this.score = response.data.score
          this.photo = response.data.photo
        })
        .catch(error => {
          UserData()
        })
    }
  },
 beforeMount(){
    this.UserData()
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .nickname {
    width: 44%;  
  }
  .scores {
    width: 43%;
    border-radius: 0px;
  }
  p {
  font-size: 18px;
  }
}
@media screen and (min-width: 1000px) {
  .nickname {
    width: 35%;  
  }
  .scores {
    width: 35%;
  border-radius: 0px 22.5px 22.5px 0px;
  }
  p {
  font-size: 20px;
  }
}
.profile {  
  width: 100%;
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
  background-color: #e6e6e6;  
}
.scores {
  height: 45px;
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
  line-height: 24px;
}
</style>