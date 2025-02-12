function display(){
    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("dealerSum").innerText = dealerSum;
    drawCards()
}

function drawCard(card, drawArea){
    let cardImage = document.createElement('div')
    cardImage.classList.add("card")
    cardImage.style.backgroundPosition = `-${card[WIDTH]}px -${card[HEIGHT]}px`
    drawArea.appendChild(cardImage);
}

function drawCards(){
    dealerDrawArea.innerHTML = ""
    
    let index = 0
    dealerHand.forEach(card=>{
        if (!revealDealer && index == 0){
            drawCard(BACKCARD, dealerDrawArea)
        }else{
            drawCard(card,dealerDrawArea)
        }
        index++
    })
    
    playerDrawArea.innerHTML = ""
    playerHand.forEach(card=>{
        drawCard(card, playerDrawArea)
    })
}


function changeState(element, on){
    // document.getElementById(element).style.display = on ? "inline" : "none"
    document.getElementById(element).style.visibility = on ? "visible" : "hidden"
}

function switchButtons(isRunning){
    if (isRunning){
        changeState("hitButton", true)
        changeState("standButton", true)
        changeState("startButton", false)
    }else{
        changeState("hitButton", false)
        changeState("standButton", false)
        changeState("startButton", true)
    }
}


function message(status){
    let message = document.getElementById("wonmessage");
    message.style.visibility = "visible"
    switch(status){
        case LOSE:
            message.innerText = "Player Lose!"
            message.style.color = "red"
            break;
        case WON:
            message.innerText = "Player Wins!"
            message.style.color = "cyan"
            break;
        case TIE:
            message.innerText = "Push!"
            message.style.color = "orange"
            break;
        case RESET:
            message.style.visibility = "hidden"
            break;
        default:
    }

    if(won == "reset"){
        message.style.visibility = "hidden"
    }else if (won){
    }else{
        message.innerHTML = "Dealer wins!"
        message.style.color = "red"
    }
}
