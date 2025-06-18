document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("cookeasyUser")) || {};
  if (Object.keys(userData).length === 0) {
    window.location.href = "/pages/signin.html";
    return;
  }
});

function openEditModal() {
  const modal = document.getElementById("editProfileModal");
  modal.classList.add("show");

  const userData = JSON.parse(localStorage.getItem("cookeasyUser")) || {};
  document.getElementById("editUsername").value = userData.username || "";
  document.getElementById("editEmail").value = userData.email || "";

  const newPassword = document.getElementById("newPassword");
  if (newPassword) {
    newPassword.addEventListener("input", validatePassword);
  }
}

function closeEditModal() {
  const modal = document.getElementById("editProfileModal");
  modal.classList.remove("show");

  // Reset password fields
  const passwordFields = ["currentPassword", "newPassword", "confirmPassword"];
  passwordFields.forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    // Force input type to password
    input.type = "password";

    // Reset the icon to fa-eye-slash
    const icon = input.nextElementSibling?.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }

    // Optionally clear values (remove if you want to retain text)
    input.value = "";
  });
}

window.onclick = function (event) {
  const modal = document.getElementById("editProfileModal");
  if (event.target === modal) {
    closeEditModal();
  }
};

function togglePassword(id) {
  const input = document.getElementById(id);
  const icon = input.nextElementSibling.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}

function validatePassword() {
  const password = this.value;
  const length = document.getElementById("length");
  const uppercase = document.getElementById("uppercase");
  const number = document.getElementById("number");

  if (password.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }

  if (/[A-Z]/.test(password)) {
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }

  if (/[0-9]/.test(password)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
}

document
  .getElementById("editProfileForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("editUsername").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email) {
      showAlert("error", "Mohon isi nama pengguna dan email!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert("error", "Format email tidak valid!");
      return;
    }

    let userData = JSON.parse(localStorage.getItem("cookeasyUser")) || {};

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert("error", "Mohon lengkapi semua kolom password!");
        return;
      }

      if (newPassword !== confirmPassword) {
        showAlert("error", "Konfirmasi password tidak cocok!");
        return;
      }

      if (
        newPassword.length < 8 ||
        !/[A-Z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword)
      ) {
        showAlert(
          "error",
          "Password harus mengandung 8 karakter, 1 huruf besar, dan 1 angka"
        );
        return;
      }

      if (currentPassword === newPassword) {
        showAlert("error", "Password baru tidak boleh sama dengan password saat ini!");
        return;
      }

      if (userData.password && userData.password !== currentPassword) {
        showAlert("error", "Password saat ini salah!");
        return;
      }
      userData.password = newPassword;
    }

    userData.username = username;
    userData.email = email;
    try {
      localStorage.setItem("cookeasyUser", JSON.stringify(userData));
      document.getElementById("profileUsername").textContent = username;
      document.getElementById("profileEmail").textContent = email;

      showAlert("success", "Profil berhasil diperbarui!");
      closeEditModal();

      // Clear password fields after successful update
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      showAlert("error", "Gagal menyimpan perubahan!");
    }
  });

function showAlert(type, message) {
  const existingAlert = document.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.classList.add("opacity-0");
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("cookeasyUser");
  const userMenu = document.getElementById("userMenu");

  if (userData) {
    const user = JSON.parse(userData);
    userMenu.innerHTML = `
          <div class="relative group inline-block text-left">
          <button class="bg-[#803f22] text-white px-4 py-2 rounded-md flex items-center justify-between gap-2 hover:bg-[#5c2c14] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a8552f]">
            <span>Profil</span>
            <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute right-0 mt-3 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
            <a href="/pages/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
            <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Keluar</button>
          </div>
        </div>
        `;

    document.getElementById("logoutBtn").addEventListener("click", function () {
      const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
      if (confirmLogout) {
        localStorage.removeItem("cookeasyUser");
        window.location.href = "../index.html";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("cookeasyUser")) || {};
  const nameElement = document.getElementById("profileUsername");
  const emailElement = document.getElementById("profileEmail");

  if (userData.username) nameElement.textContent = userData.username;
  if (userData.email) emailElement.textContent = userData.email;
  const userMenu = document.getElementById("userMenu");
  if (Object.keys(userData).length > 0) {
    userMenu.innerHTML = `
          <div class="relative group inline-block text-left">
          <button class="bg-[#803f22] text-white px-4 py-2 rounded-md flex items-center justify-between gap-2 hover:bg-[#5c2c14] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a8552f]">
            <span>Profil</span>
            <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute right-0 mt-3 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
            <a href="/pages/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
            <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Keluar</button>
          </div>
        </div>
        `;

    document.getElementById("logoutBtn").addEventListener("click", function () {
      const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
      if (confirmLogout) {
        localStorage.removeItem("cookeasyUser");
        window.location.href = "../index.html";
      }
    });
  } else {
    window.location.href = "/pages/signin.html";
  }
});
