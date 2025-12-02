const form = document.querySelector(".hero__form-fields");
const popup = document.querySelector("#popup");

// all .close elements INSIDE the popup
const closeButtons = popup.querySelectorAll(".close");

// Open popup on form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  popup.classList.add("is-visible");
  form.reset();
});

// Close by clicking any .close button
closeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("is-visible");
  });
});

// Close by clicking background
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("is-visible");
});

// Close by pressing ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.classList.remove("is-visible");
});
