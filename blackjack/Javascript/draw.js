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
