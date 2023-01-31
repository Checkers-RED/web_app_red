<template>
  <h1>Ваш ход</h1>
  <div class="full-desk" :class="isWhite()">
    <div class="letters" style="transform: rotate(180deg)">
      <p v-for="Cell in horizCellsNames.slice().reverse()">{{ Cell }}</p>
    </div>
    <div class="inner-desk">
      <div class="number">
        <p v-for="Cell in vertCells.slice().reverse()">{{ Cell }}</p>
      </div>
      <div class="table-wrapper">
        <table>
          <tr v-for="Cell_v in vertCells">
            <td v-for="Cell_h in horizCells" :id="`cell-`+(vertCells.length * horizCells.length - Cell_v * 8 + Cell_h)" :class="cellClasses[vertCells.length * horizCells.length - Cell_v * 8 + Cell_h]"></td>
          </tr>
        </table>
        <table>
          <tr class="tr-dynamic" v-for="Cell_v in vertCells">
            <div v-for="Cell_h in horizCells" :id="`field-`+(vertCells.length * horizCells.length - Cell_v * 8 + Cell_h)" :class="cellsToGo[vertCells.length * horizCells.length - Cell_v * 8 + Cell_h]">
            </div>
          </tr>
        </table>
        <table>
          <tr class="tr-dynamic" v-for="Cell_v in vertCells">
            <div v-for="Cell_h in horizCells" :id="`checker-`+(vertCells.length * horizCells.length - Cell_v * 8 + Cell_h)" @click="getCheckerClick" :class="checkerClasses[vertCells.length * horizCells.length - Cell_v * 8 + Cell_h]">
            </div>
          </tr>
        </table>
      </div>
      <div class="number" style="transform: rotate(180deg)">
        <p v-for="Cell in vertCells">{{ Cell }}</p>
      </div>
    </div>
    <div class="letters">
      <p v-for="Cell in horizCellsNames">{{ Cell }}</p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import {HTTP, HTTP_game} from '@/assets/http-common.js'

export default {

  data() {

    return {
      //Множество шашек
      checkers: 
      {
      },

      //Таймер для фоновых событий
      fieldTimer: null,

      //Цвет шашек игрока
      color: "white",

      //Цвет шашек игрока текущего хода
      activeColor: "white",

      //Набор правил
      gameType: "ru",

      //Текущее состояние хода. 0 = нет выбранного поля, 1 = выбрано поле, 2 = обязательно выбрано поле
      turnStatus: 0,

      //Множество идентификаторов шашек на поле
      checkerClasses: [],

      //Переключатель цвета игровой клетки
      cellColor: false,
      //Множество полей
      cellClasses: [],

      //Множество ходов, которые можно совершить
      cellsToGo: [],
      highlightClasses: [],

      //Все дамки на поле
      queenIDs: [],

      //Вертикаль и горизонталь нажатой шашки
      clickedHoriz: -1,
      clickedVertic: -1,

      //Задаёт количество клеток игрового поля, а также их именование
      horizCellsNames: ["A", "B", "C", "D", "E", "F", "G", "H"],
      horizCells: [1, 2, 3, 4, 5, 6, 7, 8],
      vertCells: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {

    getGameInfo() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetGameInfo`, payload)
        .then(response => {
          if (response.data.rules_id == 1)
            this.gameType = "ru"
          if (response.data.rules_id == 2)
            this.gameType = "en"
          if (response.data.rules_id == 3)
            this.gameType = "tu"
          
        HTTP.post(`/UserScore`, payload)
          .then(response_second => {
            if (response.data.nick != response_second.data.white_nick) {
              this.color = "black"
            }
          })
      })
      .catch(error => {
        this.gameType = "ru"
      })
    },

    updateField() {
      //Обновление всего поля

      let current_session = Cookies.get('current_session')

      let payload = {"current_session": current_session }

      HTTP.post(`/SessionCheckers`, payload)
        .then(response => {
          this.queenIDs = []
          this.checkers = response.data
          this.setCheckerClass()
        })
    },

    //Обработчик начала хода, если ход оппонента
    turn_begin() {

      if (this.activeColor != this.color) {

        let current_session = Cookies.get('current_session')

        let payload = {"current_session": current_session }

        HTTP.post(`/${this.gameType}_turn_begin`, payload)
          .then(response => {

          })
      }
    },

    getCheckerClick() {

      let id = event.currentTarget.id

      id = parseInt(id.split('-')[1])

      let check_id = this.queenIDs.find(o => o == id)
      let isQueen = false
      
      if (id == check_id) {
        isQueen = true
      }

      const horiz = 8 - ((64 - id) % 8);
      const vertic = Math.floor((64 - id) / 8) + 1;

      let current_session = Cookies.get('current_session')

      //Если состояние не хода, то вызываем ручку, предоставляющую пользователю список ходов
      if (this.turn_status == 0) {
        let payload = { 
          "current_session": current_session, 
          "color": this.color, 
          "horiz": horiz, 
          "vertic": vertic, 
          "isQueen": isQueen }

        //Запрашиваем множество ходов у сервера
        HTTP_game.post(`/${this.gameType}_available_moves`, payload)
          .then(response => {
            this.cellsToGo = response.data
            if (this.cellsToGo.length != 0) {
              this.turn_status = 1
              this.clickedHoriz = horiz
              this.clickedVertic = vertic
            }
          })

        return
      }

      //Если состояние хода, то вызываем пакет ручек, связанных с началом ходов игроков
      if (turn_status == 1) {
        let payload = { 
          "current_session": current_session, 
          "color": this.color, 
          "horiz": this.clickedHoriz, 
          "vertic": this.clickedVertic, 
          "new_horiz": horiz, 
          "new_vertic": vertic, 
          "isQueen": isQueen }

        //Делаем ход, сохраняем координаты последнего места хода
        HTTP_game.post(`/${this.gameType}_move`, payload)
          .then(response => {
            this.cellsToGo = response.data
            if (this.cellsToGo.length != 0) {
              this.updateField()
              this.afterMove(horiz, vertic)
            }
          })
          .catch(error => {
            this.cellsToGo = []
            turn_status = 0
          })

        return
      }


      //Если состояние хода после ударного хода, то не удаляем последнее поле хода
      if (turn_status == 2) {
        let payload = { 
          "current_session": current_session, 
          "color": this.color, 
          "horiz": this.clickedHoriz, 
          "vertic": this.clickedVertic, 
          "new_horiz": horiz, 
          "new_vertic": vertic, 
          "isQueen": isQueen }

        //Делаем ход, сохраняем координаты последнего места хода
        HTTP_game.post(`/${this.gameType}_move`, payload)
          .then(response => {
            this.cellsToGo = response.data
            if (this.cellsToGo.length != 0) {
              this.updateField()
              this.afterMove(horiz, vertic)
            }
          })
          .catch(error => {
            
          })

        return
      }
    },

    afterMove(horiz, vertic) {
      //Требуется залить ячейки

      let current_session = Cookies.get('current_session')

      //Если состояние не хода, то вызываем ручку, предоставляющую пользователю список ходов
      let payload = { 
        "current_session": current_session, 
        "color": this.color, 
        "horiz": horiz, 
        "vertic": vertic }

      //Запрашиваем множество ходов у сервера
      HTTP_game.post(`/${this.gameType}_after_move`, payload)
        .then(response => {
          this.cellsToGo = response.data
          if (this.cellsToGo.length != 0) {
            this.turn_status = 2
            this.clickedHoriz = horiz
            this.clickedVertic = vertic
          }
          else {
            this.turnStatus = 0
            this.clickedHoriz = -1
            this.clickedVertic = -1
          }
        })
        .catch(error => {
          
        })
    },

    setCellColor() {
      for (let index = 0; index <= this.horizCells.length * this.vertCells.length; index++) {

        if (this.cellColor)
          this.cellClasses.push("white-cell")
        else
          this.cellClasses.push("gray-cell")

        this.cellColor = !this.cellColor

        if (index%this.horizCells.length == 0) {
          this.cellColor = !this.cellColor
        }
      }
    },

    initHighlightColor() {
      for (let index = 0; index <= this.horizCells.length * this.vertCells.length; index++) {
        this.highlightClasses.push("not-highlighted-field")
      }
    },
    setHighlightColor() {
      //Очищаем классы
      for (let index = 0; index <= this.highlightClasses.length; index++) {
        this.highlightClasses[index] = "not-highlighted-field"
      }

      //Закрашиваем нужные
      let highlight_id = 0

      for (let index = 0; index < this.cellsToGo.length; index++) {

        highlight_id = ((this.cellsToGo[index].vertic - 1) * 8 + this.cellsToGo[index].horiz)

        this.highlightClasses[highlight_id] = "highlighted-field"
      }
    },

    initCheckerClass() {
      for (let index = 0; index <= this.horizCells.length * this.vertCells.length; index++) {
        this.checkerClasses.push("null-piece")
      }
    },
    setCheckerClass() {

      //Очищаем классы
      for (let index = 0; index < this.checkerClasses.length; index++) {
        this.checkerClasses[index] = "null-piece"
      }
      console.log(this.checkers)

      //Изменяем нужные
      let checker_id = 0

      for (let index = 0; index < this.checkers.length; index++) {
        checker_id = (this.checkers[index].vertic - 1) * 8 + this.checkers[index].horiz

        try {
          if (this.checkers[index].isQueen == true) {
            this.checkerClasses[checker_id] = `queen-${this.checkers[index].color}-piece`
            continue
          }
          //console.log(`${this.checkers[checker_id].color}-piece`)

          this.checkerClasses[checker_id] = `${this.checkers[index].color}-piece`
            continue
        } catch(error) { console.log(error) }
      }
      console.log(this.checkerClasses)
    },
    isWhite() {
      if (this.color != "white")
        return "desk-rotate"
    }

  },
  beforeMount(){
    //Инициализация доски
    this.setCellColor()
    this.initHighlightColor()
    this.initCheckerClass()

    //Получаем информацию об игровом процессе
    this.getGameInfo()

    //Обновляем шашки на доске
    this.updateField()
  },
  mounted () {
    this.fieldTimer = setInterval(() => {
        this.updateField()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.fieldTimer)
  },
watch: {
  activeColor() {
    this.turn_begin()
  }
}
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1120px) {
  .number {
    font-size: 18px;
    height: 200%;
  }
  .letters {
    font-size: 18px;
    width: 95%;
  }
  .full-desk {
    width: 100%;
    height: 100%;
    max-width: 380px;
    max-height: 380px;
  }
  .inner-desk {
    width: 100%;
  }
  .table-wrapper {
    width: 340px;
    height: 340px;
  }
  .not-highlighted-field {
    width: 42.5px;
    height: 42.5px;
  }
  .highlighted-field {
    width: 42.5px;
    height: 42.5px;
  }
  .null-piece {
    width: 42.5px;
    height: 42.5px;
  }
  .white-piece {
    width: 35px;
    height: 35px;
  }
  .black-piece {
    width: 35px;
    height: 35px;
  }
  .queen-white-piece {
    width: 35px;
    height: 35px;
  }
  .queen-black-piece {
    width: 35px;
    height: 35px;
  }
}
@media screen and (min-width: 1120px) {
  .number {
    font-size: 20px;
    height: 109%;
  }
  .letters {
    font-size: 20px;
    width: 100%;
  }
  .full-desk {
    width: 700px;
    height: 700px;
  }
  .inner-desk {
    width: 100%;
  }
  .table-wrapper {
    width: 640px;
    height: 640px;
  }
  .not-highlighted-field {
    width: 79.75px;
    height: 79.75px;
  }
  .highlighted-field {
    width: 79.75px;
    height: 79.75px;
  }
  .null-piece {
    width: 79.75px;
    height: 79.75px;
  }
  .white-piece {
    width: 60px;
    height: 60px;
  }
  .black-piece {
    width: 60px;
    height: 60px;
  }
  .queen-white-piece {
    width: 60px;
    height: 60px;
  }
  .queen-black-piece {
    width: 60px;
    height: 60px;
  }
}
  p {
    margin-bottom: 0;
  }
  .number {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    flex-direction: column;
    font-weight: 400;
    line-height: 24px;
  }
  .letters {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    font-weight: 400;
    line-height: 24px;
  }


  .full-desk {
    background-color: #fff;
    border: 1px solid #000000;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }
  .inner-desk {
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: row;
    height: fit-content;
  }
  .desk-rotate {
    transform: rotate(180deg)
  }


  .table-wrapper {
    flex-shrink: 0;
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 1px solid #BEBEBE;
  }
  table {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .tr-dynamic {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width:100%;
  }


  .white-cell {
    background-color: #fff;
  }
  .gray-cell {
    background-color: #BEBEBE;
  }

  .not-highlighted-field {
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .highlighted-field {
    background-color: #FEF499;
    border: 3px solid #33CC88;
    border-radius: 3px;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }


  .null-piece {
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .white-piece {
    background-color: #fff;
    border: 2px solid #777;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
  .black-piece {
    background-color: #000000;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
  .queen-white-piece {
  background-color: red;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
  }
  .queen-black-piece {
  background-color: purple;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
  }
</style>