const colors = require('colors')
const readline = require('readline')
const randomWordFR = require('random-word-fr');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.clear()
const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

//Alphabet génération
//const alpha = Array.from(Array(26)).map((e, i) => i + 65);
//const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
//console.log(alphabet);


const pendu = ["","|","\n|\n|","\n|\n|\n|"," __\n|\n|\n|"," __\n|  0\n|\n|"," __\n|  0\n|  |\n|"," __\n|  0\n| -|\n|"," __\n|  0\n| -|-\n|"," __\n|  0\n| -|-\n| /", " __\n|  0\n| -|-\n| / \\"]
const word = randomWordFR()
const mot = []
for(n=0;n<word.length;n++) {
    if(word.slice(n,n+1) == 'é') mot.push('e')
    else if(word.slice(n,n+1) == 'è') mot.push('e')
    else if(word.slice(n,n+1) == 'ê') mot.push('e')
    else if(word.slice(n,n+1) == 'î') mot.push('i')
    else if(word.slice(n,n+1) == 'à') mot.push('a')
    else if(word.slice(n,n+1) == 'ç') mot.push('c')
    else if(word.slice(n,n+1) == 'û') mot.push('u')
    else if(word.slice(n,n+1) == 'ù') mot.push('u')
    else if(word.slice(n,n+1) == 'ô') mot.push('o')
    else mot.push(word.slice(n,n+1))
    
}
console.log("Pendu:".green + pendu[0] + '\n')


let number = 0;
let phrase = [];
let essaye = [];

for(i=0;i<mot.length;i++) {
    phrase.push('_')
}
function question() {
    console.log("Mot:\n".green + phrase.join(" "))
    if(pendu.length == (number + 1)) {console.log(`Perdu le mot était ${mot.join("")}`.red);process.exit()}
    function question2() {
        rl.question("Lettres:\n\n".green + `Lettre ? (Déjà essayé: ` + `${essaye.join(", ")}`.red + `) `, function(rep) {
        if(rep.length >= 2) question2()
        else if(essaye.includes(rep)) question2()
        else if(!alphabet.includes(rep)) question2()
        else {essaye.push(rep);main(rep); }
    })
}
question2()
}

function main(letter) {
    let is = "nope"
    for(y=0;y<=phrase.length;y++) {
        if(mot[y] == letter) {phrase[y] = letter; is = "yep"}
    }
    if(is == "nope") number++
    if(phrase.indexOf('_') != -1) {console.log("Pendu:\n".green + pendu[number]); question()}
    else {console.log(`Bien joué ! Le mot était ${phrase.join("")}`.green);process.exit()
}
}

question()