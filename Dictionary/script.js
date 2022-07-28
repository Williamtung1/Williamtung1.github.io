
document.getElementById('button').addEventListener("click", () => {
    document.getElementById('container').innerHTML = ""
    let word = document.getElementById('input').value;
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    fetch (url)
        .then((response) => response.json())
        .then((data) => sortOutData(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    
})

function sortOutData(result) {
    let word = result[0]["word"];
    add(word, 'h1');
    add(result[0]["phonetic"], 'i')
    let meanings = result[0]['meanings'];
    console.log(result)
    add('Meanings', 'h2')
    for (let i = 0; i < meanings.length; i++) {
        add(i+1, 'h3');
        add(meanings[i]["partOfSpeech"], 'b')
        for (let j = 0; j < meanings[i]["definitions"].length; j++) {
            add(meanings[i]["definitions"][j]["definition"]);

        }
        if (meanings[i]["synonyms"][0] !== undefined) {
            add("Synonyms", 'h4')
            for (let j = 0; j < meanings[i]["synonyms"].length; j++) {
                add(meanings[i]["synonyms"][j])
            }
        }
        if (meanings[i]["antonyms"][0] !== undefined) {
            add("Antonyms", 'h4')
            for (let j = 0; j < 5; j++) {
                add(meanings[i]["antonyms"][j])
            }
        }
    }
}

function add(word, format) {
    if (format === undefined) {
        document.getElementById('container').innerHTML += `<p>` + word + `</p>`
    } else {
        document.getElementById('container').innerHTML += `<${format}>` + word + `</${format}>`
    }
}