<template>
    <a-dropdown :trigger="['click']" placement="topRight">
      <button>        
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
    
export default defineComponent({
  data: () => ({
    isVisible: false,
    isVisible2: false,
    show: false,
  }),
  components: {
    
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
        background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
        background-color: #e6e6e6;
    }
    button:hover {
        background-color: #bebebe;
    }
</style>