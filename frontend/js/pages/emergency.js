document.addEventListener("DOMContentLoaded", function () {
  // Initialize emergency buttons
  const emergencyButtons = document.querySelectorAll(".emergency-button");
  const emergencyPopup = document.getElementById("emergencyPopup");
  const emergencyActions = document.getElementById("emergencyActions");
  const cancelBtn = document.getElementById("cancelEmergency");
  let countdownInterval;

  emergencyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Determine which button was clicked
      const actionMap = {
        "call-only": ["Contacting local emergency services"],
        "call-location": [
          "Contacting emergency services",
          "Sharing your live location",
        ],
        "call-location-family": [
          "Contacting emergency services",
          "Sharing your live location",
          "Alerting your emergency contacts",
        ],
      };

      // Get actions based on button class
      const actions = actionMap[this.classList[1]] || [
        "Emergency alert activated",
      ];

      // Populate actions list
      emergencyActions.innerHTML = "";
      actions.forEach((action) => {
        const li = document.createElement("li");
        li.textContent = action;
        emergencyActions.appendChild(li);
      });

      // Show popup
      emergencyPopup.style.display = "flex";

      // Start countdown
      let seconds = 10;
      const countdownEl = document.getElementById("countdown");
      countdownEl.textContent = seconds;

      countdownInterval = setInterval(() => {
        seconds--;
        countdownEl.textContent = seconds;

        if (seconds <= 0) {
          clearInterval(countdownInterval);
          // Simulate emergency services notification
          simulateEmergencyResponse();
        }
      }, 1000);
    });
  });

  // Cancel emergency
  cancelBtn.addEventListener("click", function () {
    clearInterval(countdownInterval);
    emergencyPopup.style.display = "none";
    // Add any cancellation logic here
  });

  // Close popup handlers (same as before)
  document
    .querySelectorAll(
      ".emergency-popup .close-popup, .emergency-popup .btn-popup-confirm"
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        clearInterval(countdownInterval);
        emergencyPopup.style.display = "none";
      });
    });

  // Simulate emergency response (for demo)
  function simulateEmergencyResponse() {
    const actions = emergencyActions;
    const responseSteps = [
      "Emergency services notified",
      "Police dispatched to your location",
      "Your emergency contacts have been alerted",
    ];

    actions.innerHTML = "";
    responseSteps.forEach((step, index) => {
      setTimeout(() => {
        const li = document.createElement("li");
        li.textContent = step;
        actions.appendChild(li);
      }, index * 1500);
    });
  }
});
