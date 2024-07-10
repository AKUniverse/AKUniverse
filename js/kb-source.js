function notify(type, message) {
  (() => {
    let n = document.createElement("div");
    let id = Math.random().toString(36).substr(2, 10);
    n.setAttribute("id", id);
    n.classList.add("notification", type);
    n.innerText = message;
    document.getElementById("notification-area").appendChild(n);
    setTimeout(() => {
      var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].getAttribute("id") == id) {
          notifications[i].remove();
          break;
        }
      }
    }, 1000);
  })();
}

function copyToClipboard(text) {
  var tempTextarea = document.createElement('textarea');
  tempTextarea.style.position = 'fixed';
  tempTextarea.style.opacity = 0;

  // Replace line breaks with actual line breaks
  var textWithLineBreaks = text.replace(/<br\s*[\/]?>/gi, '\n');

  tempTextarea.value = textWithLineBreaks;

  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  document.execCommand('copy');

  document.body.removeChild(tempTextarea);

  notify('success', 'Copy Successful');
}















var buttons = document.querySelectorAll('.kb-source');
buttons.forEach(function(button) {
  var copyIcon = document.createElement('i');
  copyIcon.classList.add('fa', 'fa-copy');
  button.appendChild(copyIcon);

  button.addEventListener('click', function(event) {
    event.stopPropagation();
    var paragraph = this.querySelector('p.hidden');
    var paragraphText = paragraph ? paragraph.innerHTML.trim().replace(/<br>/g, '\n') : '';
    if (paragraphText) {
      copyToClipboard(paragraphText);
    }
  });
});

// Disable pointer events on the notification container while animating
document.addEventListener("animationstart", function(event) {
  if (event.animationName === "showNotification") {
    var notification = event.target;
    notification.parentNode.style.pointerEvents = "none";
  }
});

// Enable pointer events on the notification container after animation ends
document.addEventListener("animationend", function(event) {
  if (event.animationName === "showNotification") {
    var notification = event.target;
    setTimeout(() => {
      notification.parentNode.style.pointerEvents = "auto";
    }, 1000);
  }
});




