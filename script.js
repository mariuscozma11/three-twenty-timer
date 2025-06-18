const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const restartBtn = document.getElementById("restart");
const timerDisplay = document.getElementById("timer-display");
const initialTime = 20*60;
let isPaused = true;
let timeLeft = initialTime;
let timerInterval;
const alarm = new Audio("bell.wav");

if (Notification.permission === "granted") {
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
  });
}

const handleFinish = () => {
  new Notification("Notification from TTT", {
    body: "Time is up! Look at something 20 feet away for 20 minutes!",
  });
  alarm.play();
};
const updateDisplay = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

updateDisplay(timeLeft);
const startTimer = () => {
  if (!isPaused) return;
  isPaused = false;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      handleFinish();
      handleRestart();
    } else {
      timeLeft--;
      updateDisplay(timeLeft);
    }
  }, 1000);
};

const handlePause = () => {
  if (isPaused) return;
  togglePlay();
  clearInterval(timerInterval);
  isPaused = true;
};

const handlePlay = () => {
  togglePlay();
  startTimer();
};

const handleRestart = () => {
  handlePause();
  timeLeft = initialTime;
  updateDisplay(timeLeft);
};

const togglePlay = () => {
  if (isPaused) {
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  } else {
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
  }
};
