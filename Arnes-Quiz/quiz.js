
var questions = [
    {
        question: "Hva er navnet på den greske filosofen som var læreren til Platon?",
        options: ["Aristoteles", "Sokrates", "Heraklit"],
        answer: 1
    },
    {
        question: "Hva kalles studiet av hva som er rett og galt, og hvordan vi bør handle?",
        options: ["Ontologi", "Etikk", "Epistemologi"],
        answer: 1
    },
    {
        question: "Hvilken filosof mente at 'livet uten å tenke er intet verd'?",
        options: ["Sokrates", "Platon", "Aristoteles"],
        answer: 0
    },
    {
        question: "Hva betyr begrepet 'logisk tenkning'?",
        options: ["Å tenke på en mystisk måte", "Å tenke på en måte som følger reglene for logikk og fornuft", "Å tenke uten å bruke hjernen"],
        answer: 1
    },
    {
        question: "Hvilken filosofisk metode brukes for å avdekke sannheten ved å stille spørsmål?",
        options: ["Socratiske samtaler", "Platonisk dialog", "Aristotelisk analyse"],
        answer: 0
    },
    {
        question: "Hva betyr begrepet 'rasjonalitet'?",
        options: ["Å tenke og handle uten grunn", "Å tenke og handle basert på følelser", "Å tenke og handle på en fornuftig og logisk måte"],
        answer: 2
    },
    {
        question: "Hvilken filosof mente at 'jeg tenker, derfor er jeg'?",
        options: ["Sokrates", "Descartes", "Nietzsche"],
        answer: 1
    },
    {
        question: "Hva er betydningen av begrepet 'konsekvensetikk'?",
        options: ["Å vurdere om handlinger er riktige eller gale basert på deres konsekvenser eller resultater", "Å vurdere om handlinger er riktige eller gale basert på deres intensjoner", "Å vurdere om handlinger er riktige eller gale basert på sosiale normer"],
        answer: 0
    },
    {
        question: "Hva kalles det når noen trekker en konklusjon basert på utilstrekkelig informasjon?",
        options: ["Riktig resonnement", "Feilslutning", "Kritisk tenkning"],
        answer: 1
    },
    {
        question: "Hva er betydningen av begrepet 'empirisme'?",
        options: ["Å tro at kunnskap kommer fra sanseerfaring og observasjon", "Å tro at kunnskap kommer fra åndelige åpenbaringer", "Å tro at kunnskap kommer fra logisk resonnement og intuisjon"],
        answer: 0
    }
];
    

var currentQuestion = 0;
var score = 0;

var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var nextButton = document.getElementById("next-btn");

/*  Function is responsible for displaying the current question 
    and its corresponding options in the user interface */ 

function showQuestion() {
    var question = questions[currentQuestion];
    questionElement.textContent = question.question;

    var options = question.options;
    for (var i = 0; i < options.length; i++) {
        optionsElement.children[i].firstChild.textContent = options[i];
    }
}

/*  Function with multiple elements:
    Highlight selection and remove selection. 
    It checks the answer and increments the score result.*/ 

function checkAnswer(selectedOption) {
    var question = questions[currentQuestion];
    if (selectedOption === question.answer) {
        score++;
    }
    optionsElement.classList.add("disabled");

    var options = optionsElement.children;
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove("selected");
    }

    optionsElement.children[selectedOption].classList.add("selected");
    nextButton.disabled = false;
}

/* Function with multiple elements:  
    Checks it the quiz is over or provides next question
    Resetting color on the options when next question is up*/

function nextQuestion() {
    optionsElement.classList.remove("disabled");
    nextButton.disabled = true;
    currentQuestion++;

    var options = optionsElement.children;
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove("selected");
    }

    if (currentQuestion === questions.length) {
        showResult();
    } else {
        showQuestion();
    }
}


function showResult() {
    var feedbackText = "";
  
    if (score === questions.length) {
        feedbackText = "Perfekt! Du fikk full score!";
    } else if (score >= 6 && score <= 9) {
        feedbackText = "Bra jobbet! Du fikk en god score. Klarer du alle neste gang?";
    } else {
        feedbackText = "Bedre lykke neste gang!";
    }
  
    questionElement.textContent = "Quizen er fullført! Din score: " + score + " av " + questions.length + " - " + feedbackText;
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
}



showQuestion();


