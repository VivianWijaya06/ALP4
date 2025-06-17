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
            <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
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

function filterRecipes(searchText = "", difficulty = "semua") {
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const cardDifficulty = card.getAttribute("data-difficulty");
    const matchesSearch = title.includes(searchText.toLowerCase());
    const matchesDifficulty =
      difficulty === "semua" || cardDifficulty === difficulty;

    if (matchesSearch && matchesDifficulty) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function filterResep(level) {
  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  const searchText = document.getElementById("searchInput").value;
  filterRecipes(searchText, level);
}

document.querySelector(".filter-button").classList.add("active");

document.getElementById("searchInput").addEventListener("keyup", function () {
  const activeFilter = document
    .querySelector(".filter-button.active")
    .textContent.toLowerCase();
  filterRecipes(
    this.value,
    activeFilter === "semua resep" ? "semua" : activeFilter
  );
});

document.querySelectorAll(".filter-button").forEach((btn) => {
  btn.addEventListener("click", function () {
    const level = this.textContent.toLowerCase();
    filterResep(level === "semua resep" ? "semua" : level);
  });
});

function loadUserRecipes() {
  const userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
  const recipeList = document.getElementById("recipeList");

  userRecipes.forEach((recipe) => {
    const difficultyText = {
      mudah: "Mudah",
      normal: "Normal",
      sulit: "Sulit",
    };

    const recipeCard = document.createElement("a");
    recipeCard.href = `recipe-detail.html?title=${encodeURIComponent(
      recipe.title
    )}`;
    recipeCard.className =
      "recipe-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden group relative";
    recipeCard.setAttribute("data-difficulty", recipe.difficulty);
    recipeCard.innerHTML = `
          <div class="overflow-hidden">
            <img src="${recipe.image}" alt="${
      recipe.title
    }" class="w-full h-52 object-cover recipe-image"/>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-[#803f22] group-hover:text-orange-500 transition mb-1">${
              recipe.title
            }</h3>
            <p class="text-sm text-gray-600 mb-3">${recipe.description}</p>
            <div class="flex justify-between text-xs text-gray-500">
              <span class="flex items-center"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${
                recipe.time
              } menit</span>
              <span class="flex items-center"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>${
                difficultyText[recipe.difficulty]
              }</span>
            </div>
          </div>
        `;

    recipeList.appendChild(recipeCard);
  });
}

document.addEventListener("DOMContentLoaded", loadUserRecipes);
