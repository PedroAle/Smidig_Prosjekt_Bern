const categories = [
  {
    name: 'Arne Næss Fakta',
    statements: [
      { text: 'Arne Næss er en fotballspiller', correct: false },
      { text: 'Arne Næss var en fjellklatrer', correct: true },
      { text: 'Arne Næss er en tegneseriefigur', correct: false },
      { text: 'Arne Næss var en dypøkolog', correct: true },
      { text: 'Arne Næss var amerikaner', correct: false }
    ]
  },
  {
    name: 'Category 2',
    statements: [
      { text: 'Statement 1', correct: false },
      { text: 'Statement 2', correct: true },
      { text: 'Statement 3', correct: false },
      { text: 'Statement 4', correct: true },
      { text: 'Statement 5', correct: false }
    ]
  }
];

const checkButton = document.getElementById('checkButton');
const categorySelect = document.getElementById('categorySelect');
const guessInput = document.getElementById('guessInput');
const resultDiv = document.getElementById('result');
const statementsContainer = document.getElementById('statements');

// Populate the category select options
categories.forEach((category, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = category.name;
  categorySelect.appendChild(option);
});

categorySelect.addEventListener('change', displayStatements);
checkButton.addEventListener('click', checkAnswers);

function displayStatements() {
  const categoryId = parseInt(categorySelect.value);
  const selectedCategory = categories[categoryId];
  statementsContainer.innerHTML = '';

  selectedCategory.statements.forEach((statement, index) => {
    const p = document.createElement('p');
    p.textContent = statement.text;
    p.classList.add('statement');
    p.dataset.statementIndex = index;
    p.addEventListener('click', toggleStatement);
    statementsContainer.appendChild(p);
  });
}

let attemptsCount = 0; // Initialize the attempts count
const totalAttemptsDiv = document.getElementById('totalAttempts');
const statementButtons = document.getElementsByClassName('statement');

function checkAnswers() {
  attemptsCount++; // Increment the attempts count
  const categoryId = parseInt(categorySelect.value);
  const selectedCategory = categories[categoryId];
  const guessList = Array.from(document.querySelectorAll('.statement.selected')).map(statement => parseInt(statement.dataset.statementIndex));
  const validGuesses = guessList.filter(guess => guess >= 0 && guess < selectedCategory.statements.length);

  if (validGuesses.length === 0) {
    resultDiv.textContent = 'Please select at least one statement.';
    return;
  }

  const correctStatements = selectedCategory.statements.filter((statement, index) => statement.correct && validGuesses.includes(index));
  const correctCount = correctStatements.length;
  const incorrectGuesses = validGuesses.filter(guess => !correctStatements.some(statement => selectedCategory.statements.indexOf(statement) === guess));
  const remainingCorrectCount = selectedCategory.statements.filter(statement => statement.correct && !validGuesses.includes(selectedCategory.statements.indexOf(statement))).length;

  for (let i = 0; i < statementButtons.length; i++) {
    const statementButton = statementButtons[i];
    const statementIndex = parseInt(statementButton.dataset.statementIndex);
    statementButton.classList.remove('correct', 'incorrect');
    if (validGuesses.includes(statementIndex)) {
      if (selectedCategory.statements[statementIndex].correct) {
        statementButton.classList.add('correct');
      } else {
        statementButton.classList.add('incorrect');
      }
    }
  }

  if (correctCount === validGuesses.length && incorrectGuesses.length === 0 && remainingCorrectCount === 0) {
    resultDiv.textContent = 'Gratulerer! Alle dine svar i ' + selectedCategory.name + ' er riktige!';
    checkButton.disabled = true;
    disableStatements();
  } else {
    resultDiv.textContent = 'Du har gjettet ' + correctCount + ' av ' + validGuesses.length + ' riktige utsagn i ' + selectedCategory.name + '.';
    if (incorrectGuesses.length > 0 || remainingCorrectCount > 0) {
      resultDiv.textContent += ' Nærme! Men ikke helt korrekt, prøv igjen.';
    }
  }

  totalAttemptsDiv.textContent = 'Totale forsøk: ' + attemptsCount;
}

// Function to disable statements
function disableStatements() {
  for (let i = 0; i < statementButtons.length; i++) {
    const statementButton = statementButtons[i];
    statementButton.removeEventListener('click', toggleStatement);
    statementButton.style.pointerEvents = 'none';
  }
}

// Function to enable statements
function enableStatements() {
  for (let i = 0; i < statementButtons.length; i++) {
    const statementButton = statementButtons[i];
    statementButton.addEventListener('click', toggleStatement);
    statementButton.style.pointerEvents = 'auto';
  }
}

// Function to toggle statement selection
function toggleStatement() {
  this.classList.toggle('selected');
}

// Call displayStatements initially to show the statements
displayStatements();
