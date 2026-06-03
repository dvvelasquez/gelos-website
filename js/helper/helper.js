/**
 * Query selector to target a single or multiple elements from the DOM
 * @param {string} selector - A CSS class selector string
 * @returns {NodeListOf<Element>} - A list of selected html elements
 */
const getElement = {
    single: (selector) => document.querySelector(selector),
    multiple: (selector) => document.querySelectorAll(selector)
}

/**
 * Get the current year to display in footer
 * @returns {string} The current year
 */
const getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear.toString();
}

export { getElement, getCurrentYear }
