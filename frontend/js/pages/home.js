document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  [nameInput, phoneInput, emailInput, messageInput].forEach((input) =>
    input.addEventListener("input", () => FormValidation.clearError(input))
  );

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!FormValidation.validateRequired(nameInput.value)) {
      FormValidation.showError(nameInput, "Please enter your name");
      isValid = false;
    }

    if (!FormValidation.validateRequired(phoneInput.value)) {
      FormValidation.showError(phoneInput, "Please enter your phone number");
      isValid = false;
      
    }

    if (!FormValidation.validateEmail(emailInput.value)) {
      FormValidation.showError(
        emailInput,
        "Please enter a valid email address"
      );
      isValid = false;
    }

    if (!FormValidation.validateRequired(messageInput.value)) {
      FormValidation.showError(messageInput, "Please enter your message");
      isValid = false;
    }

    if (!isValid) return;

    try {
      if (!window.api.isLoggedIn()) {
        window.location.href = "login.html";
        return;
      }

      const data = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        message: messageInput.value,
      };

      await window.api.request("/contact", "POST", data);
      contactForm.reset();
      openPopup();
    } catch (error) {
      showErrorPopup(
        error.message ||
          "Failed to submit your message. Please try again later."
      );
    }
  });
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
