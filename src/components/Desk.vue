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
        <td>
          <p class="white-piece" id="0" ></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="1"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="2"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="3"></p>
        </td>
      </tr>
      <tr>
        <td>
          <p class="white-piece" id="4"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="5"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="6"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="7"></p>
        </td>
        <td class="NoPiece"></td>
      </tr>
      <tr>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="8"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="9"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="10"></p>
        </td>
        <td class="NoPiece"></td>
        <td>
          <p class="white-piece" id="11"></p>
        </td>
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
//import { ref } from 'vue';
  export default {
    setup() {
      const board = [
        null, 0, null, 1, null, 2, null, 3,
        4, null, 5, null, 6, null, 7, null,
        null, 8, null, 9, null, 10, null, 11,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        12, null, 13, null, 14, null, 15, null,
        null, 16, null, 17, null, 18, null, 19,
        20, null, 21, null, 22, null, 23, null
      ]
      let findPiece = function (pieceId) {
          let parsed = parseInt(pieceId);
          return board.indexOf(parsed);
      };

      // DOM referenes
      const cells = document.querySelectorAll("td");
      let redsPieces = document.querySelectorAll(".white-piece");
      let blacksPieces = document.querySelectorAll(".black-piece")
      const redTurnText = document.querySelectorAll(".red-turn-text");
      const blackTurntext = document.querySelectorAll(".black-turn-text");
      const divider = document.querySelector("#divider")

      // player properties
      let turn = true;
      let redScore = 12;
      let blackScore = 12;
      let playerPieces;

      // selected piece properties
      let selectedPiece = {
          pieceId: -1,
          indexOfBoardPiece: -1,
          isKing: false,
          seventhSpace: false,
          ninthSpace: false,
          fourteenthSpace: false,
          eighteenthSpace: false,
          minusSeventhSpace: false,
          minusNinthSpace: false,
          minusFourteenthSpace: false,
          minusEighteenthSpace: false
      }

      /*---------- Event Listeners ----------*/

      // initialize event listeners on pieces
      function givePiecesEventListeners() {
          if (turn) {
              for (let i = 0; i < redsPieces.length; i++) {
                  redsPieces[i].addEventListener("click", getPlayerPieces);
              }
          } else {
              for (let i = 0; i < blacksPieces.length; i++) {
                  blacksPieces[i].addEventListener("click", getPlayerPieces);
              }
          }
      }

      /*---------- Logic ----------*/

      // holds the length of the players piece count
      function getPlayerPieces() {
          if (turn) {
              playerPieces = redsPieces;
          } else {
              playerPieces = blacksPieces;
          }
          removeCellonclick();
          resetBorders();
      }

      // removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
      function removeCellonclick() {
          for (let i = 0; i < cells.length; i++) {
              cells[i].removeAttribute("onclick");
          }
      }

      // resets borders to default
      function resetBorders() {
          for (let i = 0; i < playerPieces.length; i++) {
              playerPieces[i].style.border = "1px solid white";
          }
          resetSelectedPieceProperties();
          getSelectedPiece();
      }

      // resets selected piece properties
      function resetSelectedPieceProperties() {
          selectedPiece.pieceId = -1;
          selectedPiece.pieceId = -1;
          selectedPiece.isKing = false;
          selectedPiece.seventhSpace = false;
          selectedPiece.ninthSpace = false;
          selectedPiece.fourteenthSpace = false;
          selectedPiece.eighteenthSpace = false;
          selectedPiece.minusSeventhSpace = false;
          selectedPiece.minusNinthSpace = false;
          selectedPiece.minusFourteenthSpace = false;
          selectedPiece.minusEighteenthSpace = false;
      }

      // gets ID and index of the board cell its on
      function getSelectedPiece() {
          selectedPiece.pieceId = parseInt(event.target.id);
          selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
          isPieceKing();
      }

      // checks if selected piece is a king
      function isPieceKing() {
          if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
              selectedPiece.isKing = true;
          } else {
              selectedPiece.isKing = false;
          }
          getAvailableSpaces();
      }

      // gets the moves that the selected piece can make
      function getAvailableSpaces() {
          if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
              cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
              selectedPiece.seventhSpace = true;
          }
          if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
              cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
              selectedPiece.ninthSpace = true;
          }
          if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
              cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
              selectedPiece.minusSeventhSpace = true;
          }
          if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
              cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
              selectedPiece.minusNinthSpace = true;
          }
          checkAvailableJumpSpaces();
      }

      // gets the moves that the selected piece can jump
      function checkAvailableJumpSpaces() {
          if (turn) {
              if (board[selectedPiece.indexOfBoardPiece + 14] === null 
              && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
                  selectedPiece.fourteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece + 18] === null 
              && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
                  selectedPiece.eighteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece - 14] === null 
              && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                  selectedPiece.minusFourteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece - 18] === null 
              && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                  selectedPiece.minusEighteenthSpace = true;
              }
          } else {
              if (board[selectedPiece.indexOfBoardPiece + 14] === null 
              && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
                  selectedPiece.fourteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece + 18] === null 
              && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
                  selectedPiece.eighteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece - 7] < 12 
              && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
                  selectedPiece.minusFourteenthSpace = true;
              }
              if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
              && board[selectedPiece.indexOfBoardPiece - 9] < 12
              && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
                  selectedPiece.minusEighteenthSpace = true;
              }
          }
          checkPieceConditions();
      }

      // restricts movement if the piece is a king
      function checkPieceConditions() {
          if (selectedPiece.isKing) {
              givePieceBorder();
          } else {
              if (turn) {
                  selectedPiece.minusSeventhSpace = false;
                  selectedPiece.minusNinthSpace = false;
                  selectedPiece.minusFourteenthSpace = false;
                  selectedPiece.minusEighteenthSpace = false;
              } else {
                  selectedPiece.seventhSpace = false;
                  selectedPiece.ninthSpace = false;
                  selectedPiece.fourteenthSpace = false;
                  selectedPiece.eighteenthSpace = false;
              }
              givePieceBorder();
          }
      }

      // gives the piece a green highlight for the user (showing its movable)
      function givePieceBorder() {
          if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
          || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
              document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
              giveCellsClick();
          } else {
              return;
          }
      }

      // gives the cells on the board a 'click' bassed on the possible moves
      function giveCellsClick() {
          if (selectedPiece.seventhSpace) {
              cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", makeMove(7));
          }
          if (selectedPiece.ninthSpace) {
              cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", makeMove(9));
          }
          if (selectedPiece.fourteenthSpace) {
              cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", makeMove(14));
          }
          if (selectedPiece.eighteenthSpace) {
              cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", makeMove(18));
          }
          if (selectedPiece.minusSeventhSpace) {
              cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", makeMove(-7));
          }
          if (selectedPiece.minusNinthSpace) {
              cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", makeMove(-9));
          }
          if (selectedPiece.minusFourteenthSpace) {
              cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", makeMove(-14));
          }
          if (selectedPiece.minusEighteenthSpace) {
              cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", makeMove(-18));
          }
      }

      /* v when the cell is clicked v */

      // makes the move that was clicked
      function makeMove(number) {
          document.getElementById(selectedPiece.pieceId).remove();
          cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
          if (turn) {
              if (selectedPiece.isKing) {
                  cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`;
                  redsPieces = document.querySelectorAll("p");
              } else {
                  cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
                  redsPieces = document.querySelectorAll("p");
              }
          } else {
              if (selectedPiece.isKing) {
                  cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece king" id="${selectedPiece.pieceId}"></p>`;
                  blacksPieces = document.querySelectorAll("span");
              } else {
                  cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
                  blacksPieces = document.querySelectorAll("span");
              }
          }

          let indexOfPiece = selectedPiece.indexOfBoardPiece
          if (number === 14 || number === -14 || number === 18 || number === -18) {
              changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
          } else {
              changeData(indexOfPiece, indexOfPiece + number);
          }
      }

      // Changes the board states data on the back end
      function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
          board[indexOfBoardPiece] = null;
          board[modifiedIndex] = parseInt(selectedPiece.pieceId);
          if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
              document.getElementById(selectedPiece.pieceId).classList.add("king")
          }
          if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
              document.getElementById(selectedPiece.pieceId).classList.add("king");
          }
          if (removePiece) {
              board[removePiece] = null;
              if (turn && selectedPiece.pieceId < 12) {
                  cells[removePiece].innerHTML = "";
                  blackScore--
              }
              if (turn === false && selectedPiece.pieceId >= 12) {
                  cells[removePiece].innerHTML = "";
                  redScore--
              }
          }
          resetSelectedPieceProperties();
          removeCellonclick();
          removeEventListeners();
      }

      // removes the 'onClick' event listeners for pieces
      function removeEventListeners() {
          if (turn) {
              for (let i = 0; i < redsPieces.length; i++) {
                  redsPieces[i].removeEventListener("click", getPlayerPieces);
              }
          } else {
              for (let i = 0; i < blacksPieces.length; i++) {
                  blacksPieces[i].removeEventListener("click", getPlayerPieces);
              }
          }
          checkForWin();
      }

      // Checks for a win
      function checkForWin() {
          if (blackScore === 0) {
              divider.style.display = "none";
              for (let i = 0; i < redTurnText.length; i++) {
                  redTurnText[i].style.color = "black";
                  blackTurntext[i].style.display = "none";
                  redTurnText[i].textContent = "RED WINS!";
              }
          } else if (redScore === 0) {
              divider.style.display = "none";
              for (let i = 0; i < blackTurntext.length; i++) {            
                  blackTurntext[i].style.color = "black";
                  redTurnText[i].style.display = "none";
                  blackTurntext[i].textContent = "BLACK WINS!";
              }
          }
          changePlayer();
      }

      // Switches players turn
      function changePlayer() {
          if (turn) {
              turn = false;
              for (let i = 0; i < redTurnText.length; i++) {
                  redTurnText[i].style.color = "lightGrey";
                  blackTurntext[i].style.color = "black";
              }
          } else {
              turn = true;
              for (let i = 0; i < blackTurntext.length; i++) {
                  blackTurntext[i].style.color = "lightGrey";
                  redTurnText[i].style.color = "black";
              }
          }
          givePiecesEventListeners();
      }

      givePiecesEventListeners();
    },

    /*methods: {
      givePiecesEventListeners() {
        if (turn) {
          for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListeners("click", getPlayerPieces);
          } 
        } else {
            for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListeners("click", getPlayerPieces);
          }
        }       
      },

      getPlayerPieces() {
        if (turn) {
          playerPieces = redPieces;
        } else {
          playerPieces = blackPieces;
        }
        removeCellonclick();
        resetBorders();
      },

      removeCellonclick() {
        for (let i = 0; i < cells.length; i++) {
          cells[i].removeAttribute("onclick");
        }
      },

      resetBorders() {
        for (let i = 0; i < playerPieces.length; i++) {
          playerPieces[i].style.border = "1px solid #E0E0E0";
        }
        resetSelectedPieceProperties();
        getSelectedPiece();
      },

      resetSelectedPieceProperties() {
        selectedPiece.pieceId = -1;
        selectedPiece.pieceId = -1;
      },

      getSelectedPiece() {
        selectedPiece.pieceId = parseInt(event.target.id);
        selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
      },

      giveCellsClick() {
        for (let i = 0; i < cells.length; i++) {
          cells[i].setAttribute("onclick", "makeMove(i)")
        }
      },

      makeMove(number) {
        document.getElementById(selectedPiece.pieceId).remove();
        cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
        if (turn) {
          cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
          whitePieces = document.querySelectorAll(".white-piece");
        } else {
          cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
          whitePieces = document.querySelectorAll(".black-piece");
        }
      },      
    } */
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
    top: 820px;
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
    margin: auto;
    cursor: pointer;
  }
  .white-piece {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
  }
   .king.white-piece {
    background-color: red;
   }
   .king.black-piece {
    background-color: purple;
   }
</style>