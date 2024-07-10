var alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
  ];
  var letter_count = 0;
  var el = document.getElementById("loading");
  var word = el.innerHTML.trim();
  var finished = false;
  var startTime = new Date().getTime(); // Track the start time
  
  el.innerHTML = "";
  for (var i = 0; i < word.length; i++) {
    el.innerHTML += "<span>" + word.charAt(i) + "</span>";
  }
  
  function write() {
    for (var i = letter_count; i < word.length; i++) {
      var c = Math.floor(Math.random() * 36);
      el.getElementsByTagName("span")[i].innerHTML = alphabet[c];
    }
    if (!finished) {
      requestAnimationFrame(write);
    }
  }
  
  function inc() {
    el.getElementsByTagName("span")[letter_count].innerHTML = word[letter_count];
    el.getElementsByTagName("span")[letter_count].classList.add("glow");
    letter_count++;
    if (letter_count >= word.length) {
      finished = true;
      setTimeout(reset, 1500);
    } else {
      requestAnimationFrame(inc);
    }
  }
  
  function reset() {
    letter_count = 0;
    finished = false;
    setTimeout(inc, 300);
    setTimeout(write, 30);
    var spans = el.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.remove("glow");
    }
  }
  
  // Delay hiding the preloader for a minimum of 3 seconds
  var preloader = document.querySelector(".preloader");
  var container = document.querySelector(".container-preloader");
  
  function hidePreloader() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    if (elapsedTime >= 3000) {
      preloader.style.animation = "fadeOut 0.5s ease";
      setTimeout(function() {
        preloader.style.display = "none";
        document.body.style.overflow = "auto"; // Restore body overflow
        container.style.display = "block"; // Show the website content
      }, 500); // Fade out time
    } else {
      setTimeout(hidePreloader, 1000 - elapsedTime);
    }
  }
  
  window.addEventListener("load", function() {
    document.body.style.overflow = "hidden"; // Hide body overflow
    write();
    setTimeout(inc, 1000); // Delay the completion of the animation after 3 seconds
    hidePreloader(); // Start hiding the preloader after 3 seconds
  });
  
  // Check if CSS is loaded after a certain delay
  var cssLoadDelay = 2000; // Adjust the delay as needed
  
  setTimeout(function() {
    var cssLoaded = false;
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].href && !sheets[i].href.includes("data:text/css")) {
        cssLoaded = true;
        break;
      }
    }
  
    if (!cssLoaded) {
      // CSS not loaded, hide everything
      preloader.style.display = "none";
      document.body.style.overflow = "hidden";
    }
  }, cssLoadDelay);
  