document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const submitSpinner = document.getElementById("submitSpinner");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i class="bx bx-hide"></i>'
        : '<i class="bx bx-show"></i>';
  });

  function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.add("input-error");
    errorElement.textContent = message;
  }

  function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.remove("input-error");
    errorElement.textContent = "";
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  emailInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      showError(this, "Email tidak boleh kosong");
    } else if (!validateEmail(this.value)) {
      showError(this, "Format email tidak valid");
    } else {
      clearError(this);
    }
  });

  passwordInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      showError(this, "Password tidak boleh kosong");
    } else if (this.value.length < 8) {
      showError(this, "Password minimal 8 karakter");
    } else {
      clearError(this);
    }
  });

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    let isValid = true;

    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email tidak boleh kosong");
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Format email tidak valid");
      isValid = false;
    }

    if (passwordInput.value.trim() === "") {
      showError(passwordInput, "Password tidak boleh kosong");
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, "Password minimal 8 karakter");
      isValid = false;
    }

    if (!isValid) return;

    submitText.textContent = "Memproses...";
    submitSpinner.classList.remove("hidden");
    submitBtn.disabled = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem(
        "cookeasyUser",
        JSON.stringify({
          email: emailInput.value.trim(),
          authMethod: "email",
          remember: document.getElementById("remember").checked,
        })
      );

      window.location.href = "../index.html";
    } catch (error) {
      alert("Login gagal: Email atau password salah");
    } finally {
      submitText.textContent = "Masuk";
      submitSpinner.classList.add("hidden");
      submitBtn.disabled = false;
    }
  });
});

function socialLogin(provider) {
  alert(
    `Sedang mengarahkan ke login ${provider}...\n\nIni hanya simulasi. Di aplikasi nyata, ini akan mengarahkan ke halaman autentikasi ${provider}.`
  );
  localStorage.setItem(
    "cookeasyUser",
    JSON.stringify({
      email: `user_${Math.floor(Math.random() * 10000)}@${provider}.com`,
      authMethod: provider,
    })
  );

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}
