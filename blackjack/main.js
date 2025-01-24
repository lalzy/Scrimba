let playerSum = 0
let dealerSum = 0
var playerHand =[]
var dealerHand = []
var cardDeck = [];
var hit21 = false;
var bust = false;
const playerDrawArea = document.querySelector(".playerCards")
const dealerDrawArea = document.querySelector(".dealerCards")

/* Make cards visible:
    Dlear only shows 1 card, other card is hidden until stand
        
    
    */

/*Fisher-yates shuffle */
function shuffle(array){
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

var SUIT = 0
var VALUE = 1
var WIDTH = 2
var HEIGHT = 3


const CLOVER = 0
const DIAMONDS = 1
const HEARTS = 2
const SPADES = 3

function definecards(){
    let cardArray = []
    for(let suit = 1 ; suit <= 4 ; suit++){
        for(let card = 1 ; card <= 13 ; card++){
            cardArray.push([suit, card, (card - 1) * 48, (suit - 1) * 64])
        }
    }
    return cardArray;
}

function drawCard(card, drawArea){
    let cardImage = document.createElement('div')
    cardImage.classList.add("card")
    cardImage.style.backgroundPosition = `-${card[WIDTH]}px -${card[HEIGHT]}px`
    drawArea.appendChild(cardImage);
}

function display(){
    let cards = definecards()
    cards = shuffle(cards)

    // drawCard(cards[0], dealerDrawArea)
    // drawCard(cards[1], dealerDrawArea)
    // drawCard(cards[2], playerDrawArea)
    // drawCard(cards[3], playerDrawArea)

    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("dealerSum").innerText = dealerSum;
}

function sumUpAces(aces, sum){
    // full value cause bust
    let howMany = 0
    for(let i = 0 ; i < aces ; i++){
        if ((11 + sum) <= 21){
            howMany++
        }
    }
    console.log(`${aces} / ${howMany} / ${sum}`)
    aces -= howMany
    return (sum + (11 * howMany) + aces)
}

function sumUpScore(hand){
    let sum = 0
    let aces = 0
    hand.forEach(card => {
        if(card[VALUE] == 1){
            aces++
        }else{
            sum += card[VALUE]
        }
    })
    console.log("sum org = " + sum)
    if(aces > 0){
        sum = sumUpAces(aces, sum)
    }
    console.log("sum = " + sum)
    return sum
}

/**Rewrite to draw cards and sum up instead. */
function draw(hand){
    let currentCard = cardDeck.pop()

    if(currentCard[VALUE] > 10){
        currentCard[VALUE] == 10
    }

    let currentSum = sumUpScore(hand)

    hand.push(currentCard)
}

function drawCards(){

}

function getCard(hand){
    draw(hand)
    drawCards()
    return sumUpScore(hand)
}

function reset(){
    playerHand = []
    dealerHand = []
    cardDeck = []
    playerSum = 0
    dealerSum = 0
}

function init(){
    reset()
    cardDeck = shuffle(definecards())
    document.getElementById("wonmessage").style.display = "none"
    document.getElementById("dealerwonmessage").style.display = "none"
}

function start(){
    init()
    playerSum = getCard(playerHand)
    dealerSum = getCard(dealerHand)
    playerSum = getCard(playerHand)
    if(playerSum >= 21){
        playerSum = "Blackjack!"
        won()
    }
    draw(dealerHand) // We don't want to sum up yet
    switchButtons(true)
    display()
}

function changeState(element, on){
    document.getElementById(element).style.display = on ? "inline" : "none"
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

function lose(){
    switchButtons(false)
    document.getElementById("dealerwonmessage").style.display = "block"
}

function won(){
    switchButtons(false)
    document.getElementById("wonmessage").style.display = "block"
}


function hit(){
    playerSum = getCard(playerHand);
    if(playerSum > 21){
        bust = true
       /* deactivate hit */ 
    }else if (playerSum == 21){
        hit21 = true
    }
    display()

    if (playerSum > 20){
        stand()
        return
    }
}

function winCheck (){
    if(dealerSum > 21){
        won()
    }else if(dealerSum == 21){
        lose()
    }else if(dealerSum > playerSum){
        lose()
    }
}

function stand(){
    if(hit21){
        won()
    }else if(bust){
        lose()
    }else {
        dealerSum += dealerHand[dealerHand.length - 1][VALUE]
        // rewrite draw to be reveal.
        while(dealerSum < 21 && dealerSum < playerSum){
            dealerSum = getCard(dealerHand)
        }
        display()
        winCheck()
    }
    display()
}