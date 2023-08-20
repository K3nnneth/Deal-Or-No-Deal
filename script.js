const screen = document.querySelector('.game-screen');
const availability = document.querySelector('.availability');
let prizepool = [1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 40, 50, 75, 100, 200];
let count = 5;  // the amount of cases left to open each round
let round = 1;
let totalamount = 0;   // total amount of prize pool money left in the pot
let unopened = 16;   // number of unopened cases
let offer = 0; 
let personalcase = true;

function setup() {

    reset();

    for (let i = 0; i < 16; i++) {
        const suitcase = document.createElement('div');
        suitcase.classList.add('case');
        suitcase.id = i + 1;
        suitcase.textContent = i + 1;
        screen.appendChild(suitcase);

        suitcase.addEventListener('click', opencase);

        const prize = document.createElement('div');
        prize.classList.add('prize');
        prize.id = 'key' + prizepool[i];
        prize.textContent = prizepool[i];
        availability.appendChild(prize);
    }
    for (let i = 0; i < prizepool.length; i++) {
        totalamount += prizepool[i];
    }
}

function opencase(e) {
    let suitcase = e.target;
    if (personalcase) {
        suitcase.style.backgroundColor = 'green';
        suitcase.classList.add('personal');
        personalcase = false;
        const chatbox = document.querySelector('.chatbox');
        chatbox.textContent = `Please select ${count} cases to open.`
    }
    else if (suitcase.style.backgroundColor != 'red' && suitcase.style.backgroundColor != 'green') {
        if (count != 0) {
            let suitcase = e.target;
            suitcase.style.backgroundColor = 'red';
            suitcase.style.fontSize = '30px';
            suitcase.textContent = '$' + prizepool[suitcase.id - 1];
            const available = document.querySelectorAll('.prize');
            available.forEach(box => {
                if (box.id == 'key' + prizepool[suitcase.id - 1]) {
                    box.style.backgroundColor = 'grey';
                }
            })
            
            count--;
            unopened--;
            totalamount = totalamount - prizepool[suitcase.id - 1];
            const chatbox = document.querySelector('.chatbox');
    
            if (count == 0) {
                offer = Math.floor(totalamount / unopened);
                round++;
                chatbox.textContent = `The Dealer's offer is $${offer}. Deal or No Deal?`;
            }
            else {
                chatbox.textContent = `Please select ${count} cases to open.`;
            }
        }
    }
}

function shuffle(array) {
    let length = array.length - 1;
    for (let i = length; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function startgame() {
    setup();
    shuffle(prizepool);
    const chatbox = document.querySelector('.chatbox');
    chatbox.textContent = 'Please select your case.';
}

function deal() {
    if (count == 0) {
        const chatbox = document.querySelector('.chatbox');
        chatbox.textContent = `Congrats! You have won $${offer}!`;
    }
}

function nodeal() {
    if (count == 0) {
        const chatbox = document.querySelector('.chatbox');
        count = 6 - round;
        if (round < 5) {
            chatbox.textContent = `Please select ${count} cases to open.`;
        }
        else {
            const personal = document.querySelector('.personal');
            let winnings = prizepool[personal.id - 1]
            chatbox.textContent = `Congrats! Your case had $${winnings}.`;
        }
    }
}

function reset() {
    const cases = document.querySelectorAll('.case');
    cases.forEach(suitcase => {
        suitcase.remove();
    })
    const available = document.querySelectorAll('.prize');
    available.forEach(box => {
        box.remove();
    })
    prizepool = [1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 40, 50, 75, 100, 200];

    // Reset values for new game
    count = 5; 
    round = 1;
    totalamount = 0;  
    unopened = 16;  
    offer = 0; 
    personalcase = true;
}