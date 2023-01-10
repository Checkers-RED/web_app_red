<template>
  <p>Набор игровых правил</p>
    <select @change="handleChange">
      <option v-for="option in options" :key="option.value">{{option.label}}</option>
    </select>
  </template>

  <script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const options = ref([{
        value: 'russian',
        label: 'Русские шашки',
      }, {
        value: 'english',
        label: 'Английские шашки',
      }, {
        value:'turkey',
        label: 'Турецкие шашки',
      }]);
      const handleChange = value => {
        console.log(value);
      };
  
      return {
        value: ref({
          value: 'russian',
        }),
        options,
        handleChange,
      };
    },
  });
  </script>

<style lang="scss" scoped>
  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  select {
    width: 470px;
    height: 60px;
    font-weight: 400;    
    font-size: 20px; 
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