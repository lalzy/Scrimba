let playerSum = 0
let dealerSum = 0
var playerHand =[]
var dealerHand = []
var cardDeck = [];
var hit21 = false;
var bust = false;
let revealDealer = false
const BACKCARD = [0,0, 0, 256]
const playerDrawArea = document.querySelector(".playerCards")
const dealerDrawArea = document.querySelector(".dealerCards")

/* Make cards visible:
    Dlear only shows 1 card, other card is hidden until stand */

var SUIT = 0
var VALUE = 1
var WIDTH = 2
var HEIGHT = 3


const CLOVER = 0
const DIAMONDS = 1
const HEARTS = 2
const SPADES = 3

function reset(){
    playerHand = []
    dealerHand = []
    revealDealer = false
    cardDeck = []
    playerSum = 0
    dealerSum = 0
}

function init(){
    reset()
    cardDeck = shuffle(definecards())
    message("reset")
}

function start(){
    init()
    playerSum = getCard(playerHand)
    draw(dealerHand) // We don't want to sum up yet
    playerSum = getCard(playerHand)
    draw(dealerHand) // We don't want to sum up yet
    dealerSum = dealerHand[1][VALUE]
    if(playerSum >= 21){
        playerSum = "Blackjack!"
        won()
    }
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

function message(won){
    let message = document.getElementById("wonmessage");
    message.style.display = "block"
    if(won == "reset"){
        message.style.display = "none"
    }else if (won){
        message.innerText = "Player Wins!"
        message.style.color = "cyan"
    }else{
        message.innerHTML = "Dealer wins!"
        message.style.color = "red"
    }
}

function lose(){
    switchButtons(false)
    message(false)

}

function won(){
    switchButtons(false)
    message(true)
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
    revealDealer = true
    if(hit21){
        won()
    }else if(bust){
        lose()
    }else {
        console.clear()
        sumUpScore[dealerHand]
        // rewrite draw to be reveal.
        while(dealerSum < 21 && dealerSum < playerSum){
            dealerSum = getCard(dealerHand)
        }
        display()
        winCheck()
    }
    display()
}