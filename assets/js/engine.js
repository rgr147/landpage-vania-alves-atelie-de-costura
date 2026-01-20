const track = document.getElementById("mesversarioTrack");
const btnPrev = document.querySelector(".mesversario-btn.prev");
const btnNext = document.querySelector(".mesversario-btn.next");
const dotsContainer = document.getElementById("mesversarioDots");
const slides = Array.from(track.querySelectorAll(".mesversario-slide"));

// cria dots
slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "mesversario-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    dot.addEventListener("click", () => scrollToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll(".mesversario-dot"));

function scrollToSlide(index) {
    // mais preciso do que calcular por largura
    slides[index].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest"
    });
}

btnNext.addEventListener("click", () => {
    const i = getCurrentIndex();
    if (i < slides.length - 1) scrollToSlide(i + 1);
});

btnPrev.addEventListener("click", () => {
    const i = getCurrentIndex();
    if (i > 0) scrollToSlide(i - 1);
});

function getCurrentIndex() {
    // acha o slide mais perto da posição atual
    const scrollLeft = track.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    return closestIndex;
}

function updateUI() {
    const index = getCurrentIndex();

    dots.forEach((d, i) => d.classList.toggle("active", i === index));

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === slides.length - 1;
}

track.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateUI);
});

// se mudar tamanho (mobile->desktop), recalcula certinho
window.addEventListener("resize", updateUI);

updateUI();   