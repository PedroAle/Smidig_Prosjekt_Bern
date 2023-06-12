
/*  References to the div elements
a1 = Escape room (tvergastein hemmeligheter)
a2 = arne's quiz
a3 = Arnes dilemmaer
a4 = tenk kritisk med arne 
*/

// Reference to the speech bubble
bubble = document.getElementById("bubble");
let hideTimeout;


// main function to display text
function displayBubble(x){
    // Switch case to determine what button the user hovered and add the according text
    switch(x.id)
    {
        case "a1":
            displayText("Tvergasteins hemmeligheter byr på et utfordrende og spennende 'Escape room'!");
            break;

        case "a2":
            displayText("Test deg selv i Arne's Quiz!"); 
            break; 

        case "a3":
            displayText("Utforde vennene dine med en rekke filsofiske problemstillinger i Arne's dilemmaer!");
            break;

        case "a4":
            displayText("Klarer dere å skille fakta fra løgn? Test deg selv og tenk kritisk med Arne!");
            break;
        case "arne-button":
            displayText("Ha en fullverdig samtale med en digital gjenskapelse av Arne Næss!");
            break;


    }
}

// Function to add text to the text bubble and make it visible
function displayText(text){
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        bubble.style.visibility = "visible";
        bubble.innerHTML = text;
    }, 200);

}

// Function to hide the speech bubble with a delay
function hideBubble() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      bubble.style.visibility = "hidden";
    }, 200);
  }
