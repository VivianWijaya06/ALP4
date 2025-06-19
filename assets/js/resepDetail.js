document.addEventListener("DOMContentLoaded", function () {
  // Initialize save button state
  const urlParams = new URLSearchParams(window.location.search);
  const recipeTitle = urlParams.get("title");
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const saveBtn = document.getElementById("saveBtn");

  if (saveBtn && savedRecipes.includes(recipeTitle)) {
    saveBtn.textContent = "💾 Saved";
    saveBtn.classList.add("bg-green-100");
  }

  // Rest of your existing code...
  const userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
  const recipe = userRecipes.find((r) => r.title === recipeTitle);

  if (recipe) {
    renderRecipeDetail(recipe);
  } else {
    document.getElementById("recipeDetail").innerHTML = `
      <div class="text-center py-10">
        <h3 class="text-xl font-semibold text-[#803f22] mb-2">Resep tidak ditemukan</h3>
        <p class="text-gray-600 mb-4">Resep yang Anda cari tidak ditemukan dalam koleksi kami.</p>
        <a href="/pages/resep.html" class="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Kembali ke Daftar Resep</a>
      </div>`;
  }
});

function renderRecipeDetail(recipe) {
  const difficultyText = {
    mudah: "Mudah",
    normal: "Normal",
    sulit: "Sulit",
  };

  const difficultyIcon = {
    mudah: "⭐",
    normal: "⭐⭐",
    sulit: "⭐⭐⭐",
  };

  const recipeDetail = document.getElementById("recipeDetail");
  recipeDetail.innerHTML = `
        <img src="${recipe.image}" alt="${
    recipe.title
  }" class="rounded mb-6 w-full object-cover h-64"/>
        
        <div class="absolute top-4 right-4 flex gap-3">
        <button onclick="openShareModal()" class="bg-white border rounded-full p-2 shadow hover:bg-blue-100">
            📤
        </button>
        <button onclick="toggleSave('${
          recipe.title
        }')" id="saveBtn" class="bg-white border rounded-full p-2 shadow hover:bg-green-100">
            💾
        </button>
        ${
          recipe.isUserRecipe
            ? `
            <button onclick="confirmDelete('${recipe.title}')" class="bg-white border rounded-full p-2 shadow hover:bg-red-100">
            🗑️
            </button>
        `
            : ""
        }
        </div>

        <h2 class="text-3xl font-bold text-[#803f22] mb-2">${recipe.title}</h2>
        <div class="flex gap-6 text-sm text-gray-600 mb-6">
          <span>⏱️ ${recipe.time} menit</span>
          <span>${difficultyIcon[recipe.difficulty]} ${
    difficultyText[recipe.difficulty]
  }</span>
          <span>🍽️ ${recipe.servings}</span>
        </div>

        <div class="flex flex-col md:flex-row gap-8 mb-6">
          <div class="md:w-1/2">
            <h3 class="text-xl font-semibold text-[#803f22] mb-2">Alat-Alat :</h3>
            <ul class="list-disc list-inside text-gray-700">
              ${recipe.tools.map((tool) => `<li>${tool}</li>`).join("")}
            </ul>    
          </div>

          <div class="md:w-1/2">
            <h3 class="text-xl font-semibold text-[#803f22] mb-2">Bahan-bahan:</h3>
            <ul class="list-disc list-inside text-gray-700 mb-6">
              ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-[#803f22] mb-2">Cara Memasak:</h3>
        <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-6">
          ${recipe.steps.map((step, index) => `<li>${step}</li>`).join("")}
        </ol>

        ${
          recipe.tips
            ? `
        <div class="text-sm text-gray-500">
          Tips: ${recipe.tips}
        </div>
        `
            : ""
        }
      `;
}

function toggleSave(recipeTitle) {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const index = savedRecipes.indexOf(recipeTitle);
  const btn = document.getElementById("saveBtn");

  if (index === -1) {
    savedRecipes.push(recipeTitle);
    btn.textContent = "💾 Saved";
    btn.classList.add("bg-green-100");
  } else {
    savedRecipes.splice(index, 1);
    btn.textContent = "💾";
    btn.classList.remove("bg-green-100");
  }

  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
}

function openShareModal() {
  alert(
    "Fitur share akan membuka dialog sharing. Implementasi lengkap membutuhkan API sharing browser."
  );
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        text: "Coba resep ini dari CookPedia!",
        url: window.location.href,
      })
      .catch((err) => {
        console.log("Error sharing:", err);
      });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("cookeasyUser");
  const userMenu = document.getElementById("userMenu");

  if (userData) {
    const user = JSON.parse(userData);
    userMenu.innerHTML = `
            <div class="relative">
              <button id="profileDropdownBtn" class="bg-[#803f22] text-white px-4 py-2 rounded-md flex items-center justify-between gap-2 hover:bg-[#5c2c14] transition-all duration-300 active:scale-95 focus:outline-none">
                <span>Profil</span>
                <svg id="dropdownArrow" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="dropdownMenu" class="hidden absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <a href="/pages/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
                <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Keluar</button>
              </div>
            </div>
          `;

    const dropdownBtn = document.getElementById("profileDropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownArrow = document.getElementById("dropdownArrow");

    dropdownBtn.addEventListener("click", function () {
      const isOpen = dropdownMenu.classList.contains("hidden");
      if (isOpen) {
        dropdownMenu.classList.remove("hidden");
        dropdownArrow.classList.add("rotate-180");
      } else {
        dropdownMenu.classList.add("hidden");
        dropdownArrow.classList.remove("rotate-180");
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !dropdownBtn.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
        dropdownArrow.classList.remove("rotate-180");
      }
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
      const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
      if (confirmLogout) {
        localStorage.removeItem("cookeasyUser");
        location.reload();
      }
    });
  }
});

function confirmDelete(recipeTitle) {
  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus resep ini?");
  if (confirmDelete) {
    deleteRecipe(recipeTitle);
  }
}

function deleteRecipe(recipeTitle) {
  let recipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
  recipes = recipes.filter((recipe) => recipe.title !== recipeTitle);
  localStorage.setItem("userRecipes", JSON.stringify(recipes));
  showNotification("Resep berhasil dihapus!");
  setTimeout(() => {
    window.location.href = "/pages/resep.html";
  }, 1000);
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in";
  notification.textContent = message;

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.remove("animate-fade-in");
    notification.classList.add("animate-fade-out");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
