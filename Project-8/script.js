let btn = document.querySelectorAll('button');
let display = document.querySelector('#display > .ans');

let isOperator;
let isError;

let proceed = (element) => {
    if (element.classList.contains('operator')) {
        if (isOperator) {
            let slicedString = display.innerHTML.slice(0, -1);
            display.innerHTML = slicedString + element.innerHTML;
        }
        else {
            isOperator = true;
            display.innerHTML += element.innerHTML;
        }
    }
    else {
        isOperator = false;
        display.innerHTML += element.innerHTML;
    }
}

let back = () => {
    let c = display.innerHTML.length;
    let n = display.innerHTML.slice(0, (c - 1));
    display.innerHTML = n;
}

let ans = () => {
    let raw_str = display.innerHTML;
    if (raw_str) {
        let process1 = raw_str.replaceAll('×', '*');
        let final_str = process1.replaceAll('÷', '/');

        try {
            let answer = eval(final_str);
            if(answer == "Infinity" || (!(answer))){
                throw new Error("Infinity");
            }
            display.innerHTML = answer;
        } catch (error) {
            document.querySelector('#display > .error').style = 'display: block; max-height: 100%;';
            isError = true;
        }
    }
}

let plusMinus = () => {
    let str = display.innerHTML;
    let lastNum = '';
    let isMinus;
    let end;
    let start;
    let breakingIndex;
    for (let index = ((str.length) - 1); index >= 0; index--) {
        if (parseInt(str[index])) {
            lastNum = str[index] + lastNum;
        }
        else {
            if (str[index] == ')') {
                isMinus = true;
                end = index;
            }
            else if (str[index - 1] == '(') {
                start = index;
                breakingIndex = index - 2;
            }
            else if (str[index] == '.') {
                lastNum = str[index] + lastNum;
            }
            else if (str[index] == '0') {
                lastNum = str[index] + lastNum;
            }
            else {
                breakingIndex = index;
                break;
            }

            if (isMinus && start && end) {
                lastNum = str.slice(start, end);
                break;
            }
        }
    }
    if (lastNum != '') {
        str = str.slice(0, breakingIndex + 1);
        lastNum = -(Number(lastNum));
        if (isMinus) {
            display.innerHTML = str + `${lastNum}`;
            isMinus = false;
        }
        else {
            display.innerHTML = str + `(${lastNum})`;
        }
    }
}


btn.forEach((element) => {
    element.addEventListener('click', () => {
        if (isError) {
            isError = false;
            document.querySelector('#display > .error').style = 'max-height: 0%;';
        }

        if (element.innerHTML == "=") {
            ans();
        }
        else if (element.innerHTML == "C") {
            display.innerHTML = "";
        }
        else if (element.innerHTML == "✖") {
            back();
        }
        else if (element.innerHTML == ".") {
            let str = display.innerHTML;
            let allNum = str.split(/\+|\-|\×|\÷/g)
            
            if(! allNum[(allNum.length)-1].includes('.')){
                proceed(element)
            }
            
        }
        else if (element.innerHTML == "+/-") {
            plusMinus();
        }
        else {
            proceed(element);
        }

        display.scrollLeft = display.scrollWidth; //continuously scrolling left while typing
    });
})
