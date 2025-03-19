let timeLeft;

function setTimeManually() {
    let hours = parseInt(document.getElementById("hoursInput").value) || 0;
    let minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    let seconds = parseInt(document.getElementById("secondsInput").value) || 0;
    if ((!isNaN(hours) && hours >= 0) && (!isNaN(minutes) && minutes >= 0) && (!isNaN(seconds) && seconds >= 0)) {
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;
        document.getElementById("timer").innerText = formatTime(timeLeft);
    } else {
        alert("Please enter valid numbers for hours, minutes, and seconds.");
    }
}

function setTimeFromInputs() {
    let hours = parseInt(document.getElementById("hoursInput").value) || 0;
    let minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    let seconds = parseInt(document.getElementById("secondsInput").value) || 0;
    if ((!isNaN(hours) && hours >= 0) && (!isNaN(minutes) && minutes >= 0) && (!isNaN(seconds) && seconds >= 0)) {
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;
        document.getElementById("timer").innerText = formatTime(timeLeft);
    } else {
        alert("Please enter valid numbers for hours, minutes, and seconds.");
    }
}

function setHoursManually() {
    let hours = parseInt(prompt("Enter the number of hours:", "0"));
    if (!isNaN(hours) && hours >= 0) {
        timeLeft = (hours * 3600) + (timeLeft % 3600);
        document.getElementById("timer").innerText = formatTime(timeLeft);
    } else {
        alert("Please enter a valid number for hours.");
    }
}

function setMinutesManually() {
    let minutes = parseInt(prompt("Enter the number of minutes:", "25"));
    if (!isNaN(minutes) && minutes >= 0) {
        timeLeft = Math.floor(timeLeft / 3600) * 3600 + (Math.floor(timeLeft / 60) % 60) * 60 + (minutes * 60) + (timeLeft % 60);
        document.getElementById("timer").innerText = formatTime(timeLeft);
    } else {
        alert("Please enter a valid number for minutes.");
    }
}

let timerInterval;
let isRunning = false;

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        let startTime = new Date().toLocaleTimeString(); // Capture start time
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById("timer").innerText = formatTime(timeLeft);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert("Time's up! Take a break.");
                timeLeft = 25 * 60; // Reset timeLeft after saving the session
                saveStudySession(startTime); // Pass start time to saveStudySession
            }
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60; // Reset to 25 minutes
    document.getElementById("timer").innerText = formatTime(timeLeft);
}

function saveStudySession(startTime) {
    let table = document.getElementById("studyTable");
    let now = new Date().toLocaleTimeString();

    let newRow = table.insertRow(-1);
    newRow.style.textAlign = "center"; // Center align the row
    let taskCell = newRow.insertCell(0);
    let startCell = newRow.insertCell(1);
    let endCell = newRow.insertCell(2);

    taskCell.innerText = prompt("Enter the task you worked on:", "Study Session");
    startCell.innerText = startTime; // Use the captured start time
    endCell.innerText = now; // Placeholder for end time

    // Save end time after session ends
    let initialTimeLeft = timeLeft;
    setTimeout(() => {
        newRow.cells[2].innerText = new Date().toLocaleTimeString();
    }, initialTimeLeft * 1000);
}
