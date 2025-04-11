function markSprayed(button) {
  const card = button.closest(".spray-card");
  card.classList.add("sprayed");
  card.classList.remove("not-sprayed");
}

function markNotSprayed(button) {
  const card = button.closest(".spray-card");
  card.classList.add("not-sprayed");
  card.classList.remove("sprayed");
}

const alarmAudio = document.getElementById("alarmSound");

function playAlarm(btn) {
  alarmAudio.currentTime = 0;
  alarmAudio.play();
  const parent = btn.closest(".alarm-buttons");
  parent.querySelector(".ring-btn").style.display = "none";
  parent.querySelector(".stop-btn").style.display = "flex";
}

function stopAlarm(btn) {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  const parent = btn.closest(".alarm-buttons");
  parent.querySelector(".ring-btn").style.display = "flex";
  parent.querySelector(".stop-btn").style.display = "none";
}
