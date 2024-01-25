const inputBase = document.getElementById("layout-base");
const inputA = document.getElementById("layout-a");
const inputB = document.getElementById("layout-b");
const startButton = document.getElementById("start-button");
const field = document.getElementById("field");
const textArea = document.getElementById("text-area");
const times = document.getElementById("times");
const result = document.getElementById("result");

var layoutBase, layoutA, layoutB
var word, word1, word2;
var currw = -1, currc;
var timeWordStart;

var times1, times2;

function validate_layout(layout) {
    if(layout.length != 30) {
        return false;
    }
    if(new Set(layout).size != 30) {
        return false;
    }
    const ver = 'abcdefghijklmnopqrstuvwxyz';
    for(let i=0; i<ver.length; i++) {
        if(!layout.includes(ver[i])) return false;
    }
    return true;
}

function translate(word, base, dest) {
    let res = '';
    for(let i=0; i<word.length; i++) {
        let idx = dest.indexOf(word[i]);
        res += base[idx];
    }
    return res;
}

function random_word() {
    let s = wordlist.en.length; // from wordlist.js
    let idx = Math.floor(Math.random() * s);
    return wordlist.en[idx];
}

startButton.addEventListener("click", function(e) {
    startButton.blur();
    if(!validate_layout(inputBase.value)) {
        alert('invalid base layout');
        return;
    }
    if(!validate_layout(inputA.value)) {
        alert('invalid layout A');
        return;
    }
    if(!validate_layout(inputB.value)) {
        alert('invalid layout B');
        return;
    }
    layoutBase = inputBase.value;
    layoutA = inputA.value;
    layoutB = inputB.value;

    console.log('start', layoutBase, layoutA, layoutB);

    word = random_word();
    word1 = translate(word, layoutBase, layoutA);
    word2 = translate(word, layoutBase, layoutB);
    console.log('translate word', word, word1, word2);
    
    let word1space = word1 + ' ';
    let word2space = word2 + ' ';
    
    textArea.innerHTML = '';
    for(let i=0; i<10; i++) {
        var wordSpan = document.createElement("span");
        wordSpan.classList.add("word");
        let wordArr = word1space.split('');
        for(let j=0; j<wordArr.length; j++) {
            var span = document.createElement("span");
            span.innerHTML = wordArr[j];
            wordSpan.appendChild(span);
        }
        textArea.appendChild(wordSpan);
    }
    for(let i=0; i<10; i++) {
        var wordSpan = document.createElement("span");
        wordSpan.classList.add("word");
        let wordArr = word2space.split('');
        for(let j=0; j<wordArr.length; j++) {
            var span = document.createElement("span");
            span.innerHTML = wordArr[j];
            wordSpan.appendChild(span);
        }
        textArea.appendChild(wordSpan);
    }

    currw = 0;
    currc = 0;
    field.hidden = false;
    times1 = [];
    times2 = [];
});

function processInput(e) {
    typed = e.key;
    // console.log(typed)
    if(currw == -1) return;
    if(currw >= textArea.childNodes.length) return;
    if(textArea.childNodes[currw].childNodes[currc].innerHTML === typed) {
        textArea.childNodes[currw].childNodes[currc].classList.add("bg");
        if(currc == 0) timeWordStart = Date.now();
        currc++;
        if(currc == textArea.childNodes[currw].childNodes.length) {
            let diff = (Date.now() - timeWordStart) / 1000;
            times.innerHTML += diff + ' '
            if(currw < 10) times1.push(diff);
            else times2.push(diff);
            currc = 0;
            currw++;
        }
    }

    if(currw >= textArea.childNodes.length) {
        // display result
        times1.sort();
        times2.sort();
        let sum1 = times1[0] + times1[1] + times1[2];
        let sum2 = times2[0] + times2[1] + times2[2];
        result.innerHTML = sum1 + ' ' + sum2;
        if(sum1 < sum2) result.innerHTML += ' layout A wins';
        else result.innerHTML += ' | layout B wins';

    }
}

document.addEventListener("keydown", processInput)