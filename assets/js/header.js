async function loadTemplate(templatePath, elementId) {
  try {
    const response = await fetch(templatePath);
    const html = await response.text();
    const container = document.getElementById(elementId);
    if (container) {
      container.innerHTML = html;
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error loading ${templatePath}:`, error);
    return false;
  }
}

async function setupUserMenu() {
  const userData = localStorage.getItem("cookeasyUser");
  const userMenu = document.getElementById("userMenu");

  if (userData && userMenu) {
    const user = JSON.parse(userData);
    userMenu.innerHTML = `
      <div class="relative group inline-block text-left">
        <button class="bg-[#803f22] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center justify-between gap-2 hover:bg-[#5c2c14] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a8552f] text-sm sm:text-base">
          <span>Profil</span>
          <svg class="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div class="absolute right-0 mt-1 sm:mt-3 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
          <a href="/pages/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
          <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Keluar</button>
        </div>
      </div>`;

    document
      .getElementById("logoutBtn")
      ?.addEventListener("click", function () {
        if (confirm("Apakah Anda yakin ingin logout?")) {
          localStorage.removeItem("cookeasyUser");
          window.location.href = "../index.html";
        }
      });
  }
}

function initActivePageHighlight() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("text-orange-500", "border-b-2", "border-orange-500", "font-semibold", "active:scale-95");
      link.classList.remove("hover:text-orange-500");
    }
  });
}

function setupMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function() {
      mobileMenuButton.classList.toggle("open");
      mobileMenu.classList.toggle("hidden");
    });
    
    document.addEventListener("click", function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.classList.remove("open");
      }
    });
  }
}

// Header-specific initialization
document.addEventListener("DOMContentLoaded", async () => {
  const basePath = window.location.pathname.includes("pages") ? "../" : "./";

  // Load header template
  await loadTemplate(`${basePath}templates/header.html`, "header");
  await loadTemplate(`${basePath}templates/footer.html`, "footer");

  // Initialize header features
  setupUserMenu();
  initActivePageHighlight();
  setupMobileMenu();
});