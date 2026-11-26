const calm = matchMedia("(prefers-reduced-motion: reduce)");

for (const carousel of document.querySelectorAll(".carousel")) {
  const track = carousel.querySelector(".track");
  const controls = carousel.querySelector(".controls");
  const count = carousel.querySelector(".count");
  const slides = track.children;

  const step = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  const limit = () => track.scrollWidth - track.clientWidth;

  const update = () => {
    controls.hidden = limit() < 2;
    const shown = Math.max(1, Math.round(track.clientWidth / step()));
    const first = Math.min(slides.length - shown, Math.round(track.scrollLeft / step())) + 1;
    const range = shown > 1 ? first + "–" + (first + shown - 1) : first;
    const label = range + " / " + slides.length;
    if (count.textContent !== label) count.textContent = label;
  };

  const move = direction => {
    const end = limit();
    let left = (Math.round(track.scrollLeft / step()) + direction) * step();
    if (direction > 0 && track.scrollLeft >= end - 2) left = 0;
    if (direction < 0 && track.scrollLeft < step() / 2) left = end;
    track.scrollTo({ left, behavior: calm.matches ? "auto" : "smooth" });
  };

  carousel.querySelector(".prev").addEventListener("click", () => move(-1));
  carousel.querySelector(".next").addEventListener("click", () => move(1));
  track.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(track);
  carousel.classList.add("ready");
}
