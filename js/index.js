window.onload = function() {
    const elements = [
        { selector: '.hd', delay: 0 },
        { selector: '.nav', delay: 500 },
        { selector: '.xaq', delay: 1000 },
        { selector: '.mp', delay: 1800 },        
        { selector: '.work', delay: 2600 },
        { selector: '.cc', delay: 3400 }
    ];

    elements.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, item.delay);
        }
    });
};



let lastScrollTop = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.classList.add('hidden');
    } else {
        // Scrolling up
        nav.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values on iOS
});


  const container = document.getElementById('container');
const children = Array.from(container.getElementsByClassName('child'));

let activeIndex = null;

// Store the original content for each div
const originalContents = children.map(child => ({
    heading: child.querySelector('h1').innerText,
    paragraph: child.querySelector('p').innerText
}));

function updateLayout(index) {
    activeIndex = index;

    // Move the clicked child to the first position
    const reordered = [
        children[index],
        ...children.filter((_, i) => i !== index)
    ];

    // Clear container and re-append in new order
    container.innerHTML = '';
    reordered.forEach(child => container.appendChild(child));

    // Update styles and content
    reordered.forEach((child, i) => {
        child.classList.remove('width-24', 'width-30', 'width-90', 'show-paragraph');

        if (i === 0) {
            // Active div
            child.classList.add('width-90', 'show-paragraph');
            const idx = parseInt(child.getAttribute('data-index'));
            child.querySelector('h1').innerText = originalContents[idx].heading + "";
            child.querySelector('p').innerText = originalContents[idx].paragraph + "";
        } else {
            // Other divs
            child.classList.add('width-30');
            const idx = parseInt(child.getAttribute('data-index'));
            child.querySelector('h1').innerText = originalContents[idx].heading;
            child.querySelector('p').innerText = originalContents[idx].paragraph;
        }
    });
}

children.forEach((child, index) => {
    child.addEventListener('click', () => {
        if (activeIndex === index) {
            // If clicked again, reset to initial state
            activeIndex = null;
            container.innerHTML = '';
            children.forEach((child, i) => {
                child.classList.remove('width-30', 'width-90', 'show-paragraph');
                child.classList.add('width-24');
                child.querySelector('h1').innerText = originalContents[i].heading;
                child.querySelector('p').innerText = originalContents[i].paragraph;
                container.appendChild(child);
            });
        } else {
            updateLayout(index);
        }
    });
});
