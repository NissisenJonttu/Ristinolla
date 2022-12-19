function resetGameStatus() {
    gameIsOver = false;
    activePlayer = 0
    currentRound = 1
    gameOverElement.firstElementChild.innerHTML = '<span id="winner-name">Pelaajan Nimi</span> Voitti Pelin!'
    gameOverElement.style.display = 'none'

    let gameBoardIndex = 0
    for (let i = 0; i < 3; i++) {
        for (let j= 0; j < 3; j++) {
            gameData[i][j] = 0                                                          //gameData "Näkymättömään" pelikenttään asetetaan arvo 0 joka ruutuun
            gameBoardElement.children[gameBoardIndex].textContent = ''                  //asettaa elementtiin '' tyhjän
            gameBoardElement.children[gameBoardIndex].classList.remove('disabled')      //disabled luokka poistuu elementistä, pelikenttään voi taas klikata X tai O
            gameBoardIndex++
        }
    }
}

function startNewGame() {
    if (players[0].name ==='' || players[1].name ===''){                                // jos molempien pelaajien nimiä ei ole alussa annettu
        alert("Syötä molempien pelaajien nimet!")                                       // tulee alert
        return
    }

    resetGameStatus()                                                                   // Nollaa pelialustan

    gameAreaElement.style.display = 'block'                                             // Pelialusta muuttuu näkyväksi
    activePlayerNameElement.textContent = players[activePlayer].name                    // Näyttää kumman pelaajan vuoro on aloittaa
}



function switchPlayer() {
    if (activePlayer === 0){                                                            // vaihtaa vuoroa joko 0 tai 1
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }

    activePlayerNameElement.textContent = players[activePlayer].name                    // Näyttää kumman pelaajan vuoro on aloittaa
}

function selectGameField(event) {

    const selectedField = event.target
    const selectedColumn = selectedField.dataset.col - 1
    const selectedRow = selectedField.dataset.row - 1

    if (gameData[selectedRow][selectedColumn] > 0 || gameIsOver) {                                    // tarkistaa onko gameData taulussa jo arvo 1 tai 2
        return
    }

    selectedField.textContent = players[activePlayer].symbol
    selectedField.classList.add('disabled')


    gameData[selectedRow][selectedColumn] = activePlayer + 1

    const winnerID = checkForGameOver()
    
    if(winnerID !== 0) {
        endGame(winnerID)                               // suoritetaan endGame joka avaa voitto/tasapeli ikkunan sen mukaan palauttaako
    }                                                   // checkForGameOver() 1(pelaaja 1) vai 2(pelaaja 2) vai -1(tasapeli).

    currentRound++                                      
    switchPlayer()
}

function checkForGameOver() {
    for (let i=0; i<3; i++){
        if (gameData[i][0] > 0 &&                       //vaaka rivien tarkistus
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
            ) {
            return gameData[i][0]
        }
    }

    for (let i=0; i<3; i++){
        if (gameData[0][i] > 0 &&                       //pysty rivien tarkistus
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
            ) {
            return gameData[0][i]
        }
    }

    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {             //vino tarkistus vasemmalta ylhäältä oikealle alas
        return gameData[0][0]
    }

    if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {             //vino tarkistus vasemmalta alhaalta oikealle ylös
        return gameData[2][0]
    }

    if (currentRound === 9){
        return -1
    }

    return 0;
}

function endGame(winnerID) {
    gameIsOver = true;
    gameOverElement.style.display = 'block'

    if (winnerID > 0) {
        const winnerName = players[winnerID -1].name
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName
    }else{
        gameOverElement.firstElementChild.textContent = 'Tasapeli!'
    }
    
}