document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear the logged-in status from localStorage
    localStorage.removeItem('loggedIn');
  
    // Redirect the user back to the login page
    window.location.href = 'index.html';
  });
  

  