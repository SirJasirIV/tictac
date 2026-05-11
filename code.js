const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const restartBtn = document.querySelector("#restartButton");
let running = false;
let currentPlayer = "X";
let winConditions = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
];
let options = ["","","","","","","","",""]
startGame();
function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    status.textContent = `${currentPlayer}'s turn`
    running = true
    
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length ; i++){
      const condition = winConditions[i];
      const firstCell = options[condition[0]];
      const secondCell = options[condition[1]];
      const thirdCell = options[condition[2]] ; 
    if(firstCell == "" || secondCell == "" || thirdCell == ""){
        continue;
    } else if(firstCell == secondCell && secondCell == thirdCell){
        roundWon = true;
        break;
    } 
}
if(roundWon){
    status.textContent = `${currentPlayer} has won!`;
    running = false;
    
} else if(!options.includes("")){
    status.textContent = "Draw!"
    running = false
} else{
    changePlayer();
}

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    status.textContent = `${currentPlayer}'s turn`
}


function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    status.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true ;
}
