// Get the logout button
const logoutButton = document.getElementById('logoutButton');

// Add click event listener to the logout button
logoutButton.addEventListener('click', function(event) {
  event.preventDefault();  // Prevent the default behavior of the link

  // Clear user session data (this could be from localStorage, sessionStorage, or cookies)
  localStorage.removeItem('authToken');  // Assuming an auth token is stored in localStorage
  localStorage.removeItem('user');       // Any other user-related data
  sessionStorage.clear();                // You can also clear sessionStorage if you use it

  // Optionally, you can clear cookies if necessary
  // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to login page (or another page like the home page)
  window.location.href = "login.html";  // Change the URL to your login page
});
