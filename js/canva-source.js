function setClipboard(value) {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
  
  function notify(type, message) {
    const id = Math.random().toString(36).substr(2, 10);
    const n = `<div id="${id}" class="notification ${type}">${message}</div>`;
    document.getElementById("notification-area").insertAdjacentHTML("beforeend", n);
    setTimeout(() => {
      document.getElementById(id)?.remove();
      enablePointerEvents();
    }, 5000);
    disablePointerEvents();
  }
  
  function notifySuccess() {
    notify("success", "Copy Successfully");
  }
  
  function disablePointerEvents() {
    const notificationContainer = document.getElementById("notification-area");
    notificationContainer.style.pointerEvents = "none";
    notificationContainer.addEventListener("transitionend", enablePointerEventsOnce);
  }
  
  function enablePointerEventsOnce() {
    const notificationContainer = document.getElementById("notification-area");
    notificationContainer.style.pointerEvents = "auto";
    notificationContainer.removeEventListener("transitionend", enablePointerEventsOnce);
  }
  
  // Enable pointer events on the notification container
  enablePointerEvents();
  
  // Disable pointer events on the notification container while animating
  document.addEventListener("animationstart", function(event) {
    if (event.animationName === "showNotification") {
      disablePointerEvents();
    }
  });
  
  
  