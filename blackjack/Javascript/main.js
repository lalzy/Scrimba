var playerSum = 0
var dealerSum = 0
var playerHand =[]
var dealerHand = []
var hit21 = false;
var bust = false;
var revealDealer = false
const BACKCARD = [0,0, 0, 256]
const playerDrawArea = document.querySelector(".playerCards")
const dealerDrawArea = document.querySelector(".dealerCards")
var turns = 0
var maxturns = 5
var deckAmount = 1
var cardDeck = definecards()

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
    hit21 = false;
    bust = false;
    revealDealer = false
    playerSum = 0
    dealerSum = 0
	if (turns >= maxturns){
		cardDeck = definecards()
		turns = 0
	}
}

function init(){
    reset()
    cardDeck = shuffle(cardDeck)
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
    }else{
      switchButtons(true)
    }
    display()
}


function lose(){
	turns++
    switchButtons(false)
    message(false)

}

function won(){
	turns++
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
    }else if(dealerSum >= playerSum){
        lose()
    }else{
        won()
    }
}
function stand(){
    revealDealer = true
    dealerSum = sumUpScore(dealerHand)
    if(hit21){
        won()
    }else if(bust){
        lose()
    }else {
        console.clear()
        sumUpScore[dealerHand]
        // rewrite draw to be reveal.
        while(dealerSum < 21 && dealerSum < playerSum){
console.log("in loop")
            dealerSum = getCard(dealerHand)
        }
        winCheck()
    }
    display()
}
