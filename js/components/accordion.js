import { getElement } from '../helper/helper.js';
import { accordionEvents } from '../controllers/accordion-even-handler.js';

const accordion = {
    /**
     * Initialize the accordion
     * @returns {void}
     */
    init: () => {
        const parentContainer = getElement.single('.accordion');
        const bodyContainer = parentContainer?.querySelectorAll('.accordion-body');
        const accordionItems = parentContainer?.querySelectorAll('.offerings-item');
        const accordionItemsBtn = parentContainer?.querySelectorAll('.accordion-link-button');

        if (!parentContainer || !bodyContainer.length || !accordionItems.length || !accordionItemsBtn.length) return;

        accordion.setDefaultActiveAccordion(bodyContainer);
        accordion.initAccordion(accordionItems, bodyContainer, accordionItemsBtn,);
        accordionEvents.init(accordionItems, bodyContainer, accordionItemsBtn);

        // Add debouncer on window resize
        let timer;
        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                accordion.updateHeightOnResize();
            }, 150);
        });
    },
    /**
     * Get the height of the accordion body container
     * @param {HTMLElement} contentBody - The thml of the container
     * @returns {number} The height of the accordion body container
     */
    getContentHeight: (contentBody) => contentBody.scrollHeight,
    /**
     * Set the first accordion to be visible on page load
     * @param {HTMLElement} bodyContainer - The body container target element
     * @returns {void}
     */
    setDefaultActiveAccordion: (bodyContainer) => bodyContainer[0].style.maxHeight = bodyContainer[0].scrollHeight + 'px',
    /**
     * Toggle the accordion on mouse click
     * @param {MouseEvent} event - The click event of the target element
     * @returns {void}
     */
    toggleAccordion: (event) => {
        const prevContent = getElement.single('.accordion-body.active');
        const currentContent = event?.currentTarget
            .closest('.offerings-item')
            .querySelector('.accordion-body');

        if (!prevContent || !currentContent) return;

        if (prevContent === currentContent) currentContent.style.maxHeight = null;

        if (prevContent) prevContent.style.maxHeight = null;

        currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
    },
    /**
     * Initialises accordion and update classes and attributes
     * @param {NodeListOf<HTMLElement>} accordionItems - The list of accordion item elements
     * @param {NodeListOf<HTMLElement>} bodyContainer - The list of body container elements
     * @param {NodeListOf<HTMLElement>} accordionItemsBtn - The list of accordion buttons elements
     * @returns {void}
     */
    initAccordion: (accordionItems, bodyContainer, accordionItemsBtn) => {
        accordionItemsBtn?.forEach((item) => {
            item?.addEventListener('click', (e) => {
                accordion.toggleAccordion(e);
                accordionEvents.updateCalssAndAtrrState(accordionItems, bodyContainer, accordionItemsBtn, e)
            })
        });
    },
    /**
     * Update the active body container height on window resize
     * @returns {void}
     */
    updateHeightOnResize: () => {
        const activeAccordion = getElement.single('.accordion-body.active');
        if (!activeAccordion) return;

        activeAccordion.style.maxHeight = activeAccordion.scrollHeight + 'px';
    }
}

export { accordion }
