const score = document.querySelector("#score");
const qtn = document.querySelector("#qtn");
const opt = document.querySelector("#opt");
const idu = document.querySelector('#id');
const restart = document.querySelector("#Restart");
const timerDisplay = document.querySelector("#timer");
const btn = document.querySelector("#btn");
const newqtn = document.querySelector("#newqtn");
const newopt = document.querySelector("#newopt");
const correctopt = document.querySelector("#correctopt");
const addQuestion = document.querySelector("#addqtn");
let quizData = [];
//let add question throught input


// const question = [
//     {
//         id: 1,
//         Question: "Who Is The Prime Minister of India",
//         Option: ["Modi", "Rahul", "Elvish", "Maga"],
//         Answer: "Modi"
//     },
//     {
//         id: 2,
//         Question: "Who Is The Chief Minister of Haryana",
//         Option: ["Modi", "Rahul", "Elvish", "Maga"],
//         Answer: "Elvish"
//     },
//     {
//         id: 3,
//         Question: "Who Is The Prime Minister of India",
//         Option: ["Modi", "Rahul", "Elvish", "Maga"],
//         Answer: "Elvish"
//     }
// ];
const loadedData = JSON.parse(localStorage.getItem("quizData"));
quizData = loadedData;

let scores = 0;
let start = 0;
let submitted = false; // Flag to track if the user submitted

let timer;

const startTimer = () => {
    let timeLeft = 120; // 2 minutes in seconds

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            // Move to the next question when the timer runs out
            clearInterval(timer);
            checkYouAnswer(null); // Simulate no option selected
        } else {
            timerDisplay.textContent = `Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
            timeLeft--;
        }
    }, 1000);
}

const yourQuestion = () => {
    const getYourQuestion = quizData[start];

    if (getYourQuestion) {
        idu.textContent = getYourQuestion.id;
        qtn.textContent = getYourQuestion.Question;
        opt.innerHTML = "";

        getYourQuestion.Option.forEach((option, i) => {
            const optbtn = document.createElement("button");
            optbtn.textContent = option;
            optbtn.addEventListener('click', () => {
                clearInterval(timer); // Stop the timer when an option is selected
                checkYouAnswer(option);
            });
            opt.appendChild(optbtn);
        });

        startTimer();

        if (start === quizData.length - 1) {
            // Display the "Submit" button at the end of questions
            const submitButton = document.createElement("button");
            submitButton.textContent = "Submit";
            submitButton.addEventListener('click', () => submitQuiz());
            opt.appendChild(submitButton);
        }
    }
}

const checkYouAnswer = (clickedOption) => {
    const getYourQuestion = quizData[start];

    if (!submitted && getYourQuestion && clickedOption === getYourQuestion.Answer) {
        scores++;
    }

    start++;

    if (!submitted && start < quizData.length) {
        yourQuestion();
    } else if (!submitted) {
        // Show the "Restart" button after answering all questions
        restart.style.display = "block";
    }
}

const submitQuiz = () => {
    submitted = true;
    clearInterval(timer);
    // Hide the question and options when time end
    qtn.textContent = "";
    opt.innerHTML = "";

    // Display the final score
    score.textContent = `Your score: ${scores}/${quizData.length}`;
}

const mainPage = () => {
    start = 0;
    scores = 0;

    yourQuestion();
    submitted = false;

    // Hide the score and restart button
    score.textContent = "";
    restart.style.display = "none";
    // Refresh the page
    location.reload();
}
restart.addEventListener('click', mainPage);

// Initialize the quiz
yourQuestion();

//let add questions manually
const addYourQuestion = () => {

    //let add the questions
    const nqtn = newqtn.value.trim();
    const nopt = newopt.value.split(',').map(option => option.trim());
    const Cans = correctopt.value.trim();

    //newOptions.length >= 2: This part of the condition checks the length of the newOptions array. It ensures that there are at least two options provided by the user. If the length of newOptions is less than 2, the condition will be false, and the code inside the

    if (nqtn && nopt.length >= 2 && nopt.includes(Cans)) {
        const newQuizItem = {
            id: quizData.length + 1,
            Question: nqtn,
            Option: nopt,
            Answer: Cans
        };
        quizData.push(newQuizItem);
        newqtn.value = '';
        newopt.value = '';
        correctopt.value = '';
        localStorage.setItem("quizData", JSON.stringify(quizData));
    }

}

addQuestion.addEventListener('click', addYourQuestion);





// Save quiz data to local storage


// Load quiz data from local storage


// Use quizData instead of question in your code
console.log(quizData);
