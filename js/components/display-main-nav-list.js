import { getElement } from "../helper/helper.js";
import { navEventHandler } from "../controllers/nav-event-handlers.js"

const displayGelosNavigation = {
    /**
     * Initialise and display the main navigation
     * @async
     * @returns {void}
     */
    init: async (navListData) => {
        const { status, navList} = await navListData;
        const mainNavUL = getElement.multiple('.nav-items-wrapper');

        if (status !== 'ok' || !navList?.length || !mainNavUL.length) return;

        displayGelosNavigation.renderMainNav(navList, mainNavUL);
        navEventHandler.init();

        const hamburgerBtn = getElement.single('.site-nav-btn');
        const navContainer = getElement.single('.main-nav-container.mobile-nav');
        const body = getElement.single('body');
        if (!hamburgerBtn || !navContainer || !body) return;

        displayGelosNavigation.showHideMainNav(hamburgerBtn, navContainer);

        displayGelosNavigation.closeMainNav(body, hamburgerBtn, navContainer);
    },
    /**
     * Fetch the navigatioj items of the main navigation to create the html template
     * @param {Object} items - the main navigation model
     * @returns {String} the html template with the menu items list
     */
    navigationListTemplate: (items) => {
        if (!items || !items || !items?.length) return;

        const listItems = items;
        const navItems = listItems?.map(items => {
            const slug = items.toLowerCase().replace(/\s+/g, '-');
            const isHomepage = getElement.single('.homepage');
            const updatedSlug = isHomepage ? `#${slug}` : `/index.html#${slug}`;
            return `
                <li class="nav-items" role="presentation">
                    <a class="nav-links is-active"
                        aria-current="location"
                        href="${updatedSlug}">
                        ${items ? items : 'Missing Item'}
                    </a>
                </li>
            `;
        }).join(' ');

        return navItems;
    },
    /**
     * Appends and Render the main navigation model in the container
     * @param {Object} items - The main navigation model
     * @param {NodeList<HTMLElement>} navContainers - The list of the html elements
     * @returns {void}
     */
    renderMainNav: (navList, navContainers)  => {
        navContainers.forEach(container => {
            container.insertAdjacentHTML('afterbegin', displayGelosNavigation.navigationListTemplate(navList))
        })
    },
    /**
     * Initialise the main menu class event handlers
     * @param {HTMLElement} navBtn - the button html element
     * @param {HTMLElement} navContainer - the container html element
     * @returns {void}
     */
    showHideMainNav: (navBtn, navContainer) => {
        navBtn.addEventListener('click', e => navEventHandler.navContainerAddClasses(e, navContainer));
    },
    /**
     * Close main menu on click out of the target area
     * @param {HTMLElement} body - the body html element
     * @param {HTMLElement} navBtn - the hamburger html button element
     * @param {HTMLElement} navContainer - the main container html element
     */
    closeMainNav: (body, navBtn, navContainer) => {
        const headerContainer = body.querySelector('header');

        body.addEventListener('click', (e) => {
            if (body.classList.contains('menu-is-open')
                && !navContainer.contains(e.target)
                && !headerContainer.contains(e.target)
                && !navBtn.contains(e.target)) {
                navBtn.click();
            };
        });
    }
}

export { displayGelosNavigation }
