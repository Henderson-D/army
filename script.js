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

    // Reset form
    this.reset();
});
