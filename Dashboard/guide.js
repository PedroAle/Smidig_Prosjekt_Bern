var profilBildeContainer = document.getElementById("arne-guide-div");
var profilBilde= document.getElementById("arne-guide-image");



// the div that will be used for the chat bubble
var bubble = document.createElement("div");
bubble.id = "bubble";

// add the bubble to the document and display a welcome text
profilBildeContainer.appendChild(bubble);
bubble.innerHTML = "Velkommen!<br>Trykk på meg for mer informasjon om siden";

// hide the div after 2 seconds and CREATE THE CHAT BOT GUIDE
setTimeout(function(){
    bubble.style.visibility = "hidden";
    // Add eventListener and function that toggles the chat bot when the image is clicked
    profilBilde.addEventListener('click', () => {
        if(bubble.style.visibility == "hidden") {
        // add the chat guide
        bubble.style.visibility = "visible";
        addChatGuide();
        } else {
        //remove the chat guide
        bubble.innerHTML = "";
        bubble.style.visibility = "hidden";
        }
    });
    // addChatGuide();
},2000);




/* ---------------Functions--------------- */
function toggleChatBubble(){
    if(bubble.style.visibility == "visible"){
      bubble.style.visibility = "hidden";
    }
    else if(bubble.style.visibility == "hidden"){
      bubble.style.visibility = "visible";
      
    }
  }

function addChatGuide(){
/*     var popup = document.createElement('div');
    popup.setAttribute("id","popup");
    popup.classList.add("popup-container");
    document.body.appendChild(popup); */
    bubble.innerHTML = `<div class="popup-content">
        <h3>ARNE:</h3>
        <p>Velg en av kategoriene nedenfor for mer informasjon</p>
        <div class="bubble-buttons-container">
            <button id="spillOgAktiviteter" class="guide-button" onclick="addText('Lær om spill og aktiviteter', this.id)">Spill og Aktiviteter</button>
            <button id="sosialt" class="guide-button" onclick="addText('Lær om sosialt', this.id)">Sosialt</button>
            <button id="snakkMedArne" class="guide-button" onclick="addText('Du kan snakke med Arne ved å klikke på snakk med Arne', this.id)">Snakk med Arne</button>
        </div>
        </div>`;
}

// functionality for the buttons
function addText(text, clickedId){
  // Get reference to the chatBox div
  var popup = document.getElementsByClassName('popup-content')[0];
  // Replace the chat bubble's content and add the specified text 
  var innerDiv = popup.innerHTML = `${text}`;
  popup.id = clickedId;
  if(popup.id == "spillOgAktiviteter") {
    popup.innerHTML = `<p>Trykk på aktiviteten du vil ha mer informasjon om!</p>`;
    var buttonDiv = document.createElement('div');
    buttonDiv.classList.add('bubble-buttons-container');
    buttonDiv.innerHTML += `<button id="escapeRoom" class="guide-button" onclick="addText('Finn gjenstander i Arnes hytte for å utforske Tvergastein', this.id)">Escape room</button>`;
    buttonDiv.innerHTML += `<button id="arneQuiz" class="guide-button" onclick="addText('Arne utfordrer deg til en morsom quiz', this.id)">Arne's Quiz</button>`;
    buttonDiv.innerHTML += `<button id="arneDilemma" class="guide-button" onclick="addText('Test deg selv med dilemmaer! Hva ville du gjort?', this.id)">Arne's Dilemmaer</button>`;
    buttonDiv.innerHTML += `<button id="tenkKritisk" class="guide-button" onclick="addText('Tenk kritisk sammen med arne', this.id)">Tenk med Arne</button>`;
    popup.appendChild(buttonDiv);
  }
  
  if(popup.id == "sosialt") {
    popup.innerHTML = "Tilpass din Avatar, gå til diskusjonsRom og se hvem som har høyest poengsum!";
  }
  if(popup.id == "snakkMedArne"){
    popup.innerHTML = "Snakk sammen med den digitale versjonen av Arne Næss";
  }

}