const card = document.querySelectorAll('.memory-card');
let isTurnedCard = false;
let lockgame = false;
let cardOne, cardTwo;
let counter = 0;
const result = document.querySelector('.result');
const button = document.querySelector('.button-33');
const score = document.querySelector('.bestscore');
let i = 0;
let cardsnumber = 24;
var my_div = newDiv = null;


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('DOMContentLoaded', changePosition);

function changePosition() {
    card.forEach(card => card.style.order = getRandomIntInclusive(0, 24));
    let z = JSON.parse(localStorage.getItem('j'));
    var newDiv = document.createElement("div");
    newDiv.classList.add("bestscore");
    let content = JSON.parse(localStorage.getItem('top[0]'));
    newDiv.innerHTML = content;

    console.log(content);
    my_div = document.getElementById("org_div1");
    score.insertBefore(newDiv, my_div);
}

function shuffle() {
      location.reload();
      let z = JSON.parse(localStorage.getItem('j'));
      var newDiv = document.createElement("div");
      newDiv.classList.add("bestscore");
      let content = JSON.parse(localStorage.getItem('top[0]'));
      newDiv.innerHTML = content;
  
      console.log(content);
      my_div = document.getElementById("org_div1");
      score.insertBefore(newDiv, my_div);
 
}


card.forEach(card => card.addEventListener('click', turnCard));

button.addEventListener('click', shuffle);

function reset() {

    if (JSON.parse(localStorage.getItem('j')) === 9 || JSON.parse(localStorage.getItem('j')) === null) {
        i = 0;
    } else {
        i = JSON.parse(localStorage.getItem('j')) + 1;
    }

    localStorage.setItem(`top[${i}]`, JSON.stringify(counter));
    localStorage.setItem(`j`, JSON.stringify(i));
      location.reload(); // changePosition();

}

function turnCard() {
    if (lockgame) return;
    if (this === cardOne) return;
    this.classList.toggle('turn');
    if (!isTurnedCard) {
        isTurnedCard = true;
        cardOne = this;
        return;
    }

    isTurnedCard = false;
    cardTwo = this;
    checkMatch();

}

function refresh() {
    isTurnedCard = false;
    lockgame = false;
    cardOne = null;
    cardTwo = null;
}

function checkMatch() {
    if (cardOne.dataset.img === cardTwo.dataset.img) {

        cardOne.removeEventListener('click', turnCard);
        cardTwo.removeEventListener('click', turnCard);
        refresh();

        cardsnumber = cardsnumber - 2;

    } else {
        lockgame = true;
        setTimeout(() => {
            cardOne.classList.remove('turn');
            cardTwo.classList.remove('turn');

            refresh();
        }, 1400);
    }
    counter++;
    result.innerHTML = counter;
    if (cardsnumber === 0) setTimeout(() => {




        alert("Game finished, well done!");
        reset();
    }, 1400);

}