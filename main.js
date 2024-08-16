// Letter index
let lidx = 1;

const A_ASCII = 65;

function add() {
    let letter = String.fromCharCode(A_ASCII + lidx);
    lidx++;

    let newDiv = document.createElement('div');
    newDiv.className = 'coords-div';
    newDiv.id = `${letter}-div`;

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
    let inputDiv = document.getElementById("inputDiv");

    container.removeChild(addButton);
    container.removeChild(calculateButton);
    container.removeChild(removeButton);
    container.removeChild(inputDiv);

    container.appendChild(newDiv);

    container.appendChild(addButton);
    container.appendChild(calculateButton);
    container.appendChild(removeButton);
    container.appendChild(inputDiv);
}

function calculate() {
    alert("Calculating!");
}

function remove() {
    // Decrement the letter index
    if (!lidx) {
        return;
    }
    lidx--;

    let container = document.getElementById('container');
    let toBeRemoved = document.getElementById(`${String.fromCharCode(A_ASCII + lidx)}-div`);

    container.removeChild(toBeRemoved);
}