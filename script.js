let timerInterval;
let timerTime = 0;
let timerDuration = 0;
let stopwatchInterval;
let stopwatchTime = 0;

function showTime() {
    var date = new Date();
    var day = date.toLocaleString('en-US', { weekday: 'short' });
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";
    var dayOfMonth = date.getDate();
    var month = date.toLocaleString('en-US', { month: 'short' });
  
    if (h == 0) {
      h = 12;
    }
  
    if (h > 12) {
      h = h - 12;
      session = "PM";
    }
  
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  
    var time = h + ":" + m + ":" + s + " " + session;
    var shortDayAndDate = day + ", " + (dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth) + " " + month;
  
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
  
    document.getElementById("MyDateDisplay").innerText = shortDayAndDate;
    document.getElementById("MyDateDisplay").textContent = shortDayAndDate;
  
    setTimeout(showTime, 1000);
  }

function parseTimeInput(timeString) {
  const timeArray = timeString.split(':').map(Number);
  if (timeArray.length !== 3) {
    return 0;
  }
  const [hours, minutes, seconds] = timeArray;
  return hours * 3600 + minutes * 60 + seconds;
}

function updateTimerDisplay() {
  const hours = Math.floor(timerTime / 3600);
  const minutes = Math.floor((timerTime % 3600) / 60);
  const seconds = timerTime % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("MyTimerDisplay").innerText = formattedTime;
  document.getElementById("MyTimerDisplay").textContent = formattedTime;
}

function startTimer() {
  stopStopwatch();
  resetStopwatch();
  timerTime = parseTimeInput(document.getElementById("TimerInput").value);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerTime--;
    updateTimerDisplay();
    if (timerTime <= 0) {
      clearInterval(timerInterval);
      alert("Timer has finished!");
      document.getElementById("StartTimerButton").disabled = false;
      document.getElementById("StopTimerButton").disabled = true;
      document.getElementById("ResetTimerButton").disabled = true;
    }
  }, 1000);
  document.getElementById("StartTimerButton").disabled = true;
  document.getElementById("StopTimerButton").disabled = false;
  document.getElementById("ResetTimerButton").disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("StartTimerButton").disabled = false;
  document.getElementById("StopTimerButton").disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerTime = 0;
  updateTimerDisplay();
  document.getElementById("StartTimerButton").disabled = false;
  document.getElementById("StopTimerButton").disabled = true;
  document.getElementById("ResetTimerButton").disabled = true;
}

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 3600);
  const minutes = Math.floor((stopwatchTime % 3600) / 60);
  const seconds = stopwatchTime % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("MyTimerDisplay").innerText = formattedTime;
  document.getElementById("MyTimerDisplay").textContent = formattedTime;
}

function startStopwatch() {
  stopTimer();
  resetTimer();
  stopwatchTime = 0;
  updateStopwatchDisplay();
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatchDisplay();
  }, 1000);
  document.getElementById("StartStopwatchButton").disabled = true;
  document.getElementById("StopStopwatchButton").disabled = false;
  document.getElementById("ResetStopwatchButton").disabled = false;
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  document.getElementById("StartStopwatchButton").disabled = false;
  document.getElementById("StopStopwatchButton").disabled = true;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatchDisplay();
  document.getElementById("StartStopwatchButton").disabled = false;
  document.getElementById("StopStopwatchButton").disabled = true;
  document.getElementById("ResetStopwatchButton").disabled = true;
}

document.getElementById("TimerInput").addEventListener("input", function() {
  timerDuration = parseTimeInput(this.value);
});

document.addEventListener("DOMContentLoaded", function () {
  showTime();
});
