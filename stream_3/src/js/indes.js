import Timer from "./Timer";

const pomodoroTimer = new Timer();

function beautifyNumber(num) {
  if (num > 10) return num;
  else return "0" + num;
}

pomodoroTimer.subscribe((data) => {
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  secondsElement.innerHTML = beautifyNumber(data.currentTime % 60);
  minutesElement.innerHTML = beautifyNumber(Math.floor(data.currentTime / 60));

  if (data.isRunned) {
    document.querySelector(".js-start").classList.add("hidden");
    document.querySelector(".js-resume").classList.add("hidden");
    document.querySelector(".js-pause").classList.remove("hidden");
    document.querySelector(".js-stop").classList.remove("hidden");
  }

  if (!data.isRunned && !data.isPaused) {
    document.querySelector(".js-start").classList.remove("hidden");
    document.querySelector(".js-pause").classList.add("hidden");
    document.querySelector(".js-stop").classList.add("hidden");
    document.querySelector(".js-resume").classList.add("hidden");
  }

  if (!data.isRunned && data.isPaused) {
    document.querySelector(".js-stop").classList.remove("hidden");
    document.querySelector(".js-resume").classList.remove("hidden");
    document.querySelector(".js-pause").classList.add("hidden");
    document.querySelector(".js-start").classList.add("hidden");
  }

  console.log(data);
});

function startTimer() {
  pomodoroTimer.start();
}

function stopTimer() {
  pomodoroTimer.stop();
}

function pauseTimer() {
  pomodoroTimer.pause();
}

function resumeTimer() {
  pomodoroTimer.resume();
}

const startButton = document.querySelector(".js-start");
const stopButton = document.querySelector(".js-stop");
const pauseButton = document.querySelector(".js-pause");
const resumeButton = document.querySelector(".js-resume");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
