window.onload = function () {
  console.log("Cargando JS: navbarapp.script.js");
  /*==================== NAVBAR ====================*/
  var showMenu = (headerToggle, navbarId) => {
    var toggleBtn = document.getElementById(headerToggle),
      nav = document.getElementById(navbarId);

    if (headerToggle && navbarId) {
      toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("show-navbarapp");
        toggleBtn.classList.toggle("fa-xmark");
      });
    }
  };
  showMenu("navbarapp-toggle", "navbarapp");

  /*==================== LINK ACTIVADO ====================*/
  const linkColor = document.querySelectorAll(".nav__link");

  function colorLink() {
    linkColor.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }

  linkColor.forEach((l) => l.addEventListener("click", colorLink));
};
