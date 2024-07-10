// Add active class to the current button (highlight it)
var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    if (!isLocked) {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    }
  });
}

var isLocked = false;
var lockedClass = 'locked';

function toggleLock(checked) {
  isLocked = checked;
  var header = document.getElementById("myDIV");
  if (isLocked) {
    header.classList.add(lockedClass);
  } else {
    header.classList.remove(lockedClass);
  }
}

var divs = ["Menu1", "Menu2", "Menu3", "Menu4", "Menu5", "Menu6", "Menu7"];
var visibleDivId = null;

function toggleVisibility(divId) {
  if (isLocked) {
    return;
  }
  
  if (visibleDivId === divId) {
    // If the clicked section is already visible, don't do anything
    return;
  }
  
  visibleDivId = divId;
  hideNonVisibleDivs();
}

function hideNonVisibleDivs() {
  var i, divId, div;
  for (i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if (visibleDivId === divId) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }
}