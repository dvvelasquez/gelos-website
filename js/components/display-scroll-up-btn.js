import { getElement } from '../helper/helper.js';
import { scrollToTopEvent } from '../controllers/scroll-to-top-event-handler.js';

const displayScrollBtn = {
    init: () => {
        const bodyEl = getElement.single('body');

        displayScrollBtn.appendToPage(bodyEl);

        const btnEl = getElement.single('.scroll-btn')
        scrollToTopEvent.init(btnEl);
    },
    template: () => {
        return `
            <button id="scrollToTopBtn" class="scroll-btn" title="Scroll to top"></button>
        `
    },
    appendToPage: (bodyEl) => {
        bodyEl.insertAdjacentHTML('beforeend', displayScrollBtn.template());
    }
}

export { displayScrollBtn }
