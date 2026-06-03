import { getElement, getCurrentYear } from "../helper/helper.js"

const displayYear = {
    /**
     * Init display year
     * @returns {void}
     */
    init: () => {
        const yearEl = getElement.single('.year');
        displayYear.getYear(yearEl)
    },
    /**
     * Displays the full year in the fron end
     * @param {HTMLelement} yearEl - The html element
     * @returns {void}
     */
    getYear: (yearEl) => {
        const year = getCurrentYear();
        yearEl.textContent = year;
    }
}

export { displayYear }
