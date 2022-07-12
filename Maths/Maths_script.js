"use strict";
//execute the function when the button to records
function count() {
    document.getElementById('dateInput').value = formatDate();
    countForDate();
}

function countForDate() {
    let array = JSON.parse(localStorage.getItem('record'));
    let correct = 0;
    let incorrect = 0;
    let total = 0;
    let notTwoTimesThree = 0;
    let x = document.getElementById('dateInput');
    console.log(x.value)
    for(let i = 0; i < array.length; i++){
        if (array[i].Date === x.value) {
            total++;
            document.getElementById('total').value = total;
        }
        if (array[i].Date === x.value && array[i].Answer === "Correct") {
            correct++;
            document.getElementById('value-correct').value = correct;
        }
        if (array[i].Date === x.value && array[i].Answer === "Incorrect") {
            incorrect++;
            document.getElementById('value-incorrect').value = incorrect;
        }
        if (array[i].Date === x.value &&
            array[i].Question !== "2 digit(s) *3 digit(s)" &&
            array[i].Question !== "3 digit(s) *2 digit(s)")
        {
            notTwoTimesThree++;
            document.getElementById('non_2*3').style.display = "block";
            document.getElementById('non_2*3_label').style.display = "block";
            document.getElementById('non_2*3').value = notTwoTimesThree;
        }
    }

    let questionDoneTodayCorrectly = array.filter(items => items.Date === x.value && items.Answer === "Correct");
    let result = { };
    for(let i = 0; i < questionDoneTodayCorrectly.length; ++i) {
        if(!result[questionDoneTodayCorrectly[i].Question])
            result[questionDoneTodayCorrectly[i].Question] = 0;
        ++result[questionDoneTodayCorrectly[i].Question];
    }

}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

function setInfo() {
    // validation of the form
    let first_num_input = document.getElementById('first_num');
    let second_num_input = document.getElementById('second_num');
    let operator = document.querySelector('input[name="operator"]:checked');
    if (first_num_input.validity.valid && second_num_input.validity.valid && operator != null) {
        window.location="./question.html";
        let array = [first_num_input.value, second_num_input.value, operator.value];
        localStorage.setItem('info', JSON.stringify(array));
    }
}

function get_random_integer(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function setting_question() {
    let set = JSON.parse(localStorage.getItem('info'));
    let first_num_input = set[0];
    let second_num_input = set[1];
    let operator = set[2];
    let first_number_max = Math.pow(10, Number(first_num_input));
    let first_number_min = Math.pow(10, Number(first_num_input - 1));
    let second_number_max = Math.pow(10, Number(second_num_input));
    let second_number_min = Math.pow(10, Number(second_num_input - 1));
    // stuff we need
    let first_number = get_random_integer(first_number_min, first_number_max);
    let second_number = get_random_integer(second_number_min, second_number_max);
    document.getElementById('question').innerHTML = first_number.toString() + operator + second_number.toString();
    document.getElementById('answer').value = "";
}

function evaluating() {

    let set = JSON.parse(localStorage.getItem('info'));
    let first_num_input = set[0];
    let second_num_input = set[1];
    let operator = set[2];
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    const today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    let message = {
        Date: formatDate(),
        Time: time,
        Question: first_num_input + " digit(s) " + operator + second_num_input + " digit(s)",
        Answer: "",
    };
    if (question.includes("/")) {
        let x = eval(question);
        x = Math.round(x);
        alert(x);
        if (x === Number(answer)){
            alert("Well done. Let's move on to next one.");
            message.Answer = "Correct";
            writing_record(message);
            setting_question();

        } else {
            alert("Sorry, please try again.")
            message.Answer = "Incorrect";
            writing_record(message);
            document.getElementById('answer').value = "";
        }
    } else if (eval(question) === Number(answer)){
        alert("Well done. Let's move on to next one.")
        message.Answer = "Correct";
        writing_record(message);
        setting_question();

    } else {
        alert("Please try again.");
        message.Answer = "Incorrect";
        writing_record(message);
        document.getElementById('answer').value = "";
    }
    setBar();
}

function enterAnswer() {
    let x = document.getElementById('answer');
    x.addEventListener("keydown", function(event) {
        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`)
        if (`${event.key}` === 'Enter') {
            console.log("");
            evaluating();
        }
    }, true);
}

function setBar() {
    if (localStorage.getItem('record') !== null) {
        let array = JSON.parse(localStorage.getItem('record'));
        const today = new Date();
        console.log(today.getDay())
        console.log(typeof today.getDay())
        let targetToday;
        if (today.getDay() === 0 || today.getDay() === 6) {
            targetToday = 200;
            console.log("weekends")
        } else {
            targetToday = 100;
            console.log("weekdays")
        }
        let bar = document.getElementById("progressBar");
        let width;
        let correct = 0;
        for(let i = 0; i < array.length; i++){
            if (array[i].Date === formatDate() && array[i].Answer === "Correct") {
                correct++;
            }
        }

        width = correct / targetToday * 100;
        if (width >= 100) {
            let modal = document.getElementById("modal");
            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName("close1")[0];
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside the modal, close it
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }
        } else {
            bar.style.width = width + "%";
            bar.innerHTML = String(correct);
            //bar.innerHTML = width + "%";
        }
    }
}

function writing_record(message) {
    // check if there are the record, "record"
    if (localStorage.getItem('record') == null) {
        let record = [];
        record.push(message);
        localStorage.setItem('record', JSON.stringify(record));
    } else {
        let record;
        // extract json as object/array (set)
        let set = JSON.parse(localStorage.getItem('record'));
        // turn set into an array and append the new one to it
        record = Array.from(set);
        record.push(message);
        // turn record to a string
        let x = JSON.stringify(record);
        // store the data back to 'localstorage'
        localStorage.setItem('record', x);
    }
}

function setting_the_table() {
    // set the table

    let set = JSON.parse(localStorage.getItem('record'));

    if (document.getElementById('the_table')!= null) {
        document.getElementById('the_table').remove();
    }
    const table = document.createElement('table');
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    const tr_head = document.createElement("tr");

    const th_id = document.createElement("th");
    const th_date = document.createElement("th");
    const th_time = document.createElement("th");
    const th_question = document.createElement("th");
    const th_answer = document.createElement("th");

    th_id.textContent = "id";
    th_date.textContent = "Date";
    th_time.textContent = "Time";
    th_question.textContent = "Question";
    th_answer.textContent = "Answer";

    tr_head.appendChild(th_id);
    tr_head.appendChild(th_date);
    tr_head.appendChild(th_time);
    tr_head.appendChild(th_question);
    tr_head.appendChild(th_answer);

    tableHead.appendChild(tr_head);

    let i = 0;
    const j = set.length;
    for(; i < j; i++) {
        let tr_body = document.createElement("tr");

        let td_id = document.createElement("td");
        let td_date = document.createElement("td");
        let td_time = document.createElement("td");
        let td_question = document.createElement("td");
        let td_answer = document.createElement("td");

        td_id.textContent = String(i+1);
        td_date.textContent = set[i].Date;
        td_time.textContent = set[i].Time;
        td_question.textContent = set[i].Question;
        td_answer.textContent = set[i].Answer;

        tr_body.appendChild(td_id);
        tr_body.appendChild(td_date);
        tr_body.appendChild(td_time);
        tr_body.appendChild(td_question);
        tr_body.appendChild(td_answer);

        tableBody.appendChild(tr_body);
    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    let container = document.getElementById('container_for_table');
    table.setAttribute("id", "the_table");
    container.appendChild(table);
}

function accordion() {
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}