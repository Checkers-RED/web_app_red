<template>
  <h1>Ваш ход</h1>
  <div class="desk">
    <div class="number">
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
    </div>
    <table>
      <tr>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="0"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="1"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="2"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="3"></p></td>
      </tr>
      <tr>
        <td><p class="white-piece" id="4"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="5"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="6"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="7"></p></td>
        <td class="NoPiece"></td>
      </tr>
      <tr>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="8"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="9"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="10"></p></td>
        <td class="NoPiece"></td>
        <td><p class="white-piece" id="11"></p></td>
      </tr>
      <tr>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
      </tr>
      <tr>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
        <td class="NoPiece"></td>
        <td></td>
      </tr>
      <tr>
        <td><p class="black-piece" id="12"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="13"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="14"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="15"></p></td>
        <td class="NoPiece"></td>
      </tr>
      <tr>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="16"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="17"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="18"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="19"></p></td>
      </tr>
      <tr>
        <td><p class="black-piece" id="20"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="21"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="22"></p></td>
        <td class="NoPiece"></td>
        <td><p class="black-piece" id="23"></p></td>
        <td class="NoPiece"></td>
      </tr>
    </table>
    <div class="letters">
      <p>H</p>
      <p>G</p>
      <p>F</p>
      <p>E</p>
      <p>D</p>
      <p>C</p>
      <p>B</p>
      <p>A</p>
    </div>
  </div>
</template>

<script>

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
    justify-content: center;
    align-items: center;
  }
  .number {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-left: -15px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .number p:not(:first-child) {
    margin-top: 56px;
  }
  .letters {
    position: absolute;
    top: 836px;
    display: flex;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .letters p:not(:first-child) {
    margin-left: 65px;
  }
  table {
    width: 640px;
    height: 640px;
    border: 1px solid #BEBEBE;
  }
  td {
    width: 80px;
    height: 80px;
    background-color: #bebebe;
    text-align: center;
    vertical-align: middle;
  }
  .NoPiece {
    background-color: #fff;
  }
  .black-piece {
    width: 60px;
    height: 60px;
    background-color: #000000;
    border: 1px solid #000000;
    border-radius: 50%;
  }
  .white-piece {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 50%;
  }
</style>