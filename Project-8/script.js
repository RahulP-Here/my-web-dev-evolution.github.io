// Selecting all button elements and the display area for the calculator
let buttons = document.querySelectorAll('button');
let displayElement = document.querySelector('#display > .ans');

let isOperator = false; // Flag to track if the last button pressed was an operator
let isError = false; // Flag to track if there was an error in the calculation

// Function to handle the addition of new elements to the display
let handleInput = (element) => {
    if (element.classList.contains('operator')) {
        // If the button pressed is an operator (+, -, *, /)
        if (isOperator) {
            // If the last input was also an operator, replace it with the new one
            let currentDisplay = displayElement.innerHTML.slice(0, -1); // Remove the last character
            displayElement.innerHTML = currentDisplay + element.innerHTML; // Add the new operator
        } else {
            // If the last input was not an operator, simply append the operator to the display
            isOperator = true;
            displayElement.innerHTML += element.innerHTML;
        }
    } else {
        // If the button pressed is a number or decimal point
        isOperator = false;
        displayElement.innerHTML += element.innerHTML;
    }
}

// Function to handle the backspace operation
let handleBackspace = () => {
    let currentDisplay = displayElement.innerHTML;
    // Remove the last character from the display
    displayElement.innerHTML = currentDisplay.slice(0, -1);
}

// Function to calculate the result and handle any errors
let calculateResult = () => {
    let rawInput = displayElement.innerHTML;
    if (rawInput) {
        // Replace '×' with '*' and '÷' with '/' for evaluation using eval()
        let processedInput = rawInput.replaceAll('×', '*').replaceAll('÷', '/');
        try {
            let result = eval(processedInput); // Evaluate the processed input
            if (result == "Infinity" || isNaN(result)) {
                // Display an error if the result is Infinity or NaN (Not a Number)
                throw new Error("Infinity");
            }
            displayElement.innerHTML = result; // Display the calculated result
        } catch (error) {
            // Handle the error by displaying the error message
            document.querySelector('#display > .error').style = 'display: block; max-height: 100%;';
            isError = true; // Set isError flag to true
        }
    }
}

// Function to handle the plus/minus toggle
let togglePlusMinus = () => {
    let currentInput = displayElement.innerHTML;
    let lastNumber = '';
    let isNegative = false;
    let endIndex, startIndex, breakingIndex;

    // Traverse through the current input string from right to left
    for (let i = currentInput.length - 1; i >= 0; i--) {
        if (parseInt(currentInput[i])) {
            // If the character is a number, prepend it to lastNumber
            lastNumber = currentInput[i] + lastNumber;
        } else {
            // If the character is not a number
            if (currentInput[i] == ')') {
                isNegative = true; // Indicate that the number is negative
                endIndex = i; // Store the end index of the negative number
            } else if (currentInput[i - 1] == '(') {
                startIndex = i; // Store the start index of the negative number
                breakingIndex = i - 2; // Set the breaking index to the next character
            } else if (currentInput[i] == '.' || currentInput[i] == '0') {
                lastNumber = currentInput[i] + lastNumber; // Append '.' or '0' to lastNumber
            } else {
                breakingIndex = i; // Set the breaking index to the current character
                break; // Exit the loop
            }

            // If it's a negative number and we have both start and end indices
            if (isNegative && startIndex && endIndex) {
                lastNumber = currentInput.slice(startIndex, endIndex); // Extract the negative number
                break; // Exit the loop
            }
        }
    }

    // If lastNumber is not empty, toggle it between positive and negative
    if (lastNumber != '') {
        currentInput = currentInput.slice(0, breakingIndex + 1); // Remove the last number from display
        lastNumber = -(Number(lastNumber)); // Convert lastNumber to its negative value
        if (isNegative) {
            displayElement.innerHTML = currentInput + `${lastNumber}`; // Display the negative number
            isNegative = false; // Reset the isNegative flag
        } else {
            displayElement.innerHTML = currentInput + `(${lastNumber})`; // Display the negative number in parentheses
        }
    }
}

// Attach event listeners to each button
buttons.forEach((element) => {
    element.addEventListener('click', () => {
        // Clear the error message if any button is pressed
        if (isError) {
            isError = false; // Reset the isError flag
            document.querySelector('#display > .error').style = 'max-height: 0%;'; // Hide the error message
        }

        // Handle different button presses
        if (element.innerHTML == "=") {
            calculateResult(); // Calculate the result if '=' button is pressed
        } else if (element.innerHTML == "C") {
            displayElement.innerHTML = ""; // Clear the display if 'C' button is pressed
        } else if (element.innerHTML == "✖") {
            handleBackspace(); // Perform backspace operation if '✖' button is pressed
        } else if (element.innerHTML == ".") {
            let currentInput = displayElement.innerHTML;
            let numbersArray = currentInput.split(/\+|\-|\×|\÷/g);

            // Add a decimal point if the last number doesn't already have one
            if (!numbersArray[numbersArray.length - 1].includes('.')) {
                handleInput(element);
            }
        } else if (element.innerHTML == "+/-") {
            togglePlusMinus(); // Toggle plus/minus sign if '+/-' button is pressed
        } else {
            handleInput(element); // Add the button value to the display
        }

        // Scroll to the end of the display to show the latest input
        displayElement.scrollLeft = displayElement.scrollWidth;
    });
})
