let voices = []; // global array
window.speechSynthesis.onvoiceschanged = () => {
    // Get List of Voices
    voices = window.speechSynthesis.getVoices();
};

let arr = ["William is clever"]


function speech(text) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-GB'
    speechSynthesis.speak(msg);
    
}

function getWord(arr) {
    let x = Math.floor(Math.random() * arr.length);
    //console.log(x)
    localStorage.setItem("itemForSpeech", arr[x]);
}
document.getElementById('speech').onclick = () => {
    let x = localStorage.getItem("itemForSpeech");
    speech(x);
    
}

document.getElementById('enter').onclick = () => {
    let x = localStorage.getItem("itemForSpeech").toLowerCase();
    let input = document.getElementById('input').value.toLowerCase()
    if (input === x) {
        alert("Well done. Let's move on to next one.")
        window.location="./index.html"
    } else {
        alert("The correct answer is '" + x + "'.")
        window.location="./index.html"
    }
}
