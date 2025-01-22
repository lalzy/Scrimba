//Copyright 101Computing.net - www.101computing.net/information-board-javascript-challenge
const rows = 4;
const cols = 20;
//Declare a new 2D array with 4 rows, 20 columns
let board = new Array(rows); 
for (var i = 0; i < rows; i++) {
  board[i] = new Array(cols); 
}

//A Function to display the board on the screen
function displayBoard(board) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (board[i][j]==null) {
        document.getElementById("cell"+i+"_"+j).innerText = " ";
      } else{
        document.getElementById("cell"+i+"_"+j).innerText = board[i][j];
      }
    }  
  }
}  

//A function to reset the board
function clearBoard() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      board[i][j]=" ";
    }
   }
   displayBoard(board);
}

//A function to retrieve a message from the end user and store the message on the board 2D array before displaying it on screen
function inputMessage() {
  let error = false
  var message = prompt("Enter a message to display on the board");
  
  //  Task solution from here:
  let row = 0
  let col = 0

  // Loop through the words
  message.split(" ").forEach((word) => {

    // sanity check
    if(word.length > 20){
      alert("too long!")
      error = true
      return;
      // next row and resets
    }else if (word.length > 20 - col){
      row++
      col = 0
    }
    if (row > 3){
      error = true
      return;
    }
    let end = col + word.length
    for(i = 0; col < end ; col++){
      board[row][col]= word[i++];
    }

    if(col < 20)
      board[row][col++] = " "
    
  });
  if(!error)
    displayBoard(board); 
}