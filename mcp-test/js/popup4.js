const form4 = document.querySelector(".popup-form");
const popup4 = document.querySelector("#popup4");

// all .close elements INSIDE the popup
const popupReturn4 = popup4.querySelector(".close");


// Open popup on form submit
form4.addEventListener("submit", function (e) {
  e.preventDefault();
  popup4.classList.add("is-visible");
  form4.reset();
});

// Close by clicking any .close button
closeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    popup4.classList.remove("is-visible");
  });
});

// Close by clicking background
popup4.addEventListener("click", (e) => {
  if (e.target === popup4) popup4.classList.remove("is-visible");
});

// Close by pressing ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.classList.remove("is-visible");
});
