// finding buttons
const operations = document.querySelectorAll(".normal-button.function-button"); // operator buttons
const digits = document.querySelectorAll('.normal-button.digit'); // number buttons
const generateTextElement = document.getElementById('generateText'); // display text
const clearAll = document.querySelector(".clear"); 
const zeroButton = document.querySelector(".zero");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equals");
const postiveNegative = document.querySelector(".positive-negative");
const targetElements = document.getElementById("all-buttons");

// starting points

let firstNumber = '';
let operator = [];
let temp_operator = '';
let secondNumber = '';
let accumulatedText = '';
let result = '';
let equalPressed = false;

//function for the operations

const add = (x, y) =>  x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

// asign correct operation according to operator

const operate = (firstNumber, secondNumber, properOperator) => {
    if(firstNumber === "YOU KNOW YOU CANNOT DO THAT!"){
        return NaN
    }
    if(properOperator === "+") {
        return add(firstNumber,secondNumber);
    } else if(properOperator === "-") {
        return subtract(firstNumber,secondNumber);
    } else if(properOperator === "*"){
        return multiply(firstNumber,secondNumber);
    } else if(properOperator === "÷" || properOperator === "/") {
        if(secondNumber === 0 || secondNumber === '0'){
            // add clear function here
            return "YOU KNOW YOU CANNOT DO THAT!"
        } else {
            return divide(firstNumber,secondNumber);
        }      
    }    
}

// step 3, evaluating the necessary numbers

const chosenNumbers = number => {   
    if(accumulatedText === '') {        // if user click on operator but there is no text, not do anything
        return        
    } else if (firstNumber === '') {     // if first is blank, get first number
        firstNumber = parseFloat(number);       
    } else {                          // if second is blank, get second number and check operation
        secondNumber = parseFloat(number);
        result = checkNumbers(firstNumber, secondNumber);
        firstNumber = result;
        }
    accumulatedText = '';    
    }

// step 4, run operate

const checkNumbers = (firstNumber, secondNumber) => {
            if(temp_operator === ''){
                result = operate(firstNumber, secondNumber, operator[operator.length - 2]); // in order to start the first equation
            } else if (operator.length > 1) {
                result = operate(firstNumber, secondNumber, operator[operator.length - 2]); // in case the user decides to change or picks the wrong operator
            } else if (operator !== temp_operator) {
                result = operate(firstNumber, secondNumber, temp_operator); // in case the user changes the operator, the previous equation will not change the operator          
            } else {
                result = operate(firstNumber, secondNumber, operator[operator.length - 2]); // any of the above are not the case
        }   
            generateTextElement.textContent = result;
            temp_operator = operator[operator.length-1]  // saves previous operator                      
            operator = [];                              //refresh the list            
            return result
}

// step 1 display the numbers, make sure zero is not first number and only one decimal can appear

document.addEventListener('keydown', (event) => {        
        if(/^[0-9.,]$/.test(event.key)){            
            const buttonText = event.key;            
            handleNumberPressed(buttonText)
        }      
    });2

const handleNumberPressed = (number) => {
    if(accumulatedText.length > 14){
        return
    }else if(number === '0'){
        if(accumulatedText === ''){
            accumulatedText = number
            generateTextElement.textContent = parseFloat(accumulatedText)
        }else if(accumulatedText.length === 1 && accumulatedText[0]=== '0'){
            return;
        }else {
                accumulatedText += '0';        
            }
    }else if(number === '.' || number === ','){
        if(accumulatedText === ''){
            accumulatedText += '0.'
            return generateTextElement.textContent = accumulatedText;
        } else {        
            textIntoArray = Array.from(accumulatedText)
            if(textIntoArray.includes('.')===true) {
                return
            } else {
                accumulatedText += '.';
                return generateTextElement.textContent = accumulatedText
            }
        }
    } else {
        accumulatedText  += number;           
    }
    generateTextElement.textContent = parseFloat(accumulatedText);
}


digits.forEach(digit => {
    digit.addEventListener('click', () => {
    const buttonText = digit.textContent;
    accumulatedText  += buttonText;
    generateTextElement.textContent = parseFloat(accumulatedText);
    });
});

zeroButton.addEventListener('click', () => {    
    if(accumulatedText === ''){        
        accumulatedText += '0';
        generateTextElement.textContent = parseFloat(accumulatedText)
    }else if(accumulatedText.length === 1 && accumulatedText[0]=== '0'){
        return;
    }else {
        accumulatedText += '0';        
    }
    generateTextElement.textContent = parseFloat(accumulatedText);
})

decimalButton.addEventListener('click', () => {
    if(accumulatedText === ''){
        accumulatedText += '0.'        
        generateTextElement.textContent = accumulatedText;
    }else {        
        textIntoArray = Array.from(accumulatedText)
        if(textIntoArray.includes('.')===true) {
            return
        } else {
            accumulatedText += '.';
            generateTextElement.textContent = accumulatedText;
        }
    }
})


// step 2 get the operator and numbers from display

operations.forEach(operatation => {
    operatation.addEventListener('click', () => {
        if(equalPressed === true && generateTextElement.textContent !== firstNumber.toString()){
            firstNumber = ''
        }
        operator_button = operatation.textContent;
        operator.push(operator_button);
        chosenNumbers(accumulatedText);
        equalPressed = false;
    })
})


document.addEventListener('keydown', (event)=> {
if(/[/+-=*]/.test(event.key)){    
    const operator_key = event.key;    
    handleOperatorPressed(operator_key) 
}
});

handleOperatorPressed = (operator_key) => {
    if(operator_key ==='/' || operator_key ==='*' || operator_key ==='+' || operator_key ==='-'){
        if(equalPressed === true && generateTextElement.textContent !== firstNumber.toString()){
            firstNumber = ''
        }        
        operator.push(operator_key);
        chosenNumbers(accumulatedText);
        equalPressed = false;
    }
};


//clear the display and go back to zero

const clearEverything = clearAll.addEventListener("click", () => {
    firstNumber = '';
    secondNumber = '';
    operator = [];
    accumulatedText = '';
    generateTextElement.textContent = '0';
})

//equal equation but allow to operate on result
equalButton.addEventListener("click", () => {    
    if(accumulatedText === '' || firstNumber === ''){        
        return
    } else if (temp_operator !== '') {
        secondNumber = parseFloat(accumulatedText)
        result = operate(firstNumber, secondNumber, temp_operator);
        generateTextElement.textContent = result;               
        temp_operator = '';
    }else{        
        secondNumber = parseFloat(accumulatedText)        
        result = operate(firstNumber, secondNumber, operator[0]);
        generateTextElement.textContent = result;        
        secondNumber = '';
        operator = [];
        
        }
        equalPressed = true;
        accumulatedText = '';
        firstNumber = result;
    
})

document.addEventListener('keydown', (event) => {
    if(/^Enter$/i.test(event.key)) {
        if(accumulatedText === '' || firstNumber === ''){        
            return
        } else if (temp_operator !== '') {
            secondNumber = parseFloat(accumulatedText)
            result = operate(firstNumber, secondNumber, temp_operator);
            generateTextElement.textContent = result;               
            temp_operator = '';
        }else{        
            secondNumber = parseFloat(accumulatedText)        
            result = operate(firstNumber, secondNumber, operator[0]);
            generateTextElement.textContent = result;        
            secondNumber = '';
            operator = [];
            
            }
            equalPressed = true;
            accumulatedText = '';
            firstNumber = result;
    }
})

//change the number from a positive to a negative

postiveNegative.addEventListener('click', () =>{
    if(generateTextElement.textContent === '0' || generateTextElement.textContent === ''){
        return
    } else {
        accumulatedText = generateTextElement.textContent * -1;
        generateTextElement.textContent = accumulatedText
    }
})

//erase numbers from display

document.addEventListener('keydown', (event)=> {
    if(event.key === 'Backspace'){
        if(accumulatedText === ''){
            return
    } else if(accumulatedText.length <= 1) {
        accumulatedText = '0';
        return generateTextElement.textContent = accumulatedText;
    } else{
        accumulatedText = accumulatedText.slice(0,-1);
        generateTextElement.textContent = parseFloat(accumulatedText)
    }
}
})