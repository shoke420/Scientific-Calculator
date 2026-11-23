let scientificMode = false;
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}



function calculate() {
    const display = document.getElementById('display');

    try {
        let expression = display.value;
        expression = expression.replace(/\^/g, '**');

            if (expression.trim() === '') {
                return;
            }

        const openBrackets = (expression.match(/\(/g) || []).length;
        const closeBrackets = (expression.match(/\)/g) || []).length;

            expression += ')'.repeat(
            Math.max(0, openBrackets - closeBrackets)
            );

        const result = eval(expression);

            if (!Number.isFinite(result)) {
            display.value = 'Error';
            }   else {
                display.value = result;
            }
    } 
    catch (error) {
        display.value = 'Error';
    }
}


function toggleMode() {
    scientificMode = !scientificMode;

    const scientificSection = document.getElementById('scientificMode');
    const modeButton = document.getElementById('modeButton');

    if (scientificMode) {
        scientificSection.style.display = 'block';
        modeButton.style.display = 'none';
    } else {
        scientificSection.style.display = 'none';
        modeButton.style.display = 'inline-block';
    }
}

function squareRoot() {
    const display = document.getElementById('display');

    if (display.value.trim() === '') {
        display.value = 'Error';
        return;
    }

    const number = Number(display.value);

    if (number < 0) {
        display.value = 'Error';
        return;
    }

    display.value = Math.sqrt(number);
}


function squareNumber() {
    const display = document.getElementById('display');

    if (display.value.trim() === '') {
        display.value = 'Error';
        return;
    }

    const number = Number(display.value);
    display.value = number * number;
}


function calculateTrig(functionName) {
    const display = document.getElementById('display');

    if (display.value.trim() === '') {
        display.value = 'Error';
        return;
    }

    const angle = Number(display.value);
    const radians = angle * Math.PI / 180;

    let result;

    if (functionName === 'sin') {
        result = Math.sin(radians);
    } else if (functionName === 'cos') {
        result = Math.cos(radians);
    } else if (functionName === 'tan') {
        result = Math.tan(radians);
    } else {
        display.value = 'Error';
        return;
    }

    display.value = Number(result.toFixed(4));
}


function calculateLog() {
    const display = document.getElementById('display');
    const number = Number(display.value);

    if (display.value.trim() === '' || number <= 0) {
        display.value = 'Error';
        return;
    }

    display.value = Math.log10(number);
}


function calculateLn() {
    const display = document.getElementById('display');
    const number = Number(display.value);

    if (display.value.trim() === '' || number <= 0) {
        display.value = 'Error';
        return;
    }

    display.value = Math.log(number);
}



function backspace() {
    const display = document.getElementById('display');
    let value = display.value;

    const specialParts = [
        'Math.sqrt(',
        'Math.PI',
        'Math.log10(',
        'Math.sin(',
        'Math.cos(',
        'Math.tan(',
        'Math.log('
    ];  
    
    for (const part of specialParts) {
        if (value.endsWith(part)) {
            display.value = value.slice(0, -part.length);
            return;
        }
    }

    display.value = value.slice(0, -1);

}

function toggleSign() {
    const display = document.getElementById('display');

    if (display.value.trim() === '') {
        return;
    }

    const number = Number(display.value);

    if (!Number.isFinite(number)) {
        display.value = 'Error';
        return;
    }

    display.value = number * -1;
}

function calculatePercentage() {
    const display = document.getElementById('display');

    if (display.value.trim() === '') {
        display.value = 'Error';
        return;
    }

    const number = Number(display.value);

    if (!Number.isFinite(number)) {
        display.value = 'Error';
        return;
    }

    display.value = number / 100;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ('0123456789.+-*/()%^'.includes(key)) {
        appendToDisplay(key);
    } 
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } 
    else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    } 
    else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});