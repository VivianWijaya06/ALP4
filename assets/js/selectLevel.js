function selectLevel(level) {
  const userData = JSON.parse(localStorage.getItem("cookeasyUser")) || {};
  userData.level = level;
  localStorage.setItem("cookeasyUser", JSON.stringify(userData));

  if (level === "beginner") {
    window.location.href = "guide.html";
  } else {
    window.location.href = "index.html";
  }
}
