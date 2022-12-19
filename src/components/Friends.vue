<template>
  <h1>Список друзей</h1>
  <div class="friends">
    <ul>
      <li>
        <div class="avatar"></div>
        Никнейм
        <div class="btn-group">
          <button class="info"></button>
          <button class="delete"></button>
        </div>
      </li>
      <li>
        <div class="add"></div>
        Добавить друга
      </li>
    </ul>
  </div>
</template>

style.<style lang="scss" scoped>
    .friends {
        width: 500px;
        height: 340px;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
        border-radius: 11px;        
    }
    .friends li {
        height: 75px;
        width: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        padding: 20px;
        border-bottom: 1px solid #E0E0E0;
    }
    .add {
        background: url(/public/img/icons/contact-new-symbolic.symbolic.png) no-repeat center/30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #E0E0E0;
        margin-right: 12px;
    }
    .btn-group {
        float: right;
    }
    .btn-group button {
        height: 35px;
        width: 60px;
        border: none;
    }
    .info {
        background: url(/public/img/icons/user-info-symbolic.symbolic.png) no-repeat center/23px;
        background-color: #e6e6e6;
        border-radius: 11px 0px 0px 11px;
    }
    .info:hover {
        background-color: #bebebe;
    }
    .delete {
        background: url(/public/img/icons/action-unavailable-symbolic.symbolic.png) no-repeat center/23px;
        background-color: #ff8181;
        border-radius: 0px 11px 11px 0px;
    }
    .delete:hover {
        background-color: #ff5b5b;
    }
</style>