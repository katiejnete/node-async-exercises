/* 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”). */
const baseURL = "https://deckofcardsapi.com";
async function requestRan() {
    try {
        let res = await axios.get(`${baseURL}/api/deck/new/draw/?count=1`);
        console.log('value', res.data.cards[0].value);
        console.log('suit', res.data.cards[0].suit);
    } catch (e) {
        console.log(e);
    }
}
requestRan();

/* 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
Once you have the card, make a request to the same API to get one more card from the same deck. */
async function requestRans() {
    try {
        let res = await axios.get(`${baseURL}/api/deck/new`);
        const deckId = res.data.deck_id;
        let res1 = await axios.get(`${baseURL}/api/deck/${deckId}/draw/?count=1`);
        let res2 = await axios.get(`${baseURL}/api/deck/${deckId}/draw/?count=1`);
        console.log(`draw 1, 'value': ${res1.data.cards[0].value}, 'suit': ${res1.data.cards[0].suit}`)
        console.log(`draw 2, 'value': ${res2.data.cards[0].value}, 'suit': ${res2.data.cards[0].suit}`)
    } catch (e) {
        console.log(e);
    }
}
requestRans();

/* 3. Build an HTML page that lets you draw cards from a deck. 
When the page loads, go to the Deck of Cards API to create a new deck, 
and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck. */
let deckId;
const cardBtn = document.querySelector('.card-btn');
const cardPile = document.querySelector('.card-pile');

document.addEventListener("DOMContentLoaded", newDeck);

async function newDeck() {
    try {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        deckId = res.data.deck_id;
        startDraw();
    } catch (e) {
        console.log(e);
    }
}

function startDraw() {
    const btn = document.createElement('button');
    btn.innerText = 'Draw Card';
    cardBtn.append(btn);
    btn.addEventListener('click', drawCard)
}

async function drawCard() {
    try {
        if (!cardPile.classList.contains("unclickable")) {
            cardPile.classList.add("unclickable");
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            console.log(res.data.cards[0].image);
            const card = document.createElement('img');
            card.setAttribute("src", res.data.cards[0].image);
            const ranNum = Math.random();
            const deg = ranNum < 0.5 ? ranNum * -30 : ranNum * 30;
            card.setAttribute("style", `transform:rotate(${deg}deg);`);
            cardPile.append(card);
            cardPile.classList.remove("unclickable");
        } else return;
    } catch (e) {
        console.log(e);
    }
}

