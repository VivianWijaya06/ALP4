document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const submitSpinner = document.getElementById("submitSpinner");
  const termsCheckbox = document.getElementById("terms");
  const passwordStrengthFill = document.getElementById(
    "password-strength-fill"
  );

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i class="bx bx-hide"></i>'
        : '<i class="bx bx-show"></i>';
  });

  toggleConfirmPassword.addEventListener("click", function () {
    const type =
      confirmPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirmPasswordInput.setAttribute("type", type);
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

  function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  }

  function updatePasswordStrength(password) {
    const strength = checkPasswordStrength(password);
    const requirements = {
      length: document.getElementById("length-requirement"),
      uppercase: document.getElementById("uppercase-requirement"),
      number: document.getElementById("number-requirement"),
    };

    requirements.length.style.color =
      password.length >= 8 ? "#10b981" : "#6b7280";
    requirements.uppercase.style.color = /[A-Z]/.test(password)
      ? "#10b981"
      : "#6b7280";
    requirements.number.style.color = /[0-9]/.test(password)
      ? "#10b981"
      : "#6b7280";

    let width = 0;
    let color = "#ef4444";

    if (strength <= 1) {
      width = 25;
    } else if (strength <= 2) {
      width = 50;
      color = "#f59e0b";
    } else if (strength <= 3) {
      width = 75;
      color = "#3b82f6";
    } else {
      width = 100;
      color = "#10b981";
    }

    passwordStrengthFill.style.width = `${width}%`;
    passwordStrengthFill.style.backgroundColor = color;
  }

  nameInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      showError(this, "Nama tidak boleh kosong");
    } else {
      clearError(this);
    }
  });

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
    updatePasswordStrength(this.value);

    if (this.value.trim() === "") {
      showError(this, "Password tidak boleh kosong");
    } else if (this.value.length < 8) {
      showError(this, "Password minimal 8 karakter");
    } else {
      clearError(this);
    }

    if (
      confirmPasswordInput.value &&
      this.value !== confirmPasswordInput.value
    ) {
      showError(confirmPasswordInput, "Password tidak cocok");
    } else if (confirmPasswordInput.value) {
      clearError(confirmPasswordInput);
    }
  });

  confirmPasswordInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      showError(this, "Konfirmasi password tidak boleh kosong");
    } else if (this.value !== passwordInput.value) {
      showError(this, "Password tidak cocok");
    } else {
      clearError(this);
    }
  });

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Nama tidak boleh kosong");
      isValid = false;
    }

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

    if (confirmPasswordInput.value.trim() === "") {
      showError(confirmPasswordInput, "Konfirmasi password tidak boleh kosong");
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, "Password tidak cocok");
      isValid = false;
    }

    if (!termsCheckbox.checked) {
      alert("Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi");
      isValid = false;
    }

    if (!isValid) return;
    submitText.textContent = "Mendaftarkan...";
    submitSpinner.classList.remove("hidden");
    submitBtn.disabled = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        authMethod: "email",
      };

      localStorage.setItem("cookeasyUser", JSON.stringify(userData));

      window.location.href = "/pages/selectLevel.html";
    } catch (error) {
      alert("Pendaftaran gagal: " + (error.message || "Email sudah terdaftar"));
    } finally {
      submitText.textContent = "Daftar";
      submitSpinner.classList.add("hidden");
      submitBtn.disabled = false;
    }
  });
});

function socialSignup(provider) {
  alert(
    `Sedang mengarahkan ke pendaftaran ${provider}...\n\nIni hanya simulasi. Di aplikasi nyata, ini akan mengarahkan ke halaman autentikasi ${provider}.`
  );

  localStorage.setItem(
    "cookeasyUser",
    JSON.stringify({
      name: `User ${provider}`,
      email: `user_${Math.floor(Math.random() * 10000)}@${provider}.com`,
      authMethod: provider,
    })
  );

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}
