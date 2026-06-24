const config = {
  herName: "Madhu",
  yourName: "Suman",
  date: "June 24, 2026",
  photos: {
    photo1: {
      src: "madhuu.jpeg",
      caption: "You",
      alt: "A couple sharing a sweet moment together",
    },
    photo2: {
      src: "myyyy.jpeg",
      caption: "Me",
      alt: "A couple laughing and enjoying time together",
    },
  },
  loveGif: {
    src: "nono.gif",
    alt: "A cute love animation",
  },
};

function isMobile() {
  return window.matchMedia("(max-width: 600px)").matches;
}

function getYesTransform(scale = 1) {
  if (isMobile()) {
    return `translate(-50%, -50%) scale(${scale})`;
  }
  return `translate(-120%, -50%) scale(${scale})`;
}

function applyConfig() {
  document.querySelectorAll("[data-name]").forEach((el) => {
    const placeholder = el.getAttribute("data-name");
    if (placeholder === "[Her Name]") {
      el.textContent = config.herName;
    } else if (placeholder === "[Your Name]") {
      el.textContent = config.yourName;
    }
  });

  const dateEl = document.querySelector(".letter-date");
  if (dateEl) {
    dateEl.textContent = config.date;
    dateEl.setAttribute("datetime", new Date(config.date).toISOString().split("T")[0]);
  }

  document.title = `For ${config.herName}, Always`;

  Object.entries(config.photos).forEach(([key, photo]) => {
    const captionEl = document.querySelector(`[data-caption="${key}"]`);
    const imgEl = captionEl?.closest(".photo-card")?.querySelector("img");
    if (captionEl) captionEl.textContent = photo.caption;
    if (imgEl) {
      imgEl.src = photo.src;
      imgEl.alt = photo.alt;
    }
  });

  const loveGif = document.getElementById("loveGif");
  if (loveGif && config.loveGif) {
    loveGif.src = config.loveGif.src;
    loveGif.alt = config.loveGif.alt;
  }
}

function createPetals() {
  const container = document.querySelector(".petals");
  container.innerHTML = "";
  const count = isMobile() ? 8 : 20;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 10}s`;
    petal.style.animationDelay = `${Math.random() * 10}s`;
    petal.style.width = `${10 + Math.random() * 8}px`;
    petal.style.height = `${14 + Math.random() * 10}px`;
    container.appendChild(petal);
  }
}

function resetLoveQuestion() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const hint = document.getElementById("noHint");

  if (isMobile()) {
    noBtn.style.left = "50%";
    noBtn.style.top = "62%";
    noBtn.style.transform = "translate(-50%, -50%)";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "38%";
  } else {
    noBtn.style.left = "58%";
    noBtn.style.top = "50%";
    noBtn.style.transform = "translateY(-50%)";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
  }

  noBtn.classList.remove("is-floating");
  noBtn.dataset.dodges = "0";
  yesBtn.style.transform = getYesTransform(1);
  hint.classList.add("hidden");
}

let lastNoMove = 0;

function moveNoButton(event) {
  if (event?.type === "touchstart") {
    event.preventDefault();
  }

  const now = Date.now();
  if (now - lastNoMove < 80) return;
  lastNoMove = now;

  const container = document.getElementById("loveActions");
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const hint = document.getElementById("noHint");

  noBtn.classList.add("is-floating");
  noBtn.style.transform = "none";

  const containerRect = container.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const padding = isMobile() ? 12 : 8;

  const maxX = containerRect.width - noRect.width - padding;
  const maxY = containerRect.height - noRect.height - padding;

  const x = padding + Math.random() * Math.max(maxX, 0);
  const y = padding + Math.random() * Math.max(maxY, 0);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const dodges = Number(noBtn.dataset.dodges || 0) + 1;
  noBtn.dataset.dodges = dodges;
  yesBtn.style.transform = getYesTransform(1 + Math.min(dodges, 5) * 0.05);

  hint.classList.remove("hidden");
}

function openLoveQuestion() {
  const hero = document.getElementById("hero");
  const loveQuestion = document.getElementById("loveQuestion");

  hero.classList.add("fade-out");

  setTimeout(() => {
    hero.style.display = "none";
    loveQuestion.classList.remove("hidden");
    resetLoveQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 500);
}

function showLetter() {
  const loveQuestion = document.getElementById("loveQuestion");
  const letter = document.getElementById("letter");

  loveQuestion.classList.add("fade-out");

  setTimeout(() => {
    loveQuestion.style.display = "none";
    letter.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 500);
}

applyConfig();
createPetals();

document.getElementById("openBtn").addEventListener("click", openLoveQuestion);
document.getElementById("yesBtn").addEventListener("click", showLetter);
document.getElementById("noBtn").addEventListener("click", moveNoButton);
document.getElementById("noBtn").addEventListener("touchstart", moveNoButton, { passive: false });

if (window.matchMedia("(hover: hover)").matches) {
  document.getElementById("noBtn").addEventListener("mouseenter", moveNoButton);
}

window.addEventListener("resize", () => {
  const loveQuestion = document.getElementById("loveQuestion");
  if (!loveQuestion.classList.contains("hidden") && loveQuestion.style.display !== "none") {
    resetLoveQuestion();
  }
  createPetals();
});