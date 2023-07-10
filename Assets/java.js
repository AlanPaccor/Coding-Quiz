var timerTag = document.querySelector(`#timerTag`); 
var timerPTag  = document.querySelector(`header`).children[1]; 
var submitScoreBtn = document.querySelector(`#submitScoreBtn`); 
var viewScoresBtn = document.querySelector(`#viewScoresBtn`);
var clearScoresBtn = document.querySelector(`#clearScoresBtn`); 
var answerButtonList = document.body.querySelector(`ul`); 
var goBackBtn = document.querySelector(`#goBackBtn`); 
var startQuizBtn = document.querySelector(`#startQuizBtn`); 
var titleTag = document.querySelector(`#title`) 


var questionObj = { 
    questions: [ 
        `Which HTML tag is used to define an unordered list?`,
        `What does CSS stand for?`,
        `What is the correct syntax for a JavaScript comment?`,
        `Which symbol is used to select elements by their class in CSS?`,
        `What is the output of the following JavaScript code: console.log(2 + 2 + "2");`,
    ],
    answers: [ 
        [`<list>`, `<ul>`, `<ol>`, `<unordered>`],
        [`Cascading Style Sheets`, `Creative Style Selector`, `Computer Style System`, `Correct Style Syntax`],
        [`<!-- This is a comment -->`, `// This is a comment`, `*** This is a comment ***`, `comment: This is a comment`],
        [`.`, `#`, `$`, `@`],
        [`"22"`, `"42"`, `4`, `"4"`] 
    ] 
}

var globalTimerPreset = 75; 


var questionIndexNumber = 0;
var timeLeft = globalTimerPreset; 
var score = 0; 
var gameEnded = true; 


function setUpGame() {
    timeLeft = globalTimerPreset; 
    timerTag.textContent = globalTimerPreset; 
    document.querySelector(`#display-scores-div`).style.display = `none`; 
    titleTag.textContent = `Unique Coding Quiz Challenge`; 
    titleTag.style.display = `block`; 
    document.querySelector(`#instructions`).style.display = `block`; 
    viewScoresBtn.style.display = `block`; 
    startQuizBtn.style.display = `block`; 
    return;
}


function startGame() {
    gameEnded = false; 
    questionIndexNumber = 0; 
    viewScoresBtn.style.display = `none` 
    startQuizBtn.style.display = `none`; 
    document.querySelector(`#instructions`).style.display = `none`; 
    timerPTag.style.display = `block`; 
    showQuestions(questionIndexNumber); 
    startTimer(); 
    return;
}


function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnded === true) { 
            clearInterval(timerInterval); 
            return;
        }
        if(timeLeft < 1) { 
            clearInterval(timerInterval); 
            endGame(); 
        }
        timerTag.textContent = timeLeft; 
        timeLeft--; 
    }, 1000); 
    return;
}


function showQuestions(currentQuestionIndex) {
    titleTag.textContent = questionObj.questions[currentQuestionIndex]; 
    createAnswerElements(currentQuestionIndex); 
    return;
}


function createAnswerElements(currentQuestionIndex) {
    answerButtonList.innerHTML = ''; 

    for (let answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++) { 
        var currentAnswerListItem = document.createElement(`li`); 
        var tempStr = questionObj.answers[currentQuestionIndex][answerIndex]; 
        if (questionObj.answers[currentQuestionIndex][answerIndex].includes(`Correct`)){
            tempStr = questionObj.answers[currentQuestionIndex][answerIndex].substring(8, questionObj.answers[currentQuestionIndex][answerIndex].length); 
            currentAnswerListItem.id = `correct`; 
        }
        currentAnswerListItem.textContent = tempStr; 
        answerButtonList.appendChild(currentAnswerListItem); 
    }
    return;
}


function nextQuestion() {
    questionIndexNumber++; 
    if (questionIndexNumber >= questionObj.questions.length){ 
        endGame(); 
    } else { 
        showQuestions(questionIndexNumber); 
    } 
    return;
}


function endGame() { 
    gameEnded = true; 
    score = timeLeft; 
    timerPTag.style.display = `none`; 
    titleTag.style.display = `none`; 
    answerButtonList.innerHTML = ''; 
    document.querySelector(`#scoreSpan`).textContent = score; 
    document.querySelector(`#submit-score-div`).style.display = `block`; 
    return;
}


function checkAnswer(event) {
    if (event.target != answerButtonList){ 
        if (!(event.target.id.includes('correct'))){ 
            timeLeft -= 10; 
        }
        nextQuestion(); 
    }
    return;
}


function storeScoreAndName() {
    var nameInput = document.querySelector(`#nameInput`);
    var tempArrayOfObjects = [];
    if (nameInput.value !== "" && nameInput.value !== null) {
        var tempObject = {
            name: nameInput.value,
            score: score,
        };
        if (window.localStorage.getItem(`highScores`) == null) {
            tempArrayOfObjects.push(tempObject);
            window.localStorage.setItem(`highScores`, JSON.stringify(tempArrayOfObjects));
        } else {
            tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highScores`));

            for (let index = 0; index <= tempArrayOfObjects.length; index++) {
                if (index == tempArrayOfObjects.length) {
                    tempArrayOfObjects.push(tempObject);
                    break;
                } else if (tempArrayOfObjects[index].score < score) {
                    tempArrayOfObjects.splice(index, 0, tempObject);
                    break;
                }
            }
            window.localStorage.setItem(`highScores`, JSON.stringify(tempArrayOfObjects));
        }
        document.querySelector(`#nameInput`).value = ``;
        score = 0;
        showHighScores();
    }
    return;
}


function showHighScores() {
    titleTag.style.display = `none`;
    startQuizBtn.style.display = `none`;
    document.querySelector(`header`).children[0].style.display = `none`;
    document.querySelector(`#instructions`).style.display = `none`;
    document.querySelector(`#submit-score-div`).style.display = `none`;
    document.querySelector(`#display-scores-div`).style.display = `block`;
    var orderedList = document.querySelector(`ol`);
    orderedList.innerHTML = ``;
    var tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highScores`));
    if (tempArrayOfObjects != null) {
        for (let index = 0; index < tempArrayOfObjects.length; index++) {
            var newLi = document.createElement(`li`);
            newLi.textContent = tempArrayOfObjects[index].name + ` - ` + tempArrayOfObjects[index].score;
            orderedList.appendChild(newLi);
        }
    } else {
        var newLi = document.createElement(`p`);
        newLi.textContent = `No High Scores`;
        orderedList.appendChild(newLi);
    }
    return;
}


function clearHighScores() {
    document.querySelector(`ol`).innerHTML = ``;
    window.localStorage.clear();
    setUpGame();
    return;
}

function init() {
    startQuizBtn.addEventListener(`click`, startGame);
    answerButtonList.addEventListener(`click`, checkAnswer);
    viewScoresBtn.addEventListener(`click`, showHighScores);
    submitScoreBtn.addEventListener(`click`, storeScoreAndName);
    clearScoresBtn.addEventListener(`click`, clearHighScores);
    goBackBtn.addEventListener(`click`, setUpGame);
    setUpGame();
    return;
}

init();
