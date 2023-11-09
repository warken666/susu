function toggleNavbar() {
  var navList = document.getElementById("navList");
  if (navList.style.display === "block") {
    navList.style.display = "none";
  } else {
    navList.style.display = "block";
  }
}

const contentContainer = document.getElementById("content-container");
const contentElement = document.getElementById("content");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const goButton = document.getElementById("goButton");
const toggleModeButton = document.getElementById("toggleModeButton");
const increaseFontSizeButton = document.getElementById(
  "increaseFontSizeButton"
);
const decreaseFontSizeButton = document.getElementById(
  "decreaseFontSizeButton"
);
const pageNumberInput = document.getElementById("pageNumberInput");
const titleElement = document.getElementById("title");

let currentPage = 1;
let darkMode = false;
let fontSize = 16; // Ukuran font awal

function loadContent(pageNumber) {
  const filename = `content/page${pageNumber}.txt`;
  fetch(filename)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");
      const title = lines[0].trim();
      titleElement.textContent = title;
      contentElement.innerHTML = highlightText(lines.slice(1).join("<br>"));
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      titleElement.textContent = "Error loading content.";
      contentElement.innerHTML = "";
    });
}

function highlightText(text) {
  // Temukan teks yang diapit oleh '[' dan ']'
  const regex = /\[(.*?)\]/g;
  return text.replace(regex, '<span class="highlight"> [ $1 ] </span>');
}

function nextPage() {
  currentPage++;
  loadContent(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadContent(currentPage);
  }
}

function goToPage() {
  const pageNumber = parseInt(pageNumberInput.value, 10);
  if (!isNaN(pageNumber) && pageNumber > 0) {
    currentPage = pageNumber;
    loadContent(currentPage);
    pageNumberInput.value = "";
  }
}

function toggleMode() {
  darkMode = !darkMode;
  contentContainer.classList.toggle("dark-mode", darkMode);
  const modeIcon = document.getElementById("modeIcon");
  modeIcon.textContent = darkMode ? "🌜" : "🌞";
}

function formatText(text) {
  // Temukan dan tandai teks diapit dengan [ dan ], ubah warnanya menjadi hijau
  const regex = /\[(.*?)\]/g;
  const formattedText = text.replace(
    regex,
    '<span style="color: green;">[$1]</span>'
  );
  return formattedText;
}

function changeFontSize(action) {
  if (action === "increase") {
    fontSize += 2;
  } else if (action === "decrease") {
    fontSize = Math.max(10, fontSize - 2); // Menetapkan ukuran font minimum
  }
  contentContainer.style.fontSize = `${fontSize}px`;
}

// Load initial content
loadContent(currentPage);

// Add event listeners for the next, previous, go, toggle mode, increase, and decrease buttons
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", prevPage);
goButton.addEventListener("click", goToPage);
toggleModeButton.addEventListener("click", toggleMode);
increaseFontSizeButton.addEventListener("click", () =>
  changeFontSize("increase")
);
decreaseFontSizeButton.addEventListener("click", () =>
  changeFontSize("decrease")
);
