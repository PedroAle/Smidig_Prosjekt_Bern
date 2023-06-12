// TOGGLE SWITCH FOR opening closing chat guide
let menuOpen = false;
profilBilde.addEventListener('click', () => {
  if(!menuOpen) {
    // add the chat guide
    var popup = addChatGuide();
    // get a reference to the chat guide
/*     var popup = document.getElementById('popup'); */
    popup.classList.add('show');
    menuOpen = true;
  } else {
    //remove the chat guide
    // get a reference to the chat guide
    var popup = document.getElementsByClassName('popup-container show')[0];
    popup.remove();
    // popup.classList.remove('show');
      menuOpen = false;
  }
});


  /* --------- Functions ------------- */
  // functionality for the buttons
  function addText(text, clickedId){

    // Get reference to the popup div
    //var popup = document.getElementById('popup');
    var popup = document.getElementsByClassName('popup-container show')[0];
    // Clear the popup box and add 
    var innerDiv = popup.innerHTML = `${text}`;
    popup.id = clickedId;
    if(popup.id == "spillOgAktiviteter") {
      popup.innerHTML = `<p class="popup-content">Trykk på den aktiviteten du vil ha mer informasjon om!</p>`;
      var buttonDiv = document.createElement('div');
      buttonDiv.classList.add('button-container');
      buttonDiv.innerHTML += `<button id="escapeRoom" class="close-button" onclick="addText('Escape room tilbyr en unik opplevelse', this.id)">Escape room</button>`;
      buttonDiv.innerHTML += `<button id="arneQuiz" class="close-button" onclick="addText('Arne utfordrer til en morsom quiz', this.id)">Arne's Quiz</button>`;
      buttonDiv.innerHTML += `<button id="arneDilemma" class="close-button" onclick="addText('Test deg selv med dilemmaer', this.id)">Arne's Dilemmaer</button>`;
      buttonDiv.innerHTML += `<button id="tenkKritisk" class="close-button" onclick="addText('Tenk kritisk sammen med arne', this.id)">Tenk med Arne</button>`;
      popup.appendChild(buttonDiv);
    }
    
    if(popup.id == "sosialt") {
      popup.innerHTML = "Dette er den sosiale siden, kos deg!";
    }
    if(popup.id == "snakkMedArne"){
      popup.innerHTML = "Snakk sammen med den digitale versjonen av Arne Næss";
    }

  }

  // function to add the chat guide 
 // function to add the chat guide 
function addChatGuide(){
    var popup = document.createElement('div');
    popup.setAttribute("id","popup");
    popup.classList.add("popup-container");
    document.body.appendChild(popup);
    popup.innerHTML = `<div class="popup-content">
        <h3>ARNE:</h3>
        <p>Velg en av kategoriene nedenfor for å få mer informasjon</p>
        <div class="button-container">
          <button id="spillOgAktiviteter" class="close-button" onclick="addText('Lær om spill og aktiviteter', this.id)">Spill og Aktiviteter</button>
          <button id="sosialt" class="close-button" onclick="addText('Lær om sosialt', this.id)">Sosialt </button>
          <button id="snakkMedArne" class="close-button" onclick="addText('Du kan snakke med arne ved å klikke på snakk med arne', this.id)">Snakke med arne</button>
        </div>
      </div>`;
    return popup;
  }