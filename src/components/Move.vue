<template>
  <h1>Совершённые ходы</h1>
  <div class="move">
    <ul id="list">
      <li v-for="move in moves" :key="move">
        {{ move.move }}
      </li>
    </ul>
    
    <div class="opponent">
      <Profile />
      <GiveUp />
    </div>
    <div class="nickname">
      <Profile />
      <SettingsButton />
    </div>
  </div>
</template>

<script>
import SettingsButton from '@/components/SettingsButton.vue'
import Profile from '@/components/Profile.vue'
import GiveUp from '@/components/GiveUp.vue'

/*
      HTTP.post(`/Authorization/`, username, password)
        .then((response) => {
          this.currSession = response.data
        })
        .catch(err => {console.log('error')})
*/
export default {
  name: 'HomeView',
  components: {
    SettingsButton, Profile, GiveUp
  },
  data () {
    return {
      moves: [
        {move: 'A2-G4 B6-A5'},
        {move: 'B2-A3 '}
      ]
    }
  }  
}

</script>

<style lang="scss" scoped>
  .move {
    width: 500px;
    height: 700px;
    position: relative;
    display: flex;
    margin-top: 0;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  .move ul {
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
  .move li {
    height: 75px;
    width: 494px;
    margin-left: -40px;
    padding: 15px;
    list-style: circle;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    border-bottom: 1px solid #E0E0E0;
  }
  .opponent {
    width: 500px; 
    height: 75px;   
    position: absolute;
    bottom: 75px;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
  }
  .nickname {
    width: 500px; 
    height: 75px;   
    position: absolute;
    bottom: 0;       
    border-top: 1px solid #E0E0E0;
    padding: 15px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
  }
</style>