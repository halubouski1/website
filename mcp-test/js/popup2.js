document.addEventListener("DOMContentLoaded", () => {
  const form2 = document.querySelector(".we-can-do__form");
  const popup2 = document.querySelector("#popup2");
  const popupClose2 = popup2.querySelector(".popup__close");
  const popupReturn2 = popup2.querySelector(".cars-in-stock__catalog-button");

  if (!form2 || !popup2) return; // safety check

  // Open popup on form submit
  form2.addEventListener("submit", function (e) {
    e.preventDefault();
    popup2.classList.add("is-visible");
    form2.reset();                 // <- was form.reset()
  });

  // Close by X
  popupClose2.addEventListener("click", () => {
    popup2.classList.remove("is-visible");
  });

  // Close by clicking background
  popup2.addEventListener("click", (e) => {
    if (e.target === popup2) popup2.classList.remove("is-visible");
  });

  // Close by pressing ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup2.classList.remove("is-visible");
  });

  // Close by button in popup
  popupReturn2.addEventListener("click", (e) => {
    e.preventDefault();
    popup2.classList.remove("is-visible");
  });
});
