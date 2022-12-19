const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]

]

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name: '',
        symbol: 'X'
    }
    ,
    {
        name: '',
        symbol: 'O'
    }
]

const playerConfigOverlayElement = document.getElementById('config-overlay')
const backdropElement = document.getElementById('backdrop')

const formElement = document.querySelector('form')
const inputElement = document.getElementById('playername')
const errorOutputElement = document.getElementById('config-errors')

const gameAreaElement = document.getElementById('active-game')

const activePlayerNameElement = document.getElementById('active-player-name')

const gameOverElement = document.getElementById('game-over')
const winnerNameElement = document.getElementById('winner-name')

const editPlayer1BtnElement = document.getElementById('edit-player-1-btn')
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn')


const cancelBtnElement = document.getElementById('cancel-config-btn')
const acceptBtnElement = document.getElementById('accept-config-btn')

const startNewGameBtnElement = document.getElementById('start-new-game')

const gameBoardElement = document.getElementById('game-board')
const gameFieldElements = document.querySelectorAll('#game-board li')

editPlayer1BtnElement.addEventListener('click', openPlayerConfig)
editPlayer2BtnElement.addEventListener('click', openPlayerConfig)

cancelBtnElement.addEventListener('click', closePlayerConfig)
backdropElement.addEventListener('click', closePlayerConfig)

formElement.addEventListener('submit', savePlayerConfig)

startNewGameBtnElement.addEventListener('click', startNewGame)

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField)
}