<template>
  <p>Набор игровых правил</p>
    <a-select
      v-model:value="value"
      label-in-value
      style="width: 100%"
      :options="options"
      @change="handleChange"
    ></a-select>
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
  </style>