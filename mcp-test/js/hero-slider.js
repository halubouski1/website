  const track = document.querySelector('.hero__track');
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  const prevBtn = document.querySelector('.hero__nav--prev');
  const nextBtn = document.querySelector('.hero__nav--next');
  const badgeTitle = document.querySelector('.hero__badge-text');
  const badgePrice = document.querySelector('.hero__badge-price');

  let currentIndex = 0;

  function showSlide(index) {
    // loop index
    currentIndex = (index + slides.length) % slides.length;

    // move track
 track.style.transform = `translateX(-${currentIndex * 100}%)`;


    // update badge
    const active = slides[currentIndex];
    badgeTitle.textContent = active.dataset.title;
    badgePrice.textContent = active.dataset.price;
  }

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  // init first slide
  showSlide(0);

  