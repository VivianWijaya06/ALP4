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
        location.reload();
      }
    });
  }
});
