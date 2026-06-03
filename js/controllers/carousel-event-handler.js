import { getElement } from "../helper/helper.js";
let prevSlide = 0;

const carouselEventHandler = {
    /**
     * Determines whether the current slide is the first slide
     * @param {number} currentSlide - The index of the slide
     * @returns {boolean} True if it's first slide otherwise false
     */
    isFirstSlide: currentSlide => currentSlide === 0,
    /**
     * Determines whether the current slide is the last slide
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @param {number} currentSlide - The index of the slide
     * @returns {boolean} True if it's the last slide otherwise false
     */
    isLastSlide: (slideItems, currentSlide) => currentSlide >= slideItems.length - 1,
    /**
     * Adds or removes the active class and attributes based on the current slide
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @param {number} currentSlide - The index of the slide
     * @returns {void}
     */
    slideClassState: (slideItems, currentSlide) => {
        const previous = slideItems[prevSlide];
        const current = slideItems[currentSlide];

        if (previous) {
            previous.classList.remove('active');
            previous.setAttribute('data-is-active', false);
        }

        if (current) {
            current.classList.add('active');
            current.setAttribute('data-is-active', true);
        }

        prevSlide = currentSlide;
    },
    /**
     * Resets the classes and attributes on all the slides
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @returns {void}
     */
    resetSlideClasses: slideItems => {
        slideItems.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('data-is-active', false);
        })
    },
    /**
     * Sets the active classes and attributes on the first slide
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @returns {void}
     */
    setClasses: (slideItems) => {
        carouselEventHandler.resetSlideClasses(slideItems);
        slideItems[0].classList.add('active');
        slideItems[0].setAttribute('data-is-active', true);
    },
    /**
     * Enables or Disables the button click events based on first or last slide
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @param {number} currentSlide - The index of the slide
     * @returns {void}
     */
    buttonState: (slideItems, currentSlide) => {
        const nextBtn = getElement.single('.carousel-control-next');
        const prevBtn = getElement.single('.carousel-control-prev');

        if (carouselEventHandler.isFirstSlide(currentSlide)) {
            prevBtn.setAttribute('data-is-first', true);
            nextBtn.setAttribute('data-is-last', false);
        }

        if (carouselEventHandler.isLastSlide(slideItems, currentSlide)) {
            nextBtn.setAttribute('data-is-last', true);
            prevBtn.setAttribute('data-is-first', false);
        }

    }
}

export { carouselEventHandler }
