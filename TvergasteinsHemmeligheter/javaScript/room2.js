document.addEventListener('DOMContentLoaded', (event) => {
    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');
    let slot4 = document.getElementById('slot4');
    let slot5 = document.getElementById('slot5');
    let inventory = document.getElementById('inventory');
    let keyImage = document.getElementById('key');
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let safe = document.getElementById('safe');

    var kode1Button = document.getElementById("kode1");
    var kode2Button = document.getElementById("kode2");
    var kode3Button = document.getElementById("kode3");

    const popupContainer = document.getElementById('popup');
    popupContainer.style.display = 'none'; 

    var bubble = document.getElementById("bubble");

    setTimeout(function() {
        bubble.style.display = "none";
    }, 5000);

   
    let storedHasKey = localStorage.getItem('hasKey');
    let storedHasBone = localStorage.getItem('hasBone');
    let storedHasInk = localStorage.getItem('hasInk');
    let storedHasBook = localStorage.getItem('hasBook');
    let storedHasGear = localStorage.getItem('hasGear');

    if (storedHasKey && storedHasKey === 'true') {
        slot1.style.backgroundImage = 'none';
        
    }

    if (storedHasBone && storedHasBone === 'true') {
        slot2.style.backgroundImage = 'url("/TvergasteinsHemmeligheter/images/imgbin_dog-bone-png.png")';
        slot2.style.backgroundSize = '70%';
        slot2.style.backgroundRepeat = 'no-repeat';
        slot2.style.backgroundPosition = 'center';
    }

    if (storedHasInk && storedHasInk === 'true') {
        slot3.style.backgroundImage = 'url("/TvergasteinsHemmeligheter/images/inkpaper.png")';
        slot3.style.backgroundSize = '85%';
        slot3.style.backgroundRepeat = 'no-repeat';
        slot3.style.backgroundPosition = 'center';
    }
        

    if (storedHasBook && storedHasBook === 'true') {
        slot4.style.backgroundImage = 'url("/TvergasteinsHemmeligheter/images/book.png")';
        slot4.style.backgroundSize = '70%';
        slot4.style.backgroundRepeat = 'no-repeat';
        slot4.style.backgroundPosition = 'center';
    }

    if (storedHasGear && storedHasGear === 'true') {
        slot5.style.backgroundImage = 'url("/TvergasteinsHemmeligheter/images/climbgear.png")';
        slot5.style.backgroundSize = '160%';
        slot5.style.backgroundRepeat = 'no-repeat';
        slot5.style.backgroundPosition = 'center';
    }


    /* Following code makes it possible to drag the items around the room, and preventing drag and drop behavior.*/
    keyImage.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', ''); 
        dragOffsetX = event.clientX - keyImage.getBoundingClientRect().left;
        dragOffsetY = event.clientY - keyImage.getBoundingClientRect().top;
        isDragging = true;
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault(); 
    });

    document.addEventListener('drop', (event) => {
        inventory.classList.remove('hidden');
        event.preventDefault();
        if (isDragging) {
            let x = event.clientX - dragOffsetX;
            let y = event.clientY - dragOffsetY;
            keyImage.style.left = x + 'px';
            keyImage.style.top = y + 'px';
        }
    });

    slot1.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', '');
    
    });

    inventory.addEventListener('dragover', (event) => {
        console.log('dragover event on inventory');
        inventory.classList.add('hidden');
      });
      
      inventory.addEventListener('drop', (event) => {
        console.log('drop event on inventory');
        slot1.appendChild(keyImage);
        localStorage.setItem('hasKey', 'true');
      });
      
      slot4.addEventListener('click', toggleCodeBox);

      let codeBox = null;


      /* Function that removes the box if the code box is currently visible (exists). 
    If the code box is not visible (doesn't exist), it creates and appends it to the body of the document. */
      function toggleCodeBox() {
        if (codeBox) {
          
          codeBox.remove();
          codeBox = null;
        } else {
          
          codeBox = document.createElement('div');
          codeBox.classList.add('code-box');
          codeBox.innerHTML = `
            <h3</h3>
            <p>For en fantastisk morgen det er i dag også. Jeg startet som vanlig dagen med å klatre nok et vidunderlig fjell. Nå er jeg hjemme i hytta mi og ser på den nye "safen" jeg har anskaffet meg. Ah...Sant det! Jeg skulle jo skrive ned koden i boka. Hva var den igjen? Var det 6583??Nei nei..6..5..ehh..38. Ja. det var det! Okei, da har jeg fått gjort det jeg skulle, nå er det bare å nyte resten av dagen.</p>
          `;
      
          
          document.body.appendChild(codeBox);
        }
      }
      
 

safe.addEventListener('dragenter', handleDragEnter);
safe.addEventListener('dragover', handleDragOver);
safe.addEventListener('drop', handleDrop);


/* Two functions that adds visual changes when elements are dropped*/
function handleDragEnter(event) {
  event.preventDefault();
  
}

function handleDragOver(event) {
  event.preventDefault();
  
}

function handleDrop(event) {
    event.preventDefault();
    popupContainer.style.display = 'block';
    
}


kode1Button.addEventListener("click", function() {
  showNotification("Nei og nei! Dette er feil kode.");
});

kode2Button.addEventListener("click", function() {
  showNotification("Ikke si at jeg har glemt koden!");
});

kode3Button.addEventListener("click", function() {
  showNotification("GRATULERER! Du løste gåten.");
  setTimeout(function() {
    window.location.href = "/TvergasteinsHemmeligheter/front_page/front_page.html";
  }, 5000);
});

function showNotification(message) {
  var notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);

  setTimeout(function() {
    notification.remove();
  }, 5000);
}})
