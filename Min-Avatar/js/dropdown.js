// Get a reference to all the buttons
var buttons = document.getElementsByClassName("attributes");



// function that displays the dropdown menu
var dropdown = document.createElement("div");
dropdown.className = "dropdown-btn";



function displayDropDown(n){
buttons[n].appendChild(dropdown);
dropdown.innerHTML = "";

}

