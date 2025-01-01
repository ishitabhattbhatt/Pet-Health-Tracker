document.getElementById('reminderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const petId = document.getElementById('petId').value;
    const reminderText = document.getElementById('reminderText').value;
    const reminderDate = document.getElementById('reminderDate').value;
    const reminderType = document.getElementById('reminderType').value;
  
    const response = await fetch('/add-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ petId, reminder_date: reminderDate, reminder_type: reminderType, message: reminderText }),
    });
  
    if (response.ok) {
      alert('Reminder added successfully!');
      // Optionally, refresh reminders list
    } else {
      alert('Error adding reminder');
    }
  });
  async function fetchReminders() {
    const response = await fetch('/get-reminders');
    const reminders = await response.json();
  
    const reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = ''; // Clear current list
  
    reminders.forEach(reminder => {
      const li = document.createElement('li');
      li.textContent = `${reminder.reminder_type}: ${reminder.message} on ${reminder.reminder_date}`;
      reminderList.appendChild(li);
    });
  }
  
  fetchReminders();
  