<template>
  <h1>Ваш ход</h1>
  <div class="desk">
    <div class="desk-second">
    <div class="number">
      <p v-for="Cell in vertCells.slice().reverse()">{{ Cell }}</p>
    </div>
    <div class="table_div">
      <table>
        <tr v-for="Cell_v in vertCells">
          <td v-for="Cell_h in horizCells" :id="(Cell_v - 1) * 8 + Cell_h" class="td" :class="getCellColor()"></td>
        </tr>
      </table>
      <table>
        <tr v-for="Cell_v in vertCells">
          <td v-for="Cell_h in horizCells" :id="(Cell_v - 1) * 8 + Cell_h" :class="getCheckerClass(id)" @click="getCheckerClick(id)"></td>
        </tr>
      </table>
    </div>
  </div>
    <div class="letters">
      <p v-for="Cell in horizCellsNames">{{ Cell }}</p>
    </div>
  </div>
</template>

<script>

export default {

  data() {

    return {
      activeColor: "white", //поправить

      //Таймер по умолчанию и обратный отсчёт
      defaultTimer: 60,
      timerCount: 60,

      //Текущее состояние хода. 0 = нет выбранной шашки, 1 = выбрана шашка, 2 = обязательно выбрана шашка
      turnStatus: 0,

      //Идентификатор шашки
      lastCheckerID: 0,

      checkers: {},

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
        return "white-backing"
      }
      return "gray-backing"
    },
    getCheckerClick(id) {
      alert("text")
      //Если состояние не хода, то вызываем пакет ручек, связанных с началом ходов игроков

      //Если состояние хода, то вызываем пакет ручек, связанных с началом ходов игроков
    },

    getCheckerID() {
      this.lastCheckerID += 1;
      return this.lastCheckerID;
    },
    getCheckerClass(id) {
      //id = 8 * vertic + horiz => vertic = id div 8 + 1, horiz = id mod 8 + 1
      const vertic = Math.floor(id/8);
      const horiz = (id % 8) + 1;
    
      for (checker in this.checkers.white) {
        if (horiz == checker.horiz) {
          if (vertic == checker.vertic) {
            if (checker.isQueen == true) {
              return "queen-white-piece"
            }
            return "white-piece"
          }
        }
      }

      for (checker in this.checkers.black) {
        if (horiz == checker.horiz) {
          if (vertic == checker.vertic) {
            if (checker.isQueen == true) {
              return "queen-black-piece"
            }
            return "black-piece"
          }
        }
      }

      return "null-piece"
    }

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
  },
  //Обновление игрового поля
  timerCount: {
    handler(value) {
      if (value > 0) {
        setTimeout(() => {
          updateField()
        }, 1500);
      }
    },
    immediate: true
  }
}

</script>

<style lang="scss" scoped>
  .desk {
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
  .desk-second {
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: row;
  }
  .number {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .number p:not(:first-child) {
    margin-top: 56px;
  }
  .letters {
    display: flex;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .letters p:not(:first-child) {
    margin-left: 65px;
  }
  table {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .td {
    width: 80px;
    height: 80px;
    background-color: #bebebe;
    text-align: center;
    vertical-align: middle;
  }
  .table_div {
    position: relative;
    width: 640px;
    height: 640px;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 1px solid #BEBEBE;
  }
  .white-backing {
    background-color: #fff;
  }
  .gray-backing {
    background-color: #BEBEBE;
  }
  .null-piece {
    width: 80px;
    height: 80px;
    background-color: #bebebe;
    text-align: center;
    vertical-align: middle;
  }
  .white-piece {
    padding: 10px;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
  .black-piece {
    padding: 10px;
    width: 60px;
    height: 60px;
    background-color: #000000;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
   .queen-white-piece {
    padding: 10px;
    width: 60px;
    height: 60px;
    background-color: red;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
   }
   .queen-black-piece {
    padding: 10px;
    width: 60px;
    height: 60px;
    background-color: purple;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
   }
</style>