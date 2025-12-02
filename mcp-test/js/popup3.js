document.addEventListener("DOMContentLoaded", () => {

  const popup3 = document.querySelector("#popup3");
  const popupClose3 = popup3.querySelector(".popup__close");
  const popupBack3 = popup3.querySelector(".popup__back");

  // All links that must open popup3
  const openPopupLinks3 = document.querySelectorAll(".open-popup3");

  // Open popup3 on click
  openPopupLinks3.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      popup3.classList.add("is-visible");
    });
  });

  // Close by X
  popupClose3.addEventListener("click", () => {
    popup3.classList.remove("is-visible");
  });

  // Close by background click
  popup3.addEventListener("click", e => {
    if (e.target === popup3) popup3.classList.remove("is-visible");
  });

  // Close by ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") popup3.classList.remove("is-visible");
  });
});
