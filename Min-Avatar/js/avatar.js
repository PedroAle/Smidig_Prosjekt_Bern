

var profilBildeContainer = document.getElementById("arne-guide-div");

// the div that will be used for the chat bubble
var bubble = document.createElement("div");
bubble.id = "bubble";

// add the bubble to the document and display a welcome text
profilBildeContainer.appendChild(bubble);
bubble.innerHTML = "Bruk knappene til venstre for å tilpasse din avatar! Eller velg en eksisterende";

setTimeout(()=>{
    bubble.remove();
},2500)