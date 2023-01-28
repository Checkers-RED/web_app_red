<template>
  <h1>События турнира</h1>
  <div class="events">
    <ul>
      <li class="event" v-for="event in events" :key="event">
        {{ event }}
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
      events: ["Количество участников", "Время на ход"],
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .events {
    width: 100%;
    overflow: auto;
    margin-bottom: 25px;
  }
  .event {
    min-height: 75px;
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
  .events {
    width: 500px;
    height: 700px;
  }
  .event {
    font-size: 20px;
  }
}
  ul {
    padding: 0px;
  }
  .events {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    overflow-y: auto;
  }
  .event {
    height: 75px;
    padding: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .event:hover {
    background-color: #e6e6e6;
  }
</style>