document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const form = document.getElementById("form");

    confirmPassword.addEventListener("input", function() {
        if (confirmPassword.value !== password.value) {
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none";
        }
    });

    // Ensure that the email ends with @byui.edu before form submission
    form.addEventListener("submit", function(event) {
        // Check password match before submitting
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
        }

        // Check if email ends with @byui.edu
        const emailValue = email.value.trim();
        if (!emailValue.endsWith("@byui.edu")) {
            event.preventDefault();
            emailError.textContent = "Please enter a valid @byui.edu email address.";
            emailError.style.display = "block";
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
        }
    });

    // Automatically append @byui.edu if the user starts typing their email
    email.addEventListener("input", function() {
        let emailValue = email.value.trim();
        if (!emailValue.endsWith("@byui.edu")) {
            if (emailValue.includes("@")) {
                email.value = emailValue.split("@")[0] + "@byui.edu";
            } else {
                email.value = emailValue + "@byui.edu";
            }
        }
    });
});
