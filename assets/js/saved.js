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

const savedRecipes = [
  {
    title: "Nasi Goreng Spesial",
    desc: "Tumis bawang putih, masukkan nasi, telur, kecap, dan cabai.",
    prepTime: "15 menit",
  },
  {
    title: "Ayam Bakar Teflon",
    desc: "Marinasi ayam lalu bakar di teflon sampai matang.",
    prepTime: "30 menit",
  },
  {
    title: "Spaghetti",
    desc: "Masak saus carbonara yang creamy",
    prepTime: "20 menit",
  },
  {
    title: "Sop Sayur Sehat",
    desc: "Rebus sayur-sayuran dan bumbu sederhana untuk sup lezat.",
    prepTime: "20 menit",
  },
];

const container = document.getElementById("savedRecipes");
const emptyState = document.getElementById("emptyState");

function renderRecipes() {
  container.innerHTML = "";

  if (savedRecipes.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("animate__animated", "animate__fadeIn");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  savedRecipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card rounded-xl shadow-md p-6 fade-in";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-semibold text-[#803f22]">${recipe.title}</h3>
          </div>
          <p class="text-gray-700 text-sm mb-4">${recipe.desc}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500">⏱️ ${recipe.prepTime}</span>
            <button class="remove-btn text-red-600 text-sm hover:underline font-medium" onclick="removeRecipe(${index})">
              Hapus
            </button>
          </div>
        `;
    container.appendChild(card);
  });
}

function removeRecipe(index) {
  const cards = document.querySelectorAll(".recipe-card");
  cards[index].classList.add("animate__animated", "animate__fadeOut");

  setTimeout(() => {
    savedRecipes.splice(index, 1);
    renderRecipes();

    if (savedRecipes.length === 0) {
      showConfetti();
    }
  }, 300);
}

function showConfetti() {
  const confetti = document.createElement("div");
  confetti.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div class="animate__animated animate__fadeIn animate__slow text-6xl">🎉</div>
        </div>
      `;
  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.classList.add("animate__animated", "animate__fadeOut");
    setTimeout(() => {
      confetti.remove();
    }, 1000);
  }, 2000);
}
renderRecipes();
