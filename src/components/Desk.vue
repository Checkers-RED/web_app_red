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
            <td v-for="Cell_h in horizCells" :id="`cell-`+((Cell_v - 1) * 8 + Cell_h)" :class="getCellColor()"></td>
          </tr>
        </table>
        <table>
          <tr class="tr-dynamic" v-for="Cell_v in vertCells">
            <div v-for="Cell_h in horizCells" :id="`field-`+((Cell_v - 1) * 8 + Cell_h)" :class="getHighlightColor((Cell_v - 1) * 8 + Cell_h)">
            </div>
          </tr>
        </table>
        <table>
          <tr class="tr-dynamic" v-for="Cell_v in vertCells">
            <div v-for="Cell_h in horizCells" :id="`checker-`+((Cell_v - 1) * 8 + Cell_h)" @click="getCheckerClick" :class="getCheckerClass((Cell_v - 1) * 8 + Cell_h)">
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

      //Идентификатор клетки
      lastCellID: 0,

      //Номер игровой клетки в строке и переключатель цвета игровой клетки
      numOfCellInRow: 0,
      CellColor: false,

      //Идентификатор шашки
      lastCheckerID: 0,

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

      //Множество ходов, которые можно совершить
      cellsToGo: [],

      //Все дамки на поле
      queensOnField: [],

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
          this.queensOnField = []
          this.checkers = response.data
          console.log(JSON.stringify(this.checkers))
          console.log(JSON.stringify(response.data))
          console.log(JSON.stringify(response.data.white))
          console.log(JSON.stringify(response.data.black))
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

      let check_id = this.queensOnField.find(o => o == id)
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

    getCellID() {
      this.lastCellID += 1;
      return this.lastCellID;
    },
    getCellColor() {
      this.CellColor = !this.CellColor

      if (this.numOfCellInRow == this.horizCells.length) {
        this.numOfCellInRow = 0
        this.CellColor = !this.CellColor
      }
      
      this.numOfCellInRow += 1

      if (this.CellColor){ 
        return "white-cell"
      }
      return "gray-cell"
    },

    getHighlightColor(id) {
      const horiz = Math.floor((64 - id) / 8) + 1;
      const vertic = 8 - ((64 - id) % 8);
      
      for (let index = 0; index < this.cellsToGo.length; index++) {
        if (horiz == this.cellsToGo[index].horiz) {
          if (vertic == this.cellsToGo[index].vertic) {
            return "highlighted-field"
          }
        }
      }

      return "not-highlighted-field"
    },

    getCheckerID() {
      this.lastCheckerID += 1;
      return this.lastCheckerID;
    },
    getCheckerClass(id) {

      const horiz = 8 - ((64 - id) % 8);
      const vertic = Math.floor((64 - id) / 8) + 1;

      try {
        for (let index = 0; index < this.checkers.length; index++) {
          if (horiz == this.checkers[index].horiz) {
            if (vertic == this.checkers[index].vertic) {

              if (this.checkers[index].color == "white") {
                if (this.checkers[index].isQueen == true) {
                  this.queensOnField.push(id)
                  return "queen-white-piece"
                }
                return "white-piece"
              }

              if (this.checkers[index].color == "black") {
                if (this.checkers[index].isQueen == true) {
                  this.queensOnField.push(id)
                  return "queen-black-piece"
                }
                return "black-piece"
              }
              
            }

          }
        }

        return "null-piece"

      } catch(error) {
        return "null-piece"
      }

    },
    isWhite() {
      if (this.color != "white")
        return "desk-rotate"
    }

  },
  beforeMount(){
    this.updateField()
    this.getGameInfo()
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
  p {
    margin-bottom: 0;
  }
  .number {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    flex-direction: column;
    height: 109%;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .letters {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }


  .full-desk {
    width: 700px;
    height: 700px;
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
    width: 100%;
    height: fit-content;
  }
  .desk-rotate {
    transform: rotate(180deg)
  }


  .table-wrapper {
    flex-shrink: 0;
    position: relative;
    width: 640px;
    height: 640px;
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
    width: 79.75px;
    height: 79.75px;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .highlighted-field {
    width: 79.75px;
    height: 79.75px;
    background-color: #FEF499;
    border: 3px solid #33CC88;
    border-radius: 3px;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }


  .null-piece {
    width: 79.75px;
    height: 79.75px;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .white-piece {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 2px solid #777;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
  .black-piece {
    width: 60px;
    height: 60px;
    background-color: #000000;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
  .queen-white-piece {
  width: 60px;
  height: 60px;
  background-color: red;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
  }
  .queen-black-piece {
  width: 60px;
  height: 60px;
  background-color: purple;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;
  }
</style>