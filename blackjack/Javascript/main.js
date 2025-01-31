var playerSum = 0
var dealerSum = 0
var playerHand =[]
var dealerHand = []
var hit21 = false;
var bust = false;
var onlyTo17 = true
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

const LOSE = 0
const WON = 1
const TIE = 2
const RESET = 3


const CLOVER = 0
const DIAMONDS = 1
const HEARTS = 2
const SPADES = 3

// Resets after game-state has ended (next-hand/turn)
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

// initialize
function init(){
    reset()
    cardDeck = shuffle(cardDeck)
    message(RESET)
}

// Starting the game function, tied to start-button
function start(){
    init()
    drawFromDeck(playerHand)
    drawFromDeck(dealerHand) // We don't want to sum up yet
    drawFromDeck(playerHand)
    drawFromDeck(dealerHand) // We don't want to sum up yet
    dealerSum = dealerHand[1][VALUE]
    playerSum = sumUpScore(playerHand)
 
    switchButtons(true)
    
    display()
}


// Functions at end-state of hand/game (usually after pressing stand)
function lose(){
	turns++
    switchButtons(false)
    message(LOSE)

}
function tie (){
    turns++
    switchButtons(false)
    message(TIE)
}
function won(){
	turns++
    switchButtons(false)
    message(WON)
}

// Hit-function tied to hit-button
function hit(){
    drawFromDeck(playerHand);
    playerSum = sumUpScore(playerHand)
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

// Checks if player won or not.
function winCheck (){
    if(dealerSum > 21){
        won()
    }else if(dealerSum == 21){
        lose()
    }else if(dealerSum == playerSum){
        tie()
    }else if(dealerSum > playerSum){
        lose()
    }else{
        won()
    }
}


// Stand function tied to stand-button
function stand(){
    revealDealer = true
    playerSum = sumUpScore(playerHand)
    dealerSum = sumUpScore(dealerHand)
    if(hit21){
        won()
    }else if(bust){
        lose()
    }else {
        sumUpScore[dealerHand]
        
        // rewrite draw to be reveal.
        let sumToStop = onlyTo17 ? 17 : 21;
        while(dealerSum <= sumToStop && dealerSum <= playerSum){

            drawFromDeck(dealerHand)
            dealerSum = sumUpScore(dealerHand)
        }
        winCheck()
    }
    display()
}
