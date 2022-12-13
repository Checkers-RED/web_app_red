<template>
    <div class="friends">
        <ul>
            <li>
                Никнейм
                <div class="btn-group">
                    <button class="info"><i></i></button>
                    <button class="delete"><i></i></button>
                </div>
            </li>
            <li>
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
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        padding: 20px;
        border-bottom: 1px solid #E0E0E0;
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
        background-color: #e6e6e6;
        border-radius: 11px 0px 0px 11px;
    }
    .info:hover {
        background-color: #bebebe;
    }
    .delete {
        background-color: #ff8181;
        border-radius: 0px 11px 11px 0px;
    }
    .delete:hover {
        background-color: #ff5b5b;
    }
</style>