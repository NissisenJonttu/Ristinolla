function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid
    playerConfigOverlayElement.style.display = 'block'
    backdropElement.style.display = 'block'
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none'
    backdropElement.style.display = 'none'
    formElement.firstElementChild.classList.remove('error')
    errorOutputElement.textContent = ""
    inputElement.value = ''
}

function savePlayerConfig(event) {
    event.preventDefault()  //estää lähettämästä käskyä serverille.. hyväksy nappi ei tee mitään
    const formData = new FormData(event.target)
    const enteredPlayername = formData.get('playername').trim()
    
    if (!enteredPlayername) {
        event.target.firstElementChild.classList.add('error') //tarttuu ensimmäiseen diviin "formissa", lisää luokan 'error'
        errorOutputElement.textContent = "Syötä oikea nimi!"
        return
    }

    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data')
    updatedPlayerDataElement.children[1].textContent = enteredPlayername

    players[editedPlayer -1].name = enteredPlayername

    closePlayerConfig()
}