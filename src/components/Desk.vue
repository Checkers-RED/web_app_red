<template>
  <h1>Ваш ход: {{ timerCount }}</h1>
  <div class="full-desk">
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
import {HTTP} from '@/assets/http-common.js'

export default {

  data() {

    return {
      activeColor: "white", //поправить

      //Таймер по умолчанию и обратный отсчёт
      defaultTimer: 60,
      timerCount: 60,

      //Таймер для фоновых событий
      fieldTimer: null,

      //Набор правил
      gameType: "ru",

      //Текущее состояние хода. 0 = нет выбранного поля, 1 = выбрано поле, 2 = обязательно выбрано поле
      turnStatus: 0,

      //Идентификатор шашки
      lastCheckerID: 0,

      //Множество ходов, которые можно совершить
      cellsToGo: {},

      //Множество шашек
      checkers: 
      {
          "white":
          [
              {
                  "horiz": 1,
                  "vertic": 1,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },
              {
                  "horiz": 1,
                  "vertic": 3,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 1,
                  "vertic": 5,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 1,
                  "vertic": 7,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 2,
                  "vertic": 2,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 2,
                  "vertic": 4,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 2,
                  "vertic": 6,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 2,
                  "vertic": 8,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 3,
                  "vertic": 1,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 3,
                  "vertic": 3,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 3,
                  "vertic": 5,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 3,
                  "vertic": 7,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              }
          ],

          "black":
          [
              {
                  "horiz": 6,
                  "vertic": 2,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },
              {
                  "horiz": 6,
                  "vertic": 4,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 6,
                  "vertic": 6,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 6,
                  "vertic": 8,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 7,
                  "vertic": 1,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 7,
                  "vertic": 3,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 7,
                  "vertic": 5,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 7,
                  "vertic": 7,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 8,
                  "vertic": 2,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 8,
                  "vertic": 4,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 8,
                  "vertic": 6,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              },        {
                  "horiz": 8,
                  "vertic": 8,
                  "isQueen": false,
                  "canBeat": false,
                  "isBeaten": false
              }
          ]
      },

      //Идентификатор клетки
      lastCellID: 0,

      //Номер игровой клетки в строке и переключатель цвета игровой клетки
      numOfCellInRow: 0,
      CellColor: false,

      //Задаёт количество клеток игрового поля, а также их именование
      horizCellsNames: ["A", "B", "C", "D", "E", "F", "G", "H"],
      horizCells: [1, 2, 3, 4, 5, 6, 7, 8],
      vertCells: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    updateField() {
      //Обновление всего поля
      //Составляем запрос с помощью axios
      //Записываем результат в checkers
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
    getCheckerClick() {
      alert(event.currentTarget.id)
      //Если состояние не хода, то вызываем пакет ручек, связанных с началом ходов игроков

      //Если состояние хода, то вызываем пакет ручек, связанных с началом ходов игроков
    },

    getHighlightColor(id) {
      const horiz = Math.floor((64 - id) / 8) + 1;
      const vertic = 8 - ((64 - id) % 8);
      if (id == 34 || id == 43 || id == 36) {
        return "highlighted-field"
      }


      return "not-highlighted-field"
    },

    getCheckerID() {
      this.lastCheckerID += 1;
      return this.lastCheckerID;
    },
    getCheckerClass(id) {

      const horiz = Math.floor((64 - id) / 8) + 1;
      const vertic = 8 - ((64 - id) % 8);
    
      for (let index = 0; index < this.checkers.white.length; index++) {
        if (horiz == this.checkers.white[index].horiz) {
          if (vertic == this.checkers.white[index].vertic) {
            if (this.checkers.white[index].isQueen == true) {
              return "queen-white-piece"
            }
            return "white-piece"
          }
        }
      }

      for (let index = 0; index < this.checkers.black.length; index++) {
        if (horiz == this.checkers.black[index].horiz) {
          if (vertic == this.checkers.black[index].vertic) {
            if (this.checkers.black.isQueen == true) {
              return "queen-black-piece"
            }
            return "black-piece"
          }
        }
      }

      return "null-piece"
    },

    getGameInfo() {
      let current_session = Cookies.get('current_session')
      let payload = {"current_session": current_session}
      
      HTTP.post(`/GetGameInfo`, payload)
        .then(response => {
          if(response.data.rules_id == 1)
            this.gameType = "ru"
          if (response.data.rules_id == 2)
            this.gameType = "en"
          if (response.data.rules_id == 3)
            this.gameType = "tu"
          this.defaultTimer = response.data.move_time
          this.timerCount = this.defaultTimer
      })
      .catch(error => {
        this.gameType = "ru"
        this.defaultTimer = 60,
        this.timerCount = 60
      })
    }

  },
  beforeMount(){
    this.updateField()
    this.getGameInfo()
  },
  mounted: function () {
    this.fieldTimer = setInterval(() => {
      this.updateField()
    }, 1500)
  },
  beforeDestroy() {
    clearInterval(this.fieldTimer)
  },
  watch: {
    //Обратный отсчёт
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true
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