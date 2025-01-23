let playerSum = 0
let dealerSum = 0
var hit21 = false;
var bust = false;
function display(){
    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("dealerSum").innerText = dealerSum;
}

/**Rewrite to draw cards and sum up instead. */
function draw(amount){
    let sum = 0
    for (let i = 0; i < amount ; i++){
        let val = Math.floor(Math.random() * 13) +1
        console.log("card = " + val)
        if(val == 11){
            if ((sum + 10) > 21){
                sum += 1
            }else{
                sum += 10
            }
        }else if (val > 10){
            sum += 10
        }else{
            sum = val
        }
    }
    return sum
}
function init(){
    document.getElementById("wonmessage").style.display = "none"
    document.getElementById("dealerwonmessage").style.display = "none"
}

function start(){
    init()

    dealerSum = 0;
    playerSum = draw(2);
    display()
}

function lose(){
    document.getElementById("dealerwonmessage").style.display = "block"
}

function won(){
    document.getElementById("wonmessage").style.display = "block"
}

function hit(){
    playerSum += draw(1);
    if(playerSum > 21){
        bust = true
       /* deactivate hit */ 
    }else if (playerSum == 21){
        hit21 = true
    }
    display()
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
        console.log("---dealer draw:---")
        dealerSum = draw(2);
        while(dealerSum < 21 && dealerSum < playerSum){
            dealerSum += draw(1)
        }
        winCheck()
    }
    display()
}