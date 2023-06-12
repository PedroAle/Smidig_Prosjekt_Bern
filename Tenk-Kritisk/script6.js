const categories = [
    {
    name: 'Kategori',
    },
    {
      name: 'Arne Næss Fakta',
      statements: [
        { text: 'Arne Næss vaar en fotballspiller', correct: false },
        { text: 'Arne Næss var en fjellklatrer', correct: true },
        { text: 'Arne Næss var en tegneseriefigur', correct: false },
        { text: 'Arne Næss var en dypøkolog', correct: true },
        { text: 'Arne Næss var amerikaner', correct: false }
      ]
    },
    {
      name: 'Dypøkologi',
      statements: [
        { text: 'Mennesket har ingen rett til å redusere rikheten og mangfoldet med unntak av å dekke vitale behov.', correct: true },
        { text: 'Oppblomstringen av menneskelig liv og kultur er forenlig med en betydelig nedgang i den menneskelige befolkningen. Oppblomstringen av ikke-menneskelig liv krever en slik nedgang.', correct: true },
        { text: 'Dypøkologi argumenterer for at mennesker ikke har ansvar for å opprettholde eller forbedre miljøet, da naturen kan regulere seg selv uten menneskelig innblanding', correct: false },
        { text: 'Dypøkologi forbyr bruk av medisiner og helsetjenester, og støtter kun alternative helbredelsesmetoder', correct: false },
        { text: 'Rikdom og mangfold av livsformer er verdier i seg selv og bidrar til blomstringen av menneskelig og ikke-menneskelig liv på jorden.', correct: true }
      ]
    },
    {
        name: "Spinoza",
        statements: [
            { text: 'Spinoza postulerte at mennesker er overflødige i naturen og at deres handlinger kun forstyrrer økosystemets naturlige balanse.', correct: false},
            { text: 'Spinoza argumenterte for at Gud og naturen er én og samme ting, og at mennesker oppnår sann lykke gjennom å handle i tråd med naturens lover', correct: false},
            { text: 'Spinozas filosofi understreker at mennesker har en guddommelig rett til å utnytte og kontrollere naturen uten konsekvenser for økosystemet.', correct: false},
            { text: 'Spinoza understreket betydningen av å handle i tråd med naturens lover for fred og harmoni. Han oppfordret til å forstå og tilpasse seg naturens krefter, noe som kan øke vår bevissthet om vår plass og ansvar i økosystemet.', correct: true},
            { text: 'Spinoza mente at mennesket kan erkjenne verdien og skjønnheten i økosystemet og oppnå en økologisk bevissthet gjennom dypere forståelse av naturen.', correct: true},
        ]
    }
  ];
  
  const checkButton = document.getElementById('checkButton');
  const categorySelect = document.getElementById('categorySelect');
  const guessInput = document.getElementById('guessInput');
  const resultDiv = document.getElementById('result');
  const statementsContainer = document.getElementById('statements');
  

  // Display the resultDiv when checkbutton is pressed:
 checkButton.onclick = () => {
  resultDiv.style.visibility = "visible";

  // or Hide the div when clicked on
  resultDiv.onclick = () => resultDiv.style.visibility = "hidden";
  // Hide the div when clicked outside
  const handleClickOutside = (event) => {
    const targetElement = event.target;
    if (!resultDiv.contains(targetElement) && targetElement !== checkButton) {
      resultDiv.style.visibility = "hidden";
      document.removeEventListener('click', handleClickOutside);
    }
  };

  document.addEventListener('click', handleClickOutside);
};
  
  // Populate the category select options
  categories.forEach((category, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
  
  categorySelect.addEventListener('change', displayStatements);
  checkButton.addEventListener('click', checkAnswers);
  
  let latestCompletedCategory = -1; // Initialize the latest completed category
  let attemptsCount = 0; // Initialize the attempts count
  const totalAttemptsDiv = document.getElementById('totalAttempts');
  const statementButtons = document.getElementsByClassName('statement');
  
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
  
    // Update the result if a new category is completed
    if (categoryId > latestCompletedCategory) {
      resultDiv.textContent = '';
      latestCompletedCategory = categoryId;
    }
  
    // Re-enable the check button and statement click events
    checkButton.disabled = false;
    enableStatements();
  }
  
  function checkAnswers() {
    attemptsCount++; // Increment the attempts count
    const categoryId = parseInt(categorySelect.value);
    const selectedCategory = categories[categoryId];
    const guessList = Array.from(document.querySelectorAll('.statement.selected')).map(statement => parseInt(statement.dataset.statementIndex));
    const validGuesses = guessList.filter(guess => guess >= 0 && guess < selectedCategory.statements.length);
  
    if (validGuesses.length === 0) {
      resultDiv.textContent = 'Du må velge minst et svar!';
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


  