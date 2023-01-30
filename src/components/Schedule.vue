<template>
  <h1>Турнирная сетка</h1>
  <div class="schedule">
    <div class="round">
      {{ round }}-й раунд
    </div>
    <div class="table">
      <ul>
        <li v-for="participant in participants" :key="participant">
          <div class="participant">
            <div class="avatar"> <img :src="participant.photo" width="45" height="45"> </div>
            {{ participant }}
          </div>
          <div class="participant">
            <div class="avatar"> <img :src="participant.photo" width="45" height="45"> </div>
            {{ participant }}
          </div>
        </li>
      </ul>
    </div>
    <div class="start">
      <div class="attack"></div>
      Начать следующий раунд
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP} from '@/assets/http-common.js'

export default {
  data() {
    return {
      round: "1",
      participants: [1, 2, 3, 4],
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .schedule {
    width: 100%;
    overflow: auto;
  }
  .round {
    font-size: 18px; 
  }
  .start {
    font-size: 18px;
  }
  li {
    font-size: 18px;
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
  .schedule {
    width: 500px;
    height: 700px;
  }
  .round {
    font-size: 20px;
  }
  .start {
    font-size: 20px;
  }
  li {
    font-size: 20px;
  }
}
  ul {
    padding: 0;
    margin: 0;
  }
  .schedule {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .round {
    height: 75px;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    padding: 15px;
    border-bottom: 1px solid #E0E0E0;
  }
  .start {
    height: 75px;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    padding: 15px;
    border-bottom: 1px solid #E0E0E0;
  }
  .attack {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    background: url(/public/img/icons/attack.png) no-repeat center/30px;
    background-color: #e6e6e6;
    margin-right: 12px;
  }
  .table {
    padding: 0%;
  }
  li {
    height: 75px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .participant {
    display: flex;
    align-items: center;
    padding: 15px;
    flex: 50%;
  }
  .participant:first-child {
    border-right: 1px solid #E0E0E0;
  }
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
  }
</style>