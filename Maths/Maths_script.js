
window.onload = function () {
    count();
    let x = document.getElementById('container_2');
    x.style.display = "none";
    let y = document.getElementById('container_for_table');
    y.style.display = "none";
    let z = document.getElementById('data');
    z.style.display = "none";
    //setChart();
}

function starting() {
    // validation of the form
    let first_num_input = document.getElementById('first_num');
    let second_num_input = document.getElementById('second_num');
    let operator = document.querySelector('input[name="operator"]:checked');
    if (first_num_input.validity.valid && second_num_input.validity.valid && operator != null) {
        console.log(first_num_input.validity);
        console.log(second_num_input.validity);
        console.log(operator.validity);
        let x = document.getElementById('container_1');
        x.style.display = "none";
        let y = document.getElementById('container_2');
        y.style.display = "block";
        let z = document.getElementById('description');
        z.style.display = "none";
        setting_question();
    } else {
        alert("Fill in the gaps while satisfying the requirement");
    }
}

function view_table() {
    let x = document.getElementById('container_2');
    x.style.display = "none";
    let y = document.getElementById('container_for_table');
    y.style.display = "block";
    let z = document.getElementById('data');
    z.style.display = "none";
    let a = document.getElementById('container_1');
    a.style.display = "none";
    setting_the_table();
}
function view_records() {
    let x = document.getElementById('container_2');
    x.style.display = "none";
    let y = document.getElementById('data');
    y.style.display = "block";
    let z = document.getElementById('container_for_table');
    z.style.display = "none";
    let a = document.getElementById('container_1');
    a.style.display = "none";
    //setChart();
}


function get_random_integer(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function setting_question() {
    let first_num_input = document.getElementById('first_num').value;
    let second_num_input = document.getElementById('second_num').value;
    let operator = document.querySelector('input[name="operator"]:checked').value;
    let first_number_max = Math.pow(10, Number(first_num_input));
    let first_number_min = Math.pow(10, Number(first_num_input - 1));
    let second_number_max = Math.pow(10, Number(second_num_input));
    let second_number_min = Math.pow(10, Number(second_num_input - 1));
    // stuff we need
    let first_number = get_random_integer(first_number_min, first_number_max);
    let second_number = get_random_integer(second_number_min, second_number_max)
    document.getElementById('question').innerHTML = first_number.toString() + operator + second_number.toString();
    document.getElementById('answer').value = "";
}

function evaluating() {
    let first_num_input = document.getElementById('first_num').value;
    let second_num_input = document.getElementById('second_num').value;
    let operator = document.querySelector('input[name="operator"]:checked').value;
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    const today = new Date();
    //                                  as January = 0
    let date = today.getDate()+"-"+(today.getMonth()+1) + "-" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes();
    let message = {
        Date: date,
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
            count();
        } else {
            alert("Sorry, please try again.")
            message.Answer = "Incorrect";
            writing_record(message);
            document.getElementById('answer').value = "";
            count();
        }
    } else if (eval(question) === Number(answer)){
        alert("Well done. Let's move on to next one.")
        message.Answer = "Correct";
        writing_record(message);
        setting_question();
        count();
    } else {
        alert("Please try again.");
        message.Answer = "Incorrect";
        writing_record(message);
        document.getElementById('answer').value = "";
        count();
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

function count() {
    let array = JSON.parse(localStorage.getItem('record'));
    let correct = 0;
    let incorrect = 0;
    let total_today = 0;
    let notTwoTimesThree = 0;

    const today = new Date();
    let date = today.getDate()+"-"+(today.getMonth()+1) + "-" + today.getFullYear();

    for(let i = 0; i < array.length; i++){
        if (array[i].Date === date) {
           total_today++;
           document.getElementById('total_today').value = total_today;
        }
        if (array[i].Date === date && array[i].Answer === "Correct") {
            correct++;
            document.getElementById('value-correct').value = correct;
        }


        if (array[i].Date === date && array[i].Answer === "Incorrect") {
            incorrect++;
            document.getElementById('value-incorrect').value = incorrect;
        }
        if (array[i].Date === date &&
            array[i].Question !== "2 digit(s) *3 digit(s)" &&
            array[i].Question !== "3 digit(s) *2 digit(s)")
        {
            notTwoTimesThree++;
            document.getElementById('non_2*3').style.display = "block";
            document.getElementById('non_2*3_label').style.display = "block";
            document.getElementById('non_2*3').value = notTwoTimesThree;
        }
    }
}
/*
 function setChart() {
    const labels = [
        '3 x 2 digits',
        'Other',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Correct questions that have done today',
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                /* Other nice colours
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'*/
            /*
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            */
            /* Other nice colours
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [889, 111],
            }]
            };
    const config = {
    type: 'pie',
    data: data,
    options: {},
    };
    const myChart = new Chart(
    document.getElementById('myChart'),
    config,
    );
    }
*/
