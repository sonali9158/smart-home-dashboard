function toggleDevice(btn, id) {
  const card = document.getElementById(id);
  const status = card.querySelector(".status");
  const isOn = btn.textContent === "ON";
  btn.textContent = isOn ? "OFF" : "ON";
  status.textContent = `Status: ${id.toUpperCase()} is ${isOn ? "OFF" : "ON"}`;
  showNotification(`${id.toUpperCase()} turned ${isOn ? "OFF" : "ON"}`);
}

function toggleDoor(btn) {
  const input = document.getElementById("doorPass");
  const status = document.querySelector("#door .status");
  const code = input.value;
  if (code === "1234") {
    const isLocked = btn.textContent === "LOCK";
    btn.textContent = isLocked ? "UNLOCK" : "LOCK";
    status.textContent = `Status: Door is ${isLocked ? "UNLOCKED" : "LOCKED"}`;
    showNotification(`Door ${isLocked ? "UNLOCKED" : "LOCKED"}`);
  } else {
    alert("Incorrect Passkey");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function resetAll() {
  document.querySelectorAll(".device-card").forEach(card => {
    const btn = card.querySelector("button");
    if (btn && btn.textContent !== "LOCK") {
      btn.textContent = "OFF";
      const id = card.id;
      const status = card.querySelector(".status");
      if (status) status.textContent = `Status: ${id.toUpperCase()} is OFF`;
    }
  });
  showNotification("All devices reset");
}

function showNotification(msg) {
  const note = document.createElement("div");
  note.className = "notification";
  note.textContent = msg;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

function updateEnv() {
  const temp = Math.floor(20 + Math.random() * 10);
  const humidity = Math.floor(40 + Math.random() * 20);
  document.getElementById("temp").textContent = temp;
  document.getElementById("humidity").textContent = humidity;
}
setInterval(updateEnv, 5000);
updateEnv();

const hour = new Date().getHours();
if (hour >= 19 || hour < 6) {
  document.body.classList.add("dark");
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes("turn on light")) toggleDevice(document.querySelector("#light button"), "light");
    if (command.includes("turn off ac")) toggleDevice(document.querySelector("#ac button"), "ac");
    if (command.includes("lock door")) {
      document.getElementById("doorPass").value = "1234";
      toggleDoor(document.querySelector("#door button"));
    }
  };
  recognition.start();
}

const ctx = document.getElementById("usageChart").getContext("2d");
const usageChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Electricity Usage",
      data: [2.5, 3.1, 4.2, 2.8, 3.6, 4.1, 3.0],
      backgroundColor: "#4CAF50",
      borderRadius: 5
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "kWh"
        }
      }
    }
  }
});
