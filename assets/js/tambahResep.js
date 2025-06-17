function addTool() {
  const container = document.getElementById("toolsContainer");
  const count = container.children.length + 1;

  const div = document.createElement("div");
  div.className = "flex items-center";
  div.innerHTML = `
        <input type="text" name="tools" required class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400" placeholder="Misal: Wajan">
        <button type="button" onclick="removeField(this)" class="ml-2 text-gray-500 hover:text-red-500 remove-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      `;

  container.appendChild(div);
}

function addIngredient() {
  const container = document.getElementById("ingredientsContainer");
  const count = container.children.length + 1;

  const div = document.createElement("div");
  div.className = "flex items-center";
  div.innerHTML = `
        <input type="text" name="ingredients" required class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400" placeholder="Misal: 2 siung bawang putih">
        <button type="button" onclick="removeField(this)" class="ml-2 text-gray-500 hover:text-red-500 remove-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      `;

  container.appendChild(div);
}

function addStep() {
  const container = document.getElementById("stepsContainer");
  const count = container.children.length + 1;

  const div = document.createElement("div");
  div.className =
    "recipe-step flex items-start p-3 rounded-lg border border-gray-200";
  div.innerHTML = `
        <span class="text-gray-500 mr-3 mt-1">${count}.</span>
        <textarea rows="2" name="steps" required class="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400" placeholder="Deskripsikan langkah ini"></textarea>
        <button type="button" onclick="removeField(this)" class="ml-2 text-gray-500 hover:text-red-500 remove-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      `;

  container.appendChild(div);
}

function removeField(button) {
  const field = button.closest("div.flex");
  if (field) {
    field.remove();

    const steps = document.querySelectorAll("#stepsContainer .recipe-step");
    steps.forEach((step, index) => {
      step.querySelector("span").textContent = `${index + 1}.`;
    });
  }
}

document.getElementById("recipeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeData = {
    title: document.getElementById("recipeTitle").value.trim(),
    image:
      document.getElementById("recipeImage").value.trim() ||
      "placeholder-recipe.jpg",
    time: document.getElementById("cookingTime").value,
    difficulty: document.getElementById("difficulty").value,
    servings: document.getElementById("servings").value.trim(),
    description: document.getElementById("recipeDescription").value.trim(),
    tools: Array.from(document.querySelectorAll('input[name="tools"]'))
      .map((input) => input.value.trim())
      .filter(Boolean),
    ingredients: Array.from(
      document.querySelectorAll('input[name="ingredients"]')
    )
      .map((input) => input.value.trim())
      .filter(Boolean),
    steps: Array.from(document.querySelectorAll('textarea[name="steps"]'))
      .map((textarea) => textarea.value.trim())
      .filter(Boolean),
    tips: document.getElementById("recipeTips").value.trim(),
    createdAt: new Date().toISOString(),
    isUserRecipe: true,
  };

  saveRecipe(recipeData);

  window.location.href = "recipe.html";
});

function saveRecipe(recipeData) {
  let recipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

  const recipeWithFlag = {
    ...recipeData,
    isUserRecipe: true,
  };

  const existingIndex = recipes.findIndex((r) => r.title === recipeData.title);

  if (existingIndex >= 0) {
    recipes[existingIndex] = recipeData;
  } else {
    recipes.push(recipeData);
  }
  localStorage.setItem("userRecipes", JSON.stringify(recipes));

  showNotification("Resep berhasil disimpan!");
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

document.getElementById("recipeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  const recipeData = {
    title: document.getElementById("recipeTitle").value.trim(),
    image:
      document.getElementById("recipeImage").value.trim() ||
      "placeholder-recipe.jpg",
    time: document.getElementById("cookingTime").value,
    difficulty: document.getElementById("difficulty").value,
    servings: document.getElementById("servings").value.trim(),
    description: document.getElementById("recipeDescription").value.trim(),
    tools: Array.from(document.querySelectorAll('input[name="tools"]'))
      .map((input) => input.value.trim())
      .filter(Boolean),
    ingredients: Array.from(
      document.querySelectorAll('input[name="ingredients"]')
    )
      .map((input) => input.value.trim())
      .filter(Boolean),
    steps: Array.from(document.querySelectorAll('textarea[name="steps"]'))
      .map((textarea) => textarea.value.trim())
      .filter(Boolean),
    tips: document.getElementById("recipeTips").value.trim(),
    createdAt: new Date().toISOString(),
    isUserRecipe: true,
  };

  saveRecipe(recipeData);

  setTimeout(() => {
    window.location.href = "recipe.html";
  }, 1000);
});

function validateForm() {
  const title = document.getElementById("recipeTitle").value.trim();
  const time = document.getElementById("cookingTime").value;
  const description = document.getElementById("recipeDescription").value.trim();
  const tools = Array.from(document.querySelectorAll('input[name="tools"]'))
    .map((input) => input.value.trim())
    .filter(Boolean);
  const ingredients = Array.from(
    document.querySelectorAll('input[name="ingredients"]')
  )
    .map((input) => input.value.trim())
    .filter(Boolean);
  const steps = Array.from(document.querySelectorAll('textarea[name="steps"]'))
    .map((textarea) => textarea.value.trim())
    .filter(Boolean);

  if (!title) {
    alert("Judul resep harus diisi");
    return false;
  }

  if (!time || isNaN(time) || time <= 0) {
    alert("Waktu memasak harus diisi dengan angka yang valid");
    return false;
  }

  if (!description) {
    alert("Deskripsi resep harus diisi");
    return false;
  }

  if (tools.length === 0) {
    alert("Minimal satu alat harus diisi");
    return false;
  }

  if (ingredients.length === 0) {
    alert("Minimal satu bahan harus diisi");
    return false;
  }

  if (steps.length === 0) {
    alert("Minimal satu langkah harus diisi");
    return false;
  }

  return true;
}
