const displayResult = document.querySelector('.display-result');

let currentValue = '';
let previousValue = '';
let operator = '';
let result = '';


const updateDisplay =(value) => {
    displayResult.textContent = value;
};

const handleNumber = (num) => {
    if(currentValue.length < 10){
        currentValue += num;
        updateDisplay(currentValue);
    }
};

// untuk menangani opersai aritmatika
const handleOperator = (op) => {
    if(currentValue !== ''){
        previousValue = currentValue;
        currentValue = '';
        operator = op;
    }
};


// untuk menghitung hasil
const calculate = () => {
    if(previousValue !== '' && currentValue !== ''){
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);

        switch(operator){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case 'x':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '%':
                result = prev % curr;
                break;
        }

        updateDisplay(result);
        previousValue = result.toString();
        currentValue = '';
        operator = '';
    }
};

// untuk reset calculator
const resetCalculator = () =>{
    currentValue = '';
    previousValue = '';
    operator = '';
    updateDisplay('0');
};

// untuk menangani +/- tombol negatif / positif
const toggleSign = () => {
    if(currentValue !== ''){
        currentValue = (-parseFloat(currentValue)).toString();
        updateDisplay(currentValue);
    }
};


// untuk menangani desimal
const addDecimal = () =>{
    if(!currentValue.includes('.')){
        currentValue += '.';
        updateDisplay(currentValue);
    }
};

document.querySelectorAll('.num-pad').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if(!isNaN(value)){
            handleNumber(value);
        } else if(value === 'A/C'){
            resetCalculator();
        } else if(value === '+/-'){
            toggleSign();
        } else if(value === '.'){
            addDecimal();
        } else if(value === '='){
            calculate();
        } else {
            handleOperator(value);
        }
    });
});