//function that display value
function displaying (value) {
    switch (value) {
        case "+":
            document.getElementById("text").value += "+"
            break;
        case "-":
            document.getElementById("text").value += "−"
            break;
        case "*":
            document.getElementById("text").value += "×"
            break;
        case "/":
            document.getElementById("text").value += "÷"
            break;
    }
    document.getElementById("text").value += value;
}
//function that evaluate the answer and return result
function evaluating ()  {
    let input = document.getElementById("text").value;
    document.getElementById("text").value = eval(input);
}
//function that clear the display
function clear() {
    document.getElementById("text").innerHTML = "";
}
