const baseSelect = document.getElementById('base select');
const disp = document.getElementById('disp_text');

function convertToBase() {
    let btns = document.getElementsByClassName('dgt');

    if(btns.length < baseSelect.value) {
        for(let i = btns.length; i < baseSelect.value; i++) {
            let btn = document.createElement('button');
            btn.innerHTML = i;
            btn.className = 'dgt'
            document.getElementById('digits').appendChild(btn);
        }
    } else if(btns.length > baseSelect.value) {
        for(let i = btns.length - 1; i >= baseSelect.value; i--) {
            btns[i].remove();
        }
    }
    disp.innerHTML = baseSelect.value;
}

window.addEventListener('load', convertToBase);
baseSelect.addEventListener('change', convertToBase);
