// Handle Profile Form Submission
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Here you would send the updated profile data to the backend (e.g., using fetch API)
    console.log("Profile Updated:", { username, email, phone });
    alert("Profile updated successfully!");
  });
  
  // Handle Password Form Submission
  document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Simple validation
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
  
    // Here you would send the new password to the backend to update it
    console.log("Password Updated:", { currentPassword, newPassword });
    alert("Password updated successfully!");
  });
  
  // Handle Notification Preferences Form Submission
  document.getElementById('notificationsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;
  
    // Here you would update notification preferences in the backend
    console.log("Notification Preferences Updated:", { emailNotifications, smsNotifications });
    alert("Notification preferences updated successfully!");
  });
  
  // Handle Pet Info Form Submission
  document.getElementById('petForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const petName = document.getElementById('petName').value;
    const petAge = document.getElementById('petAge').value;
    const petType = document.getElementById('petType').value;
  
    // Here you would send the updated pet data to the backend
    console.log("Pet Info Updated:", { petName, petAge, petType });
    alert("Pet information updated successfully!");
  });
  