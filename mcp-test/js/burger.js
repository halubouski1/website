const burger = document.querySelector(".header__burger");
const offcanvas = document.querySelector("#offcanvas");
const closeBtn = document.querySelector(".offcanvas__close");

function openOffcanvas() {
  offcanvas.classList.add("is-open");
  document.body.classList.add("body--offcanvas-open");
}

function closeOffcanvas() {
  offcanvas.classList.remove("is-open");
  document.body.classList.remove("body--offcanvas-open");
}

burger.addEventListener("click", openOffcanvas);
closeBtn.addEventListener("click", closeOffcanvas);

// Optional: close on Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOffcanvas();
  }
});
