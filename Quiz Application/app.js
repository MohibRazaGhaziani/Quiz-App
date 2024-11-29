const quizQuestions = [
    {
        id: 1,
        question: "Q1 : HTML stands for?",
        options: {
            a: "Hyper Text Markup Language",
            b: "Hyper Text Programming Language",
            c: "Hyper Text Styling Language",
            d: "Hyper Text Scripting Language"
        },
        answer: "Hyper Text Markup Language"
    },
    {
        id: 2,
        question: "Q2 : Which language is used for styling web pages?",
        options: {
            a: "HTML",
            b: "CSS",
            c: "JavaScript",
            d: "PHP"
        },
        answer: "CSS"
    },
    {
        id: 3,
        question: "Q3 : Which of these is a JavaScript framework?",
        options: {
            a: "Django",
            b: "React",
            c: "Laravel",
            d: "Bootstrap"
        },
        answer: "React"
    },
    {
        id: 4,
        question: "Q4 : Which tag is used to define a hyperlink in HTML?",
        options: {
            a: "link",
            b: "a",
            c: "href",
            d: "url"
        },
        answer: "a"
    },
    {
        id: 5,
        question: "Q5 : Which company developed JavaScript?",
        options: {
            a: "Microsoft",
            b: "Netscape",
            c: "Oracle",
            d: "Sun Microsystems"
        },
        answer: "Netscape"
    },
    {
        id: 6,
        question: "Q6 : Which of these is not a programming language?",
        options: {
            a: "Python",
            b: "HTML",
            c: "Java",
            d: "C++"
        },
        answer: "HTML"
    },
    {
        id: 7,
        question: "Q7 : What does CSS stand for?",
        options: {
            a: "Creative Style Sheets",
            b: "Cascading Style Sheets",
            c: "Colorful Style Sheets",
            d: "Cascading Script Sheets"
        },
        answer: "Cascading Style Sheets"
    },
    {
        id: 8,
        question: "Q8 : Which HTML tag is used to display an image?",
        options: {
            a: "img",
            b: "image",
            c: "picture",
            d: "src"
        },
        answer: "img"
    },
    {
        id: 9,
        question: "Q9 : Which HTML tag is used to define a table?",
        options: {
            a: "table",
            b: "thead",
            c: "tr",
            d: "tb"
        },
        answer: "table"
    },
    {
        id: 10,
        question: "Q10 : Which one is not a JavaScript data type?",
        options: {
            a: "String",
            b: "Boolean",
            c: "Object",
            d: "Function"
        },
        answer: "Function"
    }
];

var questionElement = document.getElementById("questionElement");
var optionElement = document.getElementById("optionElement");
var nextBtn = document.getElementById("nextBtn");
var currentQuesCount = document.getElementById("currentQuesCount");
var totalCount = document.getElementById("totalCount");
totalCount.innerHTML = quizQuestions.length;
var indexNumber = 0;

var correctAns = 0;
var wrongAng = 0;

var quizContainer = document.getElementById("quizContainer");

function handle() {
    var optionsObj = quizQuestions[indexNumber].options;
    questionElement.innerHTML = quizQuestions[indexNumber].question;
    optionElement.innerHTML = "";
    // option render krne k liye UI pr Ul k child
    for (var key in optionsObj) {
        optionElement.innerHTML += `<li onclick="checkAnswer(this)" >${optionsObj[key]}</li>`;
    }

    // number counting
    currentQuesCount.innerHTML = indexNumber + 1;
}

function nextQues() {
    // index number hamesha array k index pr increase ho bs
    if (indexNumber < quizQuestions.length - 1) {
        nextBtn.disabled = true;
        indexNumber++;
        handle();
    } else {
        console.log("form SUBMIT");
        console.log("correctAns", correctAns);
        console.log("wrongAng", wrongAng);
        console.log((correctAns / quizQuestions.length) * 100);
        quizContainer.style.display = "none";
        var resultContainer = document.getElementById("resultContainer");
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `<h1>  Correct Answers: ${correctAns} </h1>
        <h1>  Wrong Answers: ${wrongAng} </h1>
        <h1>  Percentage: ${(correctAns / quizQuestions.length) * 100}% </h1>`;
        var text = document.getElementById("text");
        text.style.display = "block";
        text.innerHTML = '* Your Response has been Accepted *';
        min.style.display = "none";
        sec.style.display = "none";
    }
}

function checkAnswer(element) {
    // jitne b LI hai on sub ko get kr lihya kaha sy => UL k child sy
    var allLiElement = optionElement.children;

    var userSelection = element.innerHTML.toLowerCase();
    console.log("userSelection", userSelection);
    var ans = quizQuestions[indexNumber].answer.toLowerCase();
    var result = userSelection === ans;

    console.log("result", result);
    if (result) {
        element.style.backgroundColor = "green";
        correctAns++;
    } else {
        wrongAng++;
        element.style.backgroundColor = "red";

        for (var i = 0; i < allLiElement.length; i++) {
            if (allLiElement[i].innerHTML.toLowerCase() == ans) {
                allLiElement[i].style.backgroundColor = "green";
                break;
            }
        }
    }

    for (var i = 0; i < allLiElement.length; i++) {
        allLiElement[i].style.pointerEvents = "none";
    }
    nextBtn.disabled = false;
}

var min = document.getElementById("min");
var sec = document.getElementById("sec");
var timerMin = 4;
var timerSec = 59;
var interval = setInterval(timer, 1000);

function timer() {
    sec.innerHTML = timerSec < 10 ? "0" + timerSec : timerSec; // Format seconds to always have two digits
    min.innerHTML = timerMin < 10 ? "0" + timerMin : timerMin; // Format minutes to always have two digits

    timerSec--; // Decrease seconds by 1

    console.log("timerSec", timerSec);
    console.log("timerMin", timerMin);

    if (timerSec < 0) {
        timerSec = 59; // Reset seconds to 59
        timerMin--; // Decrease minutes by 1

        // Check if the time is up
        if (timerMin < 0) {
            clearInterval(interval); // Stop the timer when minutes are 0
            console.log("Time's up!");
            nextQues(); // Call the nextQues function if you want to automatically proceed
        }
    }
}
