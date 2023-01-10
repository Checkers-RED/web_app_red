<template>
  <a-dropdown :trigger="['click']" placement="topRight">
    <button>        
    </button>
    <template #overlay>
      <ul>
        <li>
          <span class="status"></span>
          Статус:
        </li>
        <li>
          <span class="help"></span>
          Помощь
        </li>  
        <li>
          <span class="exit"></span>
          Выйти из учетной записи
        </li>          
      </ul>
    </template>
  </a-dropdown>
</template>

<script>
  import { defineComponent } from 'vue';
    
export default defineComponent({
  data: () => ({
    
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
    border: 1px solid #E0E0E0;        
    background: url(/public/img/icons/applications-system-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  button:hover {
    background-color: #bebebe;
  }
  ul {
    width: 340px;
    height: 178px;
    border: 1px solid #E0E0E0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    background-color: #fff;
  }
  li {
    height: 60px;
    margin-left: -40px;
    padding: 15px 10px;
    list-style: none;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #E0E0E0;
  }
  span {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    margin-right: 12px;
  }
  .help {
    background: url(/public/img/icons/help-about-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
  .exit {
    background: url(/public/img/icons/application-exit-symbolic.symbolic.png) no-repeat center/25px;
    background-color: #e6e6e6;
  }
</style>