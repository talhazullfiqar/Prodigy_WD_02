let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
    let startStopButton = document.getElementById('startStop');
    if (startStopButton.textContent === 'Start') {
        startStopButton.textContent = 'Stop';
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        startStopButton.textContent = 'Start';
        clearInterval(stopwatchInterval);
    }
}

function reset() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('laps').innerHTML = '';
    document.getElementById('startStop').textContent = 'Start';
}

function lap() {
    let lapTime = elapsedTime;
    laps.push(lapTime);
    let lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    document.getElementById('laps').appendChild(lapListItem);
}
