document.addEventListener("DOMContentLoaded", function () {
  initAppointmentForm();
  initPopupHandlers();
});

function initAppointmentForm() {
  const appointmentForm = document.getElementById("appointmentForm");
  if (!appointmentForm) return;

  const formFields = appointmentForm.querySelectorAll(
    "input, select, textarea"
  );
  formFields.forEach((field) => {
    field.addEventListener("input", function () {
      FormValidation.clearError(this.id);
    });
  });

  appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (validateAppointmentForm()) {
      try {
        if (!window.api.isLoggedIn()) {
          alert("Please log in to submit the appointment request");
          window.location.href = "login.html";
          return;
        }

        const data = {
          fullName: document.getElementById("fullName").value,
          phoneNumber: document.getElementById("phoneNumber").value,
          emailAddress: document.getElementById("emailAddress").value,
          appointmentDate: document.getElementById("appointmentDate").value,
          specialistType: document.getElementById("specialistType").value,
          preferredTime: document.getElementById("preferredTime").value,
          medicalConcern:
            document.getElementById("medicalConcern")?.value || "",
        };

        // Submit to backend
        const response = await window.api.request(
          "/appointments",
          "POST",
          data
        );

        // Show confirmation popup with details
        showAppointmentConfirmation(data, response.referenceId);
        appointmentForm.reset();
      } catch (error) {
        alert(
          error.message ||
            "Failed to submit your appointment request. Please try again later."
        );
      }
    }
  });
}

function showAppointmentConfirmation(data, refId) {
  const popup = document.getElementById("appointmentPopup");
  if (!popup) return;

  // Format date for display
  const dateObj = new Date(data.appointmentDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Update popup content
  document.getElementById("popupSpecialist").textContent =
    data.specialistType === "gynecologist" ? "Gynecologist" : "Oncologist";

  document.getElementById("popupDate").textContent = formattedDate;

  document.getElementById("popupTime").textContent =
    data.preferredTime === "morning"
      ? "Morning (9AM-12PM)"
      : data.preferredTime === "afternoon"
      ? "Afternoon (12PM-3PM)"
      : "Evening (3PM-6PM)";

  document.getElementById("popupRefId").textContent =
    refId || "APT-" + Date.now().toString().slice(-6);

  // Show popup
  popup.style.display = "flex";
}

function initPopupHandlers() {
  const popup = document.getElementById("appointmentPopup");
  if (!popup) return;

  // Close buttons
  document.querySelectorAll(".btn-popup-close, .close-popup").forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });

  //add to calender btn
  const calendarBtn = document.getElementById("addToCalendarBtn");
  if (calendarBtn) {
    calendarBtn.addEventListener("click", function () {
      // Add loading state if needed
      this.classList.add("loading");

      // Simulate API call
      setTimeout(() => {
        // Show success state
        this.classList.remove("loading");
        this.classList.add("success");

        // Reset after 2 seconds
        setTimeout(() => {
          this.classList.remove("success");
          this.querySelector(".btn-text").style.transform = "translateY(0)";
          this.querySelector(".btn-icon").style.transform = "translateY(0)";
        }, 2000);
      }, 1000);
    });
  }

  // Close when clicking outside
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // Close with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup.style.display === "flex") {
      popup.style.display = "none";
    }
  });
}

function validateAppointmentForm() {
  let isValid = true;

  const requiredFields = [
    "fullName",
    "phoneNumber",
    "emailAddress",
    "appointmentDate",
    "specialistType",
    "preferredTime",
  ];

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!FormValidation.validateRequired(field.value.trim())) {
      FormValidation.showError(fieldId, "This field is required");
      isValid = false;
    }
  });

  const emailField = document.getElementById("emailAddress");
if (!FormValidation.validateRequired(emailField.value.trim())) {
  FormValidation.showError("emailAddress", "Email is required");
  isValid = false;
} else if (!FormValidation.validateEmail(emailField.value.trim())) {
  showErrorPopup("Please enter a valid email address");
  isValid = false;
}


 const phoneField = document.getElementById("phoneNumber");
const phoneValue = phoneField.value.trim();

if (!FormValidation.validateRequired(phoneValue)) {
  FormValidation.showError("phoneNumber", "Phone number is required");
  isValid = false;
} else if (!/^\d{10}$/.test(phoneValue)) {
  showErrorPopup("Phone number must be exactly 10 digits");
  isValid = false;
}


  const dateField = document.getElementById("appointmentDate");
  if (dateField.value) {
    const selectedDate = new Date(dateField.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      FormValidation.showError(
        "appointmentDate",
        "Please select today or a future date"
      );
      isValid = false;
    }
  }

  return isValid;
}


function openPopup() {
  document.getElementById("popupOverlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}
function showErrorPopup(message) {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("popupOverlay");

  popup.querySelector("h3").textContent = "Error";
  popup.querySelector("p").textContent = message;
  popup.style.display = "block";
  overlay.style.display = "block";
}
