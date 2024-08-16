// Letter index
let lidx = 1;

function add() {
    let letter = String.fromCharCode(65 + lidx);
    lidx++;

    let newDiv = document.createElement('div');
    newDiv.className = 'coords-div';

    let newLabel = document.createElement('label');
    newLabel.setAttribute('for', letter.toLowerCase());
    newLabel.textContent = `${letter}:`;

    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = letter.toLowerCase();
    newInput.name = letter.toLowerCase();

    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInput);

    let container = document.getElementById('container');
    let addButton = document.getElementById('addButton');
    let calculateButton = document.getElementById('calculateButton');
    let removeButton = document.getElementById('removeButton');

    container.removeChild(addButton);
    container.removeChild(calculateButton);
    container.removeChild(removeButton);

    container.appendChild(newDiv);

    container.appendChild(addButton);
    container.appendChild(calculateButton);
    container.appendChild(removeButton);
}

function calculate() {
    alert("Calculating!");
}

function remove() {
    // Decrement the letter index
    lidx--;
}