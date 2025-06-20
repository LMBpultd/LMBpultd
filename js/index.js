document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.image-wrapper');
  const container = document.querySelector('.imagesec');
  let current = 0;
  let autoScrollInterval;
  let direction = 1; // 1 for forward, -1 for backward
  let isUserInteracting = false;

  if (!wrappers.length || !container) {
    console.warn("Missing required DOM elements: check '.image-wrapper' or '.imagesec'");
    return;
  }

  const scrollToImage = (index) => {
    const target = wrappers[index];
    if (target) {
      const left = target.offsetLeft;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const goToImage = (step) => {
    current += step;
    if (current >= wrappers.length) {
      current = wrappers.length - 1;
      direction = -1;
    } else if (current < 0) {
      current = 0;
      direction = 1;
    }
    scrollToImage(current);
  };

  container.addEventListener('scroll', () => {
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = current;
    let minDistance = Infinity;

    wrappers.forEach((wrapper, index) => {
      const distance = Math.abs(wrapper.getBoundingClientRect().left - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    current = closestIndex;
  });

  const startAutoScroll = () => {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    if (!isUserInteracting) {
      autoScrollInterval = setInterval(() => {
        goToImage(direction);
      }, 3000);
    }
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  };

  // Pause auto scroll on user interaction (mouse or touch)
  const onUserInteractStart = () => {
    isUserInteracting = true;
    stopAutoScroll();
  };
  const onUserInteractEnd = () => {
    isUserInteracting = false;
    startAutoScroll();
  };

  wrappers.forEach(wrapper => {
    wrapper.addEventListener('mousedown', onUserInteractStart);
    wrapper.addEventListener('touchstart', onUserInteractStart, { passive: true });
    wrapper.addEventListener('mouseup', onUserInteractEnd);
    wrapper.addEventListener('mouseleave', onUserInteractEnd);
    wrapper.addEventListener('touchend', onUserInteractEnd);
    wrapper.addEventListener('touchcancel', onUserInteractEnd);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });

  window.addEventListener('beforeunload', () => {
    stopAutoScroll();
  });

  scrollToImage(current);
  startAutoScroll();
});

  const logo = document.getElementById("logo");
  const sideMenu = document.getElementById("sideMenu");
  const menuLinks = sideMenu.querySelectorAll("a");

  // Toggle menu when logo is clicked
  logo.addEventListener("click", function () {
    sideMenu.classList.toggle("active");
  });

  // Hide menu when any link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });
  });



  const cards = document.querySelectorAll('.cards');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove 'flipped' from all cards
      cards.forEach(c => c.classList.remove('flipped'));
      // Add 'flipped' to the clicked one
      card.classList.add('flipped');
    });
  });

  // Optional: clicking the same card again flips it back
  document.addEventListener('click', (e) => {
    const targetCard = e.target.closest('.cards');
    cards.forEach(card => {
      if (card !== targetCard) card.classList.remove('flipped');
    });
  });

