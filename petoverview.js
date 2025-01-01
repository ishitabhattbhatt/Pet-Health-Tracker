// Open Modal
function openAddPetModal() {
  document.getElementById('addPetModal').style.display = 'flex';
}

// Close Modal
function closeAddPetModal() {
  document.getElementById('addPetModal').style.display = 'none';
}

document.getElementById('addPetForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting the default way
  
  // Get form values
  const name = document.getElementById('petName').value;
  const species = document.getElementById('petSpecies').value;
  const breed = document.getElementById('petBreed').value;
  const age = document.getElementById('petAge').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  // Create the payload to send to the server
  const payload = {
    name,
    species,
    breed,
    age,
    weight,
    height
  };
  const formData = new FormData(event.target);
  try {
    const response = await fetch('http://localhost:3000/addPetModal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    // Display response message
    document.getElementById('responseMessage').innerText = data.message;

    // Optionally close the modal or clear the form
    if (response.ok) {
      document.getElementById('addPetForm').reset();
      setTimeout(() => {
        document.getElementById('addPetModal').style.display = 'none';
      }, 2000); // Close modal after 2 seconds
    }
  } catch (error) {
    document.getElementById('responseMessage').innerText = 'Error: ' + error.message;
  }
});