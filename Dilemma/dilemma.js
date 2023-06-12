// Working buttons when going to "previous" or "next" page

function goToPreviousPage() {
    history.back();
}

function goToNextPage() {
    var currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    var nextPage;

    switch (currentPage) {
        case "dilemma.html":
            nextPage = "dilemma2.html";
            break;
        case "dilemma2.html":
            nextPage = "dilemma3.html";
            break;
        case "dilemma3.html":
            nextPage = "dilemma4.html";
            break;
        case "dilemma4.html":
            nextPage = "dilemma5.html";
            break;
        case "dilemma5.html":
            nextPage = "dilemma.html";
            break;
        default:
            nextPage = "dilemma.html"; 
            break;
    }

    location.href = nextPage;
}

// Voice function when users want to listen to a dilemma

var audio = null;

function playAudio() {
  var currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  var audioFilePath;

  switch (currentPage) {
    case "dilemma.html":
      audioFilePath = "audiofiles/Gyges_sin_ring_Du_fa.mp3";
      break;
    case "dilemma2.html":
      audioFilePath = "audiofiles/Tog_Problemet_Du_bli.mp3";
      break;
    case "dilemma3.html":
      audioFilePath = "audiofiles/Livbatens_Dilemma_Du.mp3";
      break;
    case "dilemma4.html":
      audioFilePath = "audiofiles/Naturoverlevelse_Du_.mp3";
      break;
    case "dilemma5.html":
      audioFilePath = "audiofiles/Naturreservat_Du_er_.mp3";
      break;
    default:
      audioFilePath = "Dilemma/audiofiles/default_audio_file.mp3";
      break;
  }

  if (audio) {
    if (!audio.paused) {
      audio.pause();
    }
    audio.currentTime = 0;
    audio.src = audioFilePath;
    audio.play();
  } else {
    audio = new Audio(audioFilePath);
    audio.play();
  }
}

// Dropdown menu that users can choose what dilemma they want to click on
 
document.addEventListener("DOMContentLoaded", function() {
  var categorySelect = document.getElementById("categorySelect");
  var dropdownContent = document.getElementById("myDropdown");

  // Show/hide the dropdown content when the button is clicked
  categorySelect.addEventListener("click", function() {
    dropdownContent.classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function(event) {
    if (!event.target.matches(".dropbtn")) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
});