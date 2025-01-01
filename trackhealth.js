const petName = document.getElementById('petName');
    const healthStatus = document.getElementById('healthStatus');
    const nextVaccination = document.getElementById('nextVaccination');
    const weightDisplay = document.getElementById('weightDisplay');
    const updateWeightBtn = document.getElementById('updateWeightBtn');
    const medicalRecordsList = document.getElementById('medicalRecordsList');
    const addHealthDataForm = document.getElementById('addHealthDataForm');
    const newRecordInput = document.getElementById('newRecord');
    const remindersList = document.getElementById('remindersList');

    // Initial data (could be from a backend API or local storage)
    let petData = {
      name: 'Buddy',
      status: 'Healthy',
      nextVaccination: 'Sep 25, 2024',
      weight: 25,
      medicalRecords: [
        'Vaccination - Rabies (Jan 2023)',
        'Medication - Flea Control (Ongoing)',
        'Allergy - Dust Mites'
      ],
      reminders: [
        'Vaccination: Sep 25, 2024',
        'Next Checkup: Oct 10, 2024'
      ]
    };

    // Function to update the display of pet health data
    function updateHealthDisplay() {
      petName.textContent = petData.name;
      healthStatus.textContent = petData.status;
      nextVaccination.textContent = petData.nextVaccination;
      weightDisplay.textContent = petData.weight;

      // Update medical records
      medicalRecordsList.innerHTML = '';
      petData.medicalRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = record;
        medicalRecordsList.appendChild(li);
      });

      // Update reminders
      remindersList.innerHTML = '';
      petData.reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.textContent = reminder;
        remindersList.appendChild(li);
      });
    }

    // Initial display
    updateHealthDisplay();

    // Update weight functionality
    updateWeightBtn.addEventListener('click', () => {
      const newWeight = prompt('Enter new weight (kg):', petData.weight);
      if (newWeight && !isNaN(newWeight)) {
        petData.weight = parseFloat(newWeight);
        updateHealthDisplay();
      } else {
        alert('Invalid weight entered.');
      }
    });

    // Add new health record
    addHealthDataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRecord = newRecordInput.value.trim();
      if (newRecord) {
        petData.medicalRecords.push(newRecord);
        updateHealthDisplay();
        newRecordInput.value = ''; // Clear input field
      } else {
        alert('Please enter a valid health record.');
      }
    });