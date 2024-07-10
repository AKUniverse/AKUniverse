// Check if the user is already logged in
if (localStorage.getItem('loggedIn') === 'true') {
    // Redirect the user to the welcome page
    window.location.href = 'welcome.html';
  }
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Check if the username and password match the predefined values
    if (username === 'admin' && password === 'admin') {
      // Set logged-in status
      localStorage.setItem('loggedIn', 'true');
  
      // Redirect to the welcome page
      window.location.href = 'welcome.html';
    } else {
      alert('Incorrect username or password. Please try again.');
    }
  });

  
  
  
  
 



  
  