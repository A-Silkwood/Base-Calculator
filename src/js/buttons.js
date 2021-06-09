const baseSelect = document.getElementById('base select');
const disp = document.getElementById('disp_text');

function getNumSymbol(val) {
    if(val >= 0 && val <= 9) {
        return '' + val;
    } else if(val > 9 && val < 36) {
        let symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return symbols[val - 10];
    } else {
        return 'Err';
    }
}

/* Functions */

let operation = '';
let result = '';
let needInput = false;
let newNum = true;

function evaluate(e) {
    /* result = EVAL */

    disp.innerText = isNaN(result) ? 'Err' : result;

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

document.getElementById('clr').onclick = function() {
    operation = '';
    result = '';
    needInput = false;
    newNum = true;
    disp.innerText = '0';
};

/* Digits */

/* Button Press */
function digitPress(e) {
    if(newNum) {
        disp.innerText = e.target.innerHTML;
        newNum = false;
        needInput = false;
    } else {
        disp.innerText += e.target.innerHTML;
    }
}
document.getElementById('zero').onclick = function() {
    if(newNum) {
        disp.innerText = this.innerHTML;
        needInput = false;
    } else {
        disp.innerText += this.innerHTML;
    }
};
document.getElementById('one').onclick = digitPress;

/* Adjust digit button layout based on current number base */
let isDuodecimal = false;
function convertToBase() {
    /* Match digit buttons to current number base */
    let btns = document.getElementsByClassName('dgt');
    if(btns.length < baseSelect.value) {
        for(let i = btns.length; i < baseSelect.value; i++) {
            let btn = document.createElement('button');
            btn.innerHTML = getNumSymbol(i);
            btn.className = 'dgt'
            btn.onclick = digitPress;
            document.getElementById('digits').appendChild(btn);
        }
    } else if(btns.length > baseSelect.value) {
        for(let i = btns.length - 1; i >= baseSelect.value; i--) {
            btns[i].remove();
        }
    }

    /* resize buttons */
    {
        let cols = 1;
        while (baseSelect.value > (cols * (cols + 1))) {
            cols++;
        }
        let rows = Math.ceil(baseSelect.value / cols);
        let w = (100 / cols) + '%';
        let h = (100 / rows) + '%';

        btns = document.getElementsByClassName('dgt');
        for (let btn of btns) {
            btn.style.width = w;
            btn.style.height = h;
        }
    }

    /* Special duodecimal cases */
    if(isDuodecimal !== (+baseSelect.value === 12)) {
        isDuodecimal = +baseSelect.value === 12;
        if(isDuodecimal) {
            btns[10].innerHTML = 'X';
            btns[11].innerHTML = 'E';
        } else {
            if(baseSelect.value >= 12) {
                btns[11].innerHTML = getNumSymbol(11);
            }
            if(baseSelect.value >= 11) {
                btns[10].innerHTML = getNumSymbol(10);
            }
        }
    }
}

window.addEventListener('load', convertToBase);
baseSelect.addEventListener('change', convertToBase);
