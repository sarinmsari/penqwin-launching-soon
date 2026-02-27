window.addEventListener("load", function () {
  ScrollTrigger.refresh();
});
gsap.registerPlugin(ScrollTrigger);

const mask = document.getElementById("interactiveMask");
const zoomContainer = document.getElementById("zoomContainer");
const uiOverlay = document.getElementById("uiOverlay");

window.addEventListener("mousemove", (e) => {
  const rect = zoomContainer.getBoundingClientRect();

  // Calculate mouse position relative to the Zoom Container
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  mask.style.setProperty("--mouse-x", x + "%");
  mask.style.setProperty("--mouse-y", y + "%");

  const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
  gsap.to(zoomContainer, {
    rotationY: xPct * 3,
    rotationX: -yPct * 3,
    duration: 1,
    ease: "power2.out",
  });
});

// Split text
const subText = document.getElementById("subText");
subText.innerHTML = subText.innerText
  .split(" ")
  .map((w) => `<span class="word">${w}</span>`)
  .join("");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-track",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2,
    pin: ".viewport",
    pinSpacing: false,
  },
});

tl.to(
  "#title",
  {
    opacity: 1,
    y: 0,
    letterSpacing: "0.1em",
    duration: 0.8,
    ease: "power2.out",
  },
  0,
);

tl.fromTo(
  "#zoomContainer",
  { scale: 2.5 },
  { scale: 1, ease: "power1.inOut" },
  0,
);
tl.to("#badge", { opacity: 1, y: 0, duration: 0.4 }, 0.2);
tl.to(
  ".word",
  {
    y: "0%",
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: "back.out(1.5)",
  },
  0.3,
);

tl.to(
  "#typingCursor",
  {
    y: "0%",
    opacity: 1,
    duration: 0.6,
    onComplete: () =>
      document.getElementById("typingCursor").classList.add("blinking"),
    onReverseComplete: () =>
      document.getElementById("typingCursor").classList.remove("blinking"),
  },
  0.5,
);
