/*Fisher-yates shuffle */
function shuffle(array){
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

function definecards(){
    let cardArray = []
	for (let i = 0; i < deckAmount ; i++){
		for(let suit = 1 ; suit <= 4 ; suit++){
			for(let card = 1 ; card <= 13 ; card++){
				cardArray.push([suit, card, (card - 1) * 48, (suit - 1) * 64])
			}
		}
	}
    return cardArray;
}

function sumUpAces(aces, sum){
    // full value cause bust
    let howMany = 0
    for(let i = 0 ; i < aces ; i++){
        if ((11 + sum) <= 21){
            howMany++
        }
    }

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
    if(aces > 0){
        sum = sumUpAces(aces, sum)
    }
    return sum
}


/**Rewrite to draw cards and sum up instead. */
function draw(hand){
    let currentCard = cardDeck.pop()
    if(currentCard[VALUE] > 10){
        currentCard[VALUE] = 10
    }
    hand.push(currentCard)
}


function getCard(hand){
    draw(hand)
    return sumUpScore(hand)
}
