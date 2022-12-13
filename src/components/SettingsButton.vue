<template>
    <a-dropdown :trigger="['click']" placement="topRight">
      <button>
        <i><setting-filled/></i>
      </button>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            Статус:
          </a-menu-item>
          <a-menu-item>
            Помощь
          </a-menu-item>  
          <a-menu-item>
            Выйти из учетной записи
          </a-menu-item>          
        </a-menu>
      </template>
    </a-dropdown>
</template>

<script>
    import { defineComponent } from 'vue';
    import { SettingFilled} from '@ant-design/icons-vue';

export default defineComponent({
  data: () => ({
    isVisible: false,
    isVisible2: false,
    show: false,
  }),
  components: {
    SettingFilled
  },  
});
</script>

<style lang="scss" scoped>
    button {
        float: right;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
    }
    button:hover {
        background-color: #bebebe;
    }
</style>