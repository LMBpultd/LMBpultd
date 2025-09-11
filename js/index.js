window.onload = function() {
    const elements = [
        { selector: '.hd', delay: 0 },
        { selector: '.nav', delay: 1000 },
        { selector: '.xaq', delay: 1000 },
        { selector: '.mp', delay: 2000 },
        { selector: '.cc', delay: 2700 }
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
