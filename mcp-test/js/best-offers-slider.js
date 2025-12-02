document.addEventListener('DOMContentLoaded', function () {
    const viewport = document.querySelector('.best-offers__viewport');
    if (!viewport) return;

    const track   = viewport.querySelector('.best-offers__cards');
    const cards   = track.querySelectorAll('.best-offers__card');
    const prevBtn = document.querySelector('.best-offers__nav--prev');
    const nextBtn = document.querySelector('.best-offers__nav--next');

    if (!cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let visibleCount = 4; // по умолчанию 4 на десктопе
    let step = 0;

    function detectVisibleCount() {
        const w = window.innerWidth;

        if (w <= 600) {
            visibleCount = 1;
        } else if (w <= 1024) {
            visibleCount = 2;
        } else {
            visibleCount = 4;
        }

        // чтобы не было странностей, если карточек меньше
        visibleCount = Math.min(visibleCount, cards.length);
    }

    function recalc() {
        if (!cards.length) return;

        detectVisibleCount();

        const styles    = getComputedStyle(track);
        const gap       = parseFloat(styles.gap) || 0;
        const cardWidth = cards[0].offsetWidth;
        step            = cardWidth + gap;

        updateSlider();
    }

    function updateSlider() {
        const maxIndex = Math.max(0, cards.length - visibleCount);

        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0)        currentIndex = 0;

        const offset = -currentIndex * step;
        track.style.transform = `translateX(${offset}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }

    prevBtn.addEventListener('click', function () {
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex++;
        updateSlider();
    });

    window.addEventListener('resize', recalc);

    recalc();
});