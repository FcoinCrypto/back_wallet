function loadNavbar() {
    fetch("navbar.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("navbar").innerHTML = html;
      })
      .catch((error) => console.error("Error:", error));
  }
  
  function loadSidebar() {
    fetch("sidebar.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("sidebar").innerHTML = html;
      })
      .catch((error) => console.error("Error:", error));
  }
  
  function loadContent() {
    fetch("content.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content").innerHTML = html;
      })
      .catch((error) => console.error("Error:", error));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadSidebar();
    loadContent();
  });
  