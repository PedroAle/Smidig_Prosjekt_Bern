document.addEventListener("DOMContentLoaded", function() {
    var bubble = document.getElementById("bubble");

    setTimeout(function() {
        bubble.style.display = "none";
    }, 5000);
});

document.addEventListener('DOMContentLoaded', (event) => {
    let key = document.getElementById('key');
    let bone = document.getElementById('bone');
    let ink = document.getElementById('ink');
    let book = document.getElementById('book');
    let gear = document.getElementById('gear');
    let nextRoom = document.getElementById('nextRoom');
    let hasKey = false;
    let hasBone = false;
    let hasInk = false;
    let hasBook = false;
    let hasGear = false;
    let slot1 = document.getElementById('slot1');
    let slot2 = document.getElementById('slot2');
    let slot3 = document.getElementById('slot3');
    let slot4 = document.getElementById('slot4');
    let slot5 = document.getElementById('slot5');
    let bubble = document.getElementById('bubble');

    key.addEventListener('click', () => {
        key.style.display = 'none';
        hasKey = true;

        // Show the guide's speech bubble with a message about the key
        bubble.innerText = 'Du fant en nøkkel. Godt jobbet!';
        bubble.style.display = 'block';

        // Hide the speech bubble after 3 seconds
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);

        // Add key to the first slot in inventory
        slot1.style.backgroundImage = 'url("key.png")';
        slot1.style.backgroundSize = '65%';
        slot1.style.backgroundRepeat = 'no-repeat';
        slot1.style.backgroundPosition = 'center';
    });

    bone.addEventListener('click', () => {
        bone.style.display = 'none';
        hasBone = true;

        // Show the guide's speech bubble with a message about the bone
        bubble.innerText = 'Du fant et bein! *burp* Husk at det er viktig å gi dyrene plass i naturen...';
        bubble.style.display = 'block';

        // Hide the speech bubble after 3 seconds
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);

        // Add bone to the second slot in inventory
        slot2.style.backgroundImage = 'url("imgbin_dog-bone-png.png")';
        slot2.style.backgroundSize = '70%';
        slot2.style.backgroundRepeat = 'no-repeat';
        slot2.style.backgroundPosition = 'center';
    });

    ink.addEventListener('click', () => {
        ink.style.display = 'none';
        hasInk = true;

        // Show the guide's speech bubble with a message about the ink and paper
        bubble.innerText = 'Se hva du fant! *burp* Dette bruker jeg til å skrive ned tankene mine';
        bubble.style.display = 'block';

        // Hide the speech bubble after 3 seconds
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);

        // Add ink and paper to the third slot in inventory
        slot3.style.backgroundImage = 'url("inkpaper.png")';
        slot3.style.backgroundSize = '85%';
        slot3.style.backgroundRepeat = 'no-repeat';
        slot3.style.backgroundPosition = 'center';
    });

    book.addEventListener('click', () => {
        book.style.display = 'none';
        hasBook = true;

        // Show the guide's speech bubble with a message about the book
        bubble.innerText = 'Dagboka mi! Her noterer jeg meg viktig ting jeg må huske på...';
        bubble.style.display = 'block';

        // Hide the speech bubble after 3 seconds
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);

        // Add book to the fourth slot in inventory
        slot4.style.backgroundImage = 'url("book.png")';
        slot4.style.backgroundSize = '70%';
        slot4.style.backgroundRepeat = 'no-repeat';
        slot4.style.backgroundPosition = 'center';
    });

    gear.addEventListener('click', () => {
        gear.style.display = 'none';
        hasGear = true;

        // Show the guide's speech bubble with a message about the climbing gear
        bubble.innerText = 'Du fant klatreutstyret mitt! *burp* Det er befriende å klatre i fjell!';
        bubble.style.display = 'block';

        // Hide the speech bubble after 3 seconds
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);

        // Add climbing gear to the fifth slot in inventory
        slot5.style.backgroundImage = 'url("climbgear.png")';
        slot5.style.backgroundSize = '160%';
        slot5.style.backgroundRepeat = 'no-repeat';
        slot5.style.backgroundPosition = 'center';
    });

    nextRoom.addEventListener('click', () => {
        if (!hasKey || !hasBone || !hasInk || !hasBook || !hasGear) {
            bubble.innerText = 'Du må finne alle objektene før du kan gå videre!';
            bubble.style.display = 'block';
    
            // Hide the speech bubble after 3 seconds
            setTimeout(() => {
                bubble.style.display = 'none';
            }, 5000);
        } else {
            // If the user has found all the required items, they can move to the next room
            bubble.innerText = 'Bra jobbet! La oss gå videre til neste rom!';
            bubble.style.display = 'block';
           

            // Store the inventory data in localStorage
            localStorage.setItem('hasKey', hasKey);
            localStorage.setItem('hasBone', hasBone);
            localStorage.setItem('hasInk', hasInk);
            localStorage.setItem('hasBook', hasBook);
            localStorage.setItem('hasGear', hasGear);

            window.location.href = '/TvergasteinsHemmeligheter/room2.html'; // Redirect to the next room
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            toggleInventory();
        }
    });

    // Function for hiding of the inventory
    function toggleInventory() {
        let inventory = document.getElementById('inventory');
        inventory.classList.toggle('hidden');
    }
});
