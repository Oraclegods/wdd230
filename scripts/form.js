document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");
    const rating = document.getElementById("rating");
    const ratingValue = document.getElementById("rating-value");
    const form = document.getElementById("form"); // Assuming form has an id of 'form'

    confirmPassword.addEventListener("input", function() {
        if (confirmPassword.value !== password.value) {
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none";
        }
    });

    rating.addEventListener("input", function() {
        ratingValue.textContent = rating.value;
    });

    form.addEventListener("submit", function(event) {
        // Check if the passwords match before submitting
        if (password.value !== confirmPassword.value) {
            event.preventDefault(); // Prevent form submission
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
        }
    });
});
