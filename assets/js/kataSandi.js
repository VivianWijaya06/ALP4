document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("resetEmail");
  const error = document.getElementById("reset-error");
  const emailVal = email.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailVal === "") {
    error.textContent = "Email tidak boleh kosong";
    email.classList.add("border-red-500");
  } else if (!re.test(emailVal.toLowerCase())) {
    error.textContent = "Format email tidak valid";
    email.classList.add("border-red-500");
  } else {
    error.textContent = "";
    email.classList.remove("border-red-500");
    alert("Tautan reset kata sandi telah dikirim ke email Anda (simulasi).");
    window.location.href = "/pages/signin.html";
  }
});
