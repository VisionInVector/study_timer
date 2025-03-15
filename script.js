let timeLeft = 25 * 60;
let timerInterval;
let isRunning = false;

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById("timer").innerText = formatTime(timeLeft);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert("Time's up! Take a break.");
            }
        }, 1000);
    }
}
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    document.getElementById("timer").innerText = formatTime(timeLeft);
}

//
function saveStudySession() {
    let table = document.getElementById("studyTable");
    let now = new Date().toLocaleTimeString();

    let newRow = table.insertRow(-1);
    let taskCell = newRow.insertCell(0);
    let startCell = newRow.insertCell(1);
    let endCell = newRow.insertCell(2);

    taskCell.innerText = "Study Session";
    startCell.innerText = now;
    endCell.innerText = "--"; // Placeholder for end time

    // Save end time after session ends
    setTimeout(() => {
        newRow.cells[2].innerText = new Date().toLocaleTimeString();
    }, timeLeft * 1000);
}
