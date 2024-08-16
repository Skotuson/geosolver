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
    newLabel.setAttribute('for', letter);
    newLabel.textContent = `${letter}:`;

    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = letter;
    newInput.name = letter;

    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInput);

    let container = document.getElementById('container');
    let buttonContainer = document.getElementById('button-container');
    let inputDiv = document.getElementById("inputDiv");

    container.removeChild(inputDiv);
    container.removeChild(buttonContainer);

    container.appendChild(newDiv);

    container.appendChild(inputDiv);
    container.appendChild(buttonContainer);
}

function calculate() {
    let letters = Array.from(document.getElementsByClassName('coords-div'));
    let coordsString = document.getElementById("inputDiv").querySelector("input").value;
    if (!coordsString.length) {
        coordsString = document.getElementById("inputDiv").querySelector("input").placeholder;
    }

    for (const l of letters) {
        let letter = l.querySelector("input").id;
        let val = document.getElementById(letter).value;
        coordsString = coordsString.replaceAll(letter, val);
    }

    console.log(coordsString);

    let parser = new Parser(coordsString);
    parser.Start();

    window.alert(parser.coords);
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