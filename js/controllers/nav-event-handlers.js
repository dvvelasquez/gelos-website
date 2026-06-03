import { getElement } from "../helper/helper.js";

const navEventHandler = {
    /**
     * Initialise and display the main navigation
     * @async
     * @returns {void}
     */
    init: () => {
        const navItems = getElement.multiple('.nav-links');
        const navContainers = getElement.multiple(['.main-nav-container.mobile-nav','.main-nav-container.desktop-nav']);

        if (!navItems?.length || !navContainers?.length) return;

        navEventHandler.updateNavClasses(navItems, navContainers);

        navEventHandler.updateNavClassOnWindowLocation(navItems, navContainers);

        window.addEventListener('hashchange', () => {
            navEventHandler.updateNavClassOnWindowLocation(navItems, navContainers);
        })
    },
    /**
     * Remove active current classes and attributes from all navigation buttons
     * @param {NodeListOf<HTMLElement>} items - The list of the buttons html element
     * @returns {void}
     */
    resetClass: (items) => {
        if (!items?.length) return;

        items?.forEach(item => {
            item.classList.remove('is-active');
            item.removeAttribute('aria-current');
        });
    },
    /**
     * Append the class and attribute to the target element
     * @param {HTMLElement} item - The target html element
     * @returns {void}
     */
    addNavItemClasses: (item) => {
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'location');
    },
    /**
     * Update the classes and attributes of the current active nav button
     * @param {NodeListOf<HTMLElement>} items - The list of the buttons html elements
     * @param {NodeListOf<HTMLElement>} containers - The list of the containers html elements
     * @returns {void}
     */
    updateNavClasses: (items, containers) => {
        if (!items?.length || !containers?.length) return;

        navEventHandler.resetClass(items);

        containers.forEach(container => {
            const items = container.querySelectorAll('.nav-links');

            items[0]?.classList.add('is-active');
            items[0]?.setAttribute('aria-current', 'location');

            items?.forEach(item => {
                item.addEventListener('click', () => {
                    navEventHandler.resetClass(items);
                    item.classList.add('is-active');
                    item.setAttribute('aria-current', 'locatoin');
                })
            })
        });

    },
    /**
     * Show/Hide menu container on mouse click event
     * @param {Event & CustomEventData} e - The target event object
     * @param {HTMLElement} navContainer - The html container element
     * @returns {void}
     */
    navContainerAddClasses: (e, navContainer) => {
        if (!e || !navContainer) return;

        e.preventDefault();
        const navBtn = e.target;
        const isActive = navBtn.getAttribute('aria-expanded') === 'true';
        const isNavActive = navContainer.getAttribute('data-is-open') === 'true';

        if (!isNavActive && !isActive) {
            navContainer.classList.add('is-active');
            navContainer.classList.remove('is-hidden');
            navContainer.closest('body').classList.add('menu-is-open');

            navBtn.setAttribute('aria-expanded', 'true');
        } else {
            navContainer.classList.remove('is-active');
            navContainer.classList.add('is-hidden');
            navContainer.closest('body').classList.remove('menu-is-open');

            navBtn.setAttribute('aria-expanded', 'false');
        }
    },
    /**
     * Updates the navigation item on hashchange
     * @param {NodeListOf<HTMLElement>} items - The list of the buttons html elements
     * @param {NodeListOf<HTMLElement>} containers - The list of the containers html elements
     * @returns {void}
     */
    updateNavClassOnWindowLocation: (items, containers) => {
        if (!items.length || !containers?.length) return;

        const hash = window.location.hash || '#about';
        if (!hash) return;

        navEventHandler.resetClass(items);
        containers.forEach(container => {
            const navLink = container.querySelectorAll(`.nav-links[href="${hash}"]`);
            navLink.forEach(item => {
                item.classList.add('is-active');
                item.setAttribute('aria-current', 'location');
            })
        })
    }
}

export { navEventHandler }
