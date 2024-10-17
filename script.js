document.getElementById('runForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const runningTime = document.getElementById('runningTime').value;
  const lengthOfRun = document.getElementById('lengthOfRun').value;
  const runner = document.querySelector('input[name="runner"]:checked').value;

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  // Create a new row for the table
  const tableRow = `<tr>
                      <td>${currentDate}</td>
                      <td>${runner}</td>
                      <td>${runningTime}</td>
                      <td>${lengthOfRun}</td>
                    </tr>`;

  // Append new row to the table
  document.querySelector('#timesTable tbody').insertAdjacentHTML('afterbegin', tableRow);

  // Send data to the server
  fetch('http://localhost:5000/api/running-times', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          date: currentDate,
          runner: runner,
          runningTime: runningTime,
          lengthOfRun: lengthOfRun,
      }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  // Reset form
  this.reset();
});

// Function to fetch running times from the server
function fetchRunningTimes() {
  fetch('http://localhost:5000/api/running-times')
      .then(response => response.json())
      .then(data => {
          data.forEach(time => {
              const tableRow = `<tr>
                                  <td>${time.date}</td>
                                  <td>${time.runner}</td>
                                  <td>${time.runningTime}</td>
                                  <td>${time.lengthOfRun}</td>
                                </tr>`;
              document.querySelector('#timesTable tbody').insertAdjacentHTML('afterbegin', tableRow);
          });
      })
      .catch(error => console.error('Error:', error));
}

// Fetch running times on page load
fetchRunningTimes();
