const scrollToTopEvent = {
    /**
     * Init scroll to top
     * @param {HTMLElement} btnEl - The Html target element
     * @returns {void}
     */
    init: (btnEl) => {
        if (!btnEl) return;

        scrollToTopEvent.showScrollBtn(btnEl);

        let isTicking = false;
        window.addEventListener('scroll', () => {
            if (!btnEl) return;

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    scrollToTopEvent.showScrollBtn(btnEl);
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        scrollToTopEvent.btnEventListener(btnEl);
    },
    /**
     * Show/hide scroll to top button based on scroll position
     * @param {HTMLElement} btnEl - The Html target element
     * @returns {void}
     */
    showScrollBtn: (btnEl) => {
        const pageYOffset = window.pageYOffset;

        if (pageYOffset > 100) {
            btnEl.classList.add('show');
        } else {
            btnEl.classList.remove('show');
        }
    },
    /**
     * Determines the position to scroll to the top of the page
     * @param {Window} target - windowObj The window object to scroll.
     * @returns {void}
     */
    scrollTo: (target) => {
        target.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },
    /**
     * Adds a click event listener to the scroll btn
     * @param {HTMLElement} btnEl - The Html target element
     * @returns {void}
     */
    btnEventListener: (btnEl) => {
        btnEl.addEventListener('click', () => {
            scrollToTopEvent.scrollTo(window)
        })
    }
}

export { scrollToTopEvent }
