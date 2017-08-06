let mainModule = (function () {
    let r = 0,
        firstNumbers = [],
        secondNumbers = [],
        charFunction,
        calcResult = 0,
        done,
        number_1 = '',
        number_2 = '',
        screen = document.querySelector("#screen");

    let writeNumber = (value) => {
        if (charFunction === undefined) {
            firstNumbers[r] = value;
            r++;
            screen.textContent = `${number_1}${firstNumbers[r - 1]}`;
            number_1 = screen.textContent;
        } else if (charFunction !== undefined) {
            secondNumbers[r] = value;
            r++;
            screen.textContent = `${number_2}${secondNumbers[r - 1]}`;
            number_2 = screen.textContent;
        }
    }

    let doCalculationsAndShowResult = (char) => {
        if (number_2 !== '') {
            number_1 = parseFloat(number_1);
            number_2 = parseFloat(number_2);
            switch (char) {
                case "+":
                    calcResult = number_1 + number_2;
                    break;
                case "-":
                    calcResult = number_1 - number_2;
                    break;
                case "*":
                    calcResult = number_1 * number_2;
                    break;
                case "/":
                    calcResult = number_1 / number_2;
                    break;
            }
            done = true;
            screen.textContent = calcResult;
            number_1 = calcResult;
            number_2 = '';
            secondNumbers = [];
        } else {
            screen.textContent = calcResult;
        }
    }

    let reset = () => {
        r = 0;
        charFunction = undefined;
        firstNumbers = [];
        secondNumbers = [];
        calcResult = 0;
        number_1 = '';
        number_2 = '';
        screen.textContent = '';
    }


    let giveFunction = () => {
        const buttonsNumbers = document.querySelectorAll(".calc-btn"),
            buttonsFunction = document.querySelectorAll(".calc-btn--function"),
            buttonFinish = document.querySelector(".calc-btn--finish"),
            buttonReset = document.querySelector(".btn-reset"),
            buttonchange = document.querySelector(".btn-change");

        for (let i = 0; i < buttonsNumbers.length; i++) {
            buttonsNumbers[i].addEventListener("click", () => {
                if(done == true && number_1 != ''){
                    console.log("hello");
                    reset();
                }
                writeNumber(buttonsNumbers[i].value);
            }, false);
        }
        
        for (let i = 0; i < buttonsFunction.length; i++) {
            buttonsFunction[i].addEventListener("click", () => {
                done = false;
                charFunction = buttonsFunction[i].value;
                screen.textContent = '';
            }, false);
        }
        
        buttonFinish.addEventListener("click", () => {
            doCalculationsAndShowResult(charFunction);
        }, false);
        
        buttonReset.addEventListener("click", () => {
            reset();
        }, false);
        
        buttonchange.addEventListener("click", () => {
            if (number_2 == '') {
                number_1 *= (-1);
                screen.textContent = number_1;
            } else {
                number_2 *= (-1);
                screen.textContent = number_2;
            }
        }, false);
    }


    return {
        giveFunction: giveFunction,
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    mainModule.giveFunction();
});