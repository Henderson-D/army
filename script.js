// URL of your deployed backend
const BACKEND_URL = 'https://army-production.up.railway.app';

// Fetch running times from the backend
async function fetchRunningTimes() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/running-times`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayRunningTimes(data); // Call function to display the data
    } catch (error) {
        console.error('Error fetching running times:', error);
        document.getElementById('error').innerText = 'Failed to load running times.';
    }
}

// Save a new running time to the backend
async function saveRunningTime(runningTimeData) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/running-times`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(runningTimeData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result); // Log the response from the server
        fetchRunningTimes(); // Refresh the displayed running times
    } catch (error) {
        console.error('Error saving running time:', error);
        document.getElementById('error').innerText = 'Failed to save running time.';
    }
}

// Display running times on the page
function displayRunningTimes(times) {
    const runningTimesList = document.getElementById('running-times-list');
    runningTimesList.innerHTML = ''; // Clear previous entries

    times.forEach(time => {
        const listItem = document.createElement('li');
        listItem.textContent = `${time.date} - ${time.runner}: ${time.runningTime} minutes for ${time.lengthOfRun} km`;
        runningTimesList.appendChild(listItem);
    });
}

// Handle form submission to save a new running time
document.getElementById('running-time-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const date = document.getElementById('date').value;
    const runner = document.getElementById('runner').value;
    const runningTime = parseFloat(document.getElementById('running-time').value);
    const lengthOfRun = parseFloat(document.getElementById('length-of-run').value);

    // Validate inputs
    if (!date || !runner || isNaN(runningTime) || isNaN(lengthOfRun)) {
        document.getElementById('error').innerText = 'Please fill in all fields correctly.';
        return;
    }

    const newRunningTime = { date, runner, runningTime, lengthOfRun };
    saveRunningTime(newRunningTime);
});

// Call fetchRunningTimes when the page loads
document.addEventListener('DOMContentLoaded', fetchRunningTimes);
