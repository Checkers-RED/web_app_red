<template>
  <p>Набор игровых правил</p>
  <select @change="handleChange" v-model="chosen_game">
    <option v-for="option in options" :value="option.value">{{option.label}}</option>
  </select>
</template>

<script>
export default {
  props: ['get_game'],
  data() {
    return {
      options:
        [{
          value: 1,
          label: 'Русские шашки',
        }, {
          value: 2,
          label: 'Английские шашки',
        }, {
          value: 3,
          label: 'Турецкие шашки',
        }],
        chosen_game: 1
      }
    },
  watch: {
    chosen_game: function() {
      this.get_game = this.chosen_game
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  p {
    font-size: 18px;
  }
  select { 
    font-size: 18px;
  }
}
@media screen and (min-width: 1000px) {
  p {
    font-size: 20px;
  }
  select { 
    font-size: 20px;
  }
}
  p {
    font-weight: 400;
    line-height: 24px;
  }
  select {
    width: 100%;
    height: 60px;
    font-weight: 400;
    line-height: 24px;
    padding: 15px;
    background: #E6E6E6;
    border: 1px solid #E0E0E0;
    border-radius: 11px;
    appearance: none;
    background-image: url(/public/img/icons/pan-down-symbolic.symbolic.png);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: 24px auto, 100%; 
  }
</style>