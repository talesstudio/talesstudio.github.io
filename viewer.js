const viewer = document.querySelector(".viewer");
const frame = viewer.querySelector("img");
const still = matchMedia("(prefers-reduced-motion: reduce)");
let current = null;

for (const link of document.querySelectorAll("a.zoom")) {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    const thumb = link.querySelector("img");
    const full = still.matches && link.dataset.still ? link.dataset.still : link.href;
    current = link;
    frame.alt = thumb.alt;
    frame.classList.toggle("pixel", link.classList.contains("pixel"));
    frame.src = thumb.currentSrc || thumb.src;
    viewer.showModal();
    const large = new Image();
    large.src = full;
    large.decode().then(() => {
      if (current === link) frame.src = full;
    }).catch(() => {});
  });
}

viewer.addEventListener("click", () => viewer.close());

viewer.addEventListener("close", () => {
  current = null;
  frame.removeAttribute("src");
});
