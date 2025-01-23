
// cards.sort((a, b)=>{return Math.random()})

const suit = 0
const value = 1

// Todo: Create deck
// TODO: Create shuffle

function initialize (){
    CreateDeck()
    playerHand = []
    dealerHand = []
}


var playerHand = []
var dealerhand = []

function draw(amount, array){
    for(let i = 0; i < amount; i++){
        array.push(cards.pop())
    }

    return array;
}

let won = false

function sumUpCards(array){
    let sum = 0
    array.forEach(element => {
        if(element[value] == 11){
            if ((sum + element[value]) > 21){
                sum += 1
            }else{
                won = true
                return -1
            }
        }else if(element[value] > 10){
            sum += 10
        }else{
            sum += element[value]
        }
    });

    return sum;
}

let playerSum = 0
let dealerSum = 0

function display(){
    document.getElementById("playerSum").innerText = playerSum;
}

function start (){
    initialize();
    playerHand = draw(2, playerHand);
    dealerHand = draw(2, dealerhand);

    playerSum = sumUpCards(playerHand)
    dealerSum = sumUpCards(dealerhand)

    display()

}