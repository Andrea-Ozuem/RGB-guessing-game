const rElement = document.getElementById('r');
const gElement = document.getElementById('g');
const bElement = document.getElementById('b')
const colorDisplayELement = document.getElementById('color-display')

const levels = Array.from(document.getElementsByClassName('mode'));

let gameLevel = levels.find((level) => {
    const classList = Array.from(level.classList);
    return classList.includes('selected');
}).innerHTML;

let squares = getSquares();

levels.forEach(level => {
    level.addEventListener('click', function () {
        levels.forEach(mode => {mode.classList.remove('selected'); });
        this.classList.add('selected');

        gameLevel = this.innerHTML;
        setTilesBasedonLevel(gameLevel);
        squares = getSquares();
    });
});
function getSquares() {
    const allSquares = Array.from(document.getElementsByClassName('square'));
    if (gameLevel == 'Easy') {
        return allSquares.slice(0,3);
    } else {
        return allSquares;
    }
}
function setTilesBasedonLevel(currentGameLevel) {
    const allSquares = Array.from(document.getElementsByClassName('square'));
    if (currentGameLevel == 'Easy') {
        //sets three squares on the screen
        const firstThreeSquares = allSquares.slice(0,3);
        const lastThreesquares = allSquares.slice(3, 6);

        lastThreesquares.forEach(sq => sq.classList.add('hidden'))
    }
    else if (currentGameLevel == 'Hard') {
        //sets 6 squares on the screen
        squares.forEach(sq => sq.classList.remove('hidden'));
    }
}

//Attempt to make all the square have the background color: rgb(200, 45, 255)
const start = document.getElementById('reset');
start.addEventListener('click', function () {
    this.innerHTML = 'New Colors';
    // assign each individual square a background color
    for (let i = 0; i < squares.length; i++) {
        const red = Math.floor(Math.random()*256);
        const green = Math.floor(Math.random()*256);
        const blue = Math.floor(Math.random()*256);

        const rgbString = `rgb(${red}, ${green}, ${blue})`;
        const square = squares[i];
        square.dataset.rgb_Value = JSON.stringify([red, green, blue]);
        square.style.backgroundColor = rgbString;
    }
    // assign the header a random RGB value from one of the square values
    const randomSquareIndex = Math.floor(Math.random() * squares.length);
    const headerColorSquare = squares[randomSquareIndex]; 
    setHeaderRgbValue(headerColorSquare);
    
});

function setHeaderRgbValue(squareElement) {
    const setHeaderElementValue = (rgbValues, element) => {
        const[r, g, b] = rgbValues;
        const rgbString = `rgb(${r}, ${g}, ${b})`;
        element.style.backgroundColor = rgbString;
        element.innerHTML = rgbValues.find(rgbValue => {
            return rgbValue > 0;
        });
    }
    const rgbString = squareElement.dataset.rgb_Value;
    colorDisplayELement.dataset.rgb_Value = rgbString;
    const [red, green, blue] = JSON.parse(rgbString);
    const redValue = [red, 0, 0];
    const greenValue = [0, green, 0];
    const blueValue = [0, 0, blue];

    setHeaderElementValue(redValue, rElement);
    setHeaderElementValue(greenValue, gElement);
    setHeaderElementValue(blueValue, bElement);
}

//add event listener to squares so that it either disappears or chanbges evey square color
squares.forEach(square => {
    square.addEventListener('click', function () {
        const headerRgbValue = colorDisplayELement.dataset.rgb_Value;
        const squareRgbValue = this.dataset.rgb_Value;

        if (headerRgbValue == squareRgbValue) {
            setSquaresAfterWin(headerRgbValue);
        } else {
            this.classList.add('hidden');
        }
    })
    function setSquaresAfterWin(hdRgb) {
        const [r, g, b] = JSON.parse(hdRgb);
        const rgbString = `rgb(${r}, ${g}, ${b})`;

        squares.forEach(sq => {
            sq.classList.remove('hidden');
            sq.style.backgroundColor = rgbString;
            sq.dataset.rgb_Value = colorDisplayELement.dataset.rgb_Value;
        })
    }
});

