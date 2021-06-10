const baseSelect = document.getElementById('base select');
const disp = document.getElementById('disp_text');

function getNumSymbol(val) {
    if(val >= 0 && val <= 9) {
        return '' + val;
    } else if(val > 9 && val < 36) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[val - 10];
    } else {
        return 'Err';
    }
}
function getNumValue(sym) {
    if(Number(sym) >= 0 && Number(sym) <= 9) {
        return Number(sym);
    } else {
        let val = 10 + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(sym);
        if(val === 9) {
            return 'Err'
        } else {
            return val;
        }
    }
}
function convertTo(num, cBase, nBase) {
    /* Convert to decimal */
    let dNum = cBase === 10 ? Number(num) : convertToDecimal(num, cBase);

    /* Convert from decimal to new base */
    let result = '';

    while(dNum > 0) {
        result = getNumSymbol(dNum % nBase) + result;
        dNum = Math.floor(dNum / nBase);
    }

    return result === '' ? '0' : result;
}
function convertToDecimal(num, base) {
    let result = 0;
    for(let i = num.length - 1; i >= 0; i--) {
        let val = getNumValue(num[i]);
        result += val * Math.pow(base, -(i - (num.length - 1)));
    }
    return result;
}
function modToDuodecimal(num) {

}
function modFromDuodecimal(num) {

}

/* Functions */

let operation = '';
let result = '';
let needInput = false;
let newNum = true;

/* Onclick events */
function evaluate() {
    /* result = EVAL */
    result += operation + disp.innerText;

    disp.innerText = /*isNaN(result) ? 'Err' : */result;

    result = '';
    operation = '';
    newNum = true;
}
function operationPress(e) {
    if(needInput) {
        operation = e.target.innerHTML;
    } else {
        needInput = true;
        newNum = true;

        if(operation !== '') {evaluate(e);}
        result = disp.innerText;
        operation = e.target.innerHTML;
    }
}

/* Add function to buttons */
{
    document.getElementById('eql').onclick = evaluate;
    document.getElementById('clr').onclick = function () {
        operation = '';
        result = '';
        needInput = false;
        newNum = true;
        disp.innerText = '0';
    };
    document.getElementById('sum').onclick = operationPress;
    document.getElementById('min').onclick = operationPress;
    document.getElementById('mul').onclick = operationPress;
    document.getElementById('div').onclick = operationPress;
    document.getElementById('pow').onclick = operationPress;
    document.getElementById('mod').onclick = operationPress;
}


/* Digits */

/* Onclick events */
function digitPress(e) {
    if(newNum) {
        disp.innerText = e.target.innerHTML;
        newNum = false;
        needInput = false;
    } else {
        disp.innerText += e.target.innerHTML;
    }
}

/* Add function to default buttons */
document.getElementById('zero').onclick = function() {
    if(newNum) {
        disp.innerText = this.innerHTML;
        needInput = false;
    } else {
        disp.innerText += this.innerHTML;
    }
};
document.getElementById('one').onclick = digitPress;


/* Base conversion */

/* Convert display and adjust digit button layout */
let base = baseSelect.value;
let isDuodecimal = false;
function convertToBase() {
    /* Display */
    disp.innerText = convertTo(disp.innerText, base, baseSelect.value);
    base = baseSelect.value;

    /* Buttons */

    /* Match digit buttons to current number base */
    let btns = document.getElementsByClassName('dgt');
    if(btns.length < base) {
        for(let i = btns.length; i < base; i++) {
            let btn = document.createElement('button');
            btn.innerHTML = getNumSymbol(i);
            btn.className = 'dgt'
            btn.onclick = digitPress;
            document.getElementById('digits').appendChild(btn);
        }
    } else if(btns.length > base) {
        for(let i = btns.length - 1; i >= base; i--) {
            btns[i].remove();
        }
    }

    /* resize buttons */
    {
        let cols = 1;
        while (base > (cols * (cols + 1))) {
            cols++;
        }
        let rows = Math.ceil(base / cols);
        let w = (100 / cols) + '%';
        let h = (100 / rows) + '%';

        btns = document.getElementsByClassName('dgt');
        for (let btn of btns) {
            btn.style.width = w;
            btn.style.height = h;
        }
    }

    /* Special duodecimal cases *//*
    if(isDuodecimal !== (+base === 12)) {
        isDuodecimal = +base === 12;
        if(isDuodecimal) {
            btns[10].innerHTML = 'X';
            btns[11].innerHTML = 'E';
        } else {
            if(base >= 12) {
                btns[11].innerHTML = getNumSymbol(11);
            }
            if(base >= 11) {
                btns[10].innerHTML = getNumSymbol(10);
            }
        }
    } /**/
}

/* Add function conversion method */
window.addEventListener('load', convertToBase);
baseSelect.addEventListener('change', convertToBase);
