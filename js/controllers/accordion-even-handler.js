const accordionEvents = {
    /**
     * Initialises the accordion event handlers
     * @param {NodeListOf<HTMLElement>} accordionItems - The list of accordion item elements
     * @param {NodeListOf<HTMLElement>} bodyContainer - The list of body container elements
     * @param {NodeListOf<HTMLElement>} accordionItemsBtn - The list of accordion buttons elements
     * @returns {void}
     */
    init: (accordionItems, bodyContainer, accordionItemsBtn) => {
        if (!accordionItems.length || !bodyContainer.length || !accordionItemsBtn.length) return;

        accordionEvents.setAccClassesAndAttr(accordionItems, bodyContainer, accordionItemsBtn);
    },
    /**
     * Resets all the accordion classes and attributes
     * @param {NodeListOf<HTMLElement>} accordionItems - The list of accordion item elements
     * @param {NodeListOf<HTMLElement>} bodyContainer - The list of body container elements
     * @param {NodeListOf<HTMLElement>} accordionItemsBtn - The list of accordion buttons elements
     * @returns {void}
     */
    resetAccClasses: (accordionItems, bodyContainer, accordionItemsBtn) => {
        accordionItems?.forEach(item => item.classList.remove('active'));

        bodyContainer?.forEach(content => {
            content.classList.remove('active');
            content.dataset.isHidden = true;
        });

        accordionItemsBtn?.forEach(btn => btn.setAttribute('aria-expanded', false))
    },
    /**
     * Resets all the accordion classes and attributes and only sets the first accordion to be visible
     * @param {NodeListOf<HTMLElement>} accordionItems - The list of accordion item elements
     * @param {NodeListOf<HTMLElement>} bodyContainer - The list of body container elements
     * @param {NodeListOf<HTMLElement>} accordionItemsBtn - The list of accordion buttons elements
     * @returns {void}
     */
    setAccClassesAndAttr: (accordionItems, bodyContainer, accordionItemsBtn) => {
        accordionEvents.resetAccClasses(accordionItems, bodyContainer, accordionItemsBtn);

        accordionItems[0].classList.add('active');
        accordionItemsBtn[0].setAttribute('aria-expanded', true);
        bodyContainer[0].classList.add('active');
        bodyContainer[0].dataset.isHidden = false;
    },
    /**
     * Update the accordion class and attributes on click
     * @param {NodeListOf<HTMLElement>} accordionItems - The list of accordion item elements
     * @param {NodeListOf<HTMLElement>} bodyContainer - The list of body container elements
     * @param {NodeListOf<HTMLElement>} accordionItemsBtn - The list of accordion buttons elements
     * @param {*} event - tThe mouse click event
     * @returns {void}
     */
    updateCalssAndAtrrState: (accordionItems, bodyContainer, accordionItemsBtn, event) => {
        let currentTarget = event.target;
        const isOpen = currentTarget.getAttribute('aria-expanded') === true;
        const currentContent = currentTarget
            .closest('.offerings-item')
            .querySelector('.accordion-body');
        const currentAccItem = currentTarget
        .closest('.offerings-item');

        if (currentTarget.classList.contains('chevron')) {
            currentTarget = currentTarget.closest('.accordion-link-button');
        }

        if (!currentContent || !currentAccItem) return;

        if (!isOpen) {
            accordionEvents.resetAccClasses(accordionItems, bodyContainer, accordionItemsBtn);
            currentAccItem.classList.add('active');
            currentContent.classList.add('active');
            currentContent.dataset.isHidden = false;

            currentTarget.setAttribute('aria-expanded', true);
        }
    }
}

export { accordionEvents }
