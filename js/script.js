 const h1 = document.getElementById("profile-name");
      const modal = document.getElementById("imageModal");
      const closeBtn = document.getElementById("closeBtn");
      const downloadBtn = document.getElementById("downloadBtn");
      const modalImage = document.getElementById("modalImage");

      // Open modal when clicking on h1
      h1.addEventListener("click", () => {
        modal.style.display = "flex";
      });

      // Close modal
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Ensure download button works
      downloadBtn.href = modalImage.src;



      // scroll image school
const images = [
  {src: "img/lfhs.webp", title: "L F H S Oonnukal", text: "More Details", link: "../school/lfhs.html"},
  {src: "img/sshss.webp", title: "S S H S S Keerampara", text: "More Details", link: "../school/sshss.html"},
  {src: "img/ymbc.webp", title: "Y M B C Kothamangalam", text: "More Details", link: "../school/ymbc.html"}
];

let current = 0;
const imageElement = document.getElementById("carousel-image");
const titleElement = document.getElementById("desc-title");
const textElement = document.getElementById("desc-text");
const dots = document.querySelectorAll(".dot");
const carousel = document.getElementById("carousel");

function showSlide(index) {
  current = (index + images.length) % images.length;
  imageElement.style.opacity = 0;

  setTimeout(() => {
    imageElement.src = images[current].src;
    titleElement.textContent = images[current].title;

    // make text clickable as hyperlink
    textElement.innerHTML = `<a href="${images[current].link}" class="desc-link">${images[current].text}</a>`;

    imageElement.style.opacity = 1;
  }, 300);

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}

// Buttons
document.querySelector(".prev").addEventListener("click", () => {
  showSlide(current - 1);
});

document.querySelector(".next").addEventListener("click", () => {
  showSlide(current + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

// Auto play every 5 seconds
setInterval(() => {
  showSlide(current + 1);
}, 7000);

// --- Scroll Support (mouse wheel / trackpad) ---
let scrollTimeout;
window.addEventListener("wheel", (e) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (e.deltaY > 0) {
      showSlide(current + 1); // scroll down
    } else {
      showSlide(current - 1); // scroll up
    }
  }, 100);
});

// --- Swipe Support (mobile finger left/right) ---
let startX = 0;
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) > 50) { // minimum swipe distance
    if (diff > 0) {
      showSlide(current + 1); // swipe left → next
    } else {
      showSlide(current - 1); // swipe right → prev
    }
  }
});

// Initialize first slide
showSlide(0);
