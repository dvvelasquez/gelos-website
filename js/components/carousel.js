import { getElement } from '../helper/helper.js';
import { carouselEventHandler } from '../controllers/carousel-event-handler.js';
let currentSlide = 0;

const sliderCarousel = {
    /**
     * Initialise the carouse slider
     * @returns {void}
     */
    init: () => {
        const slideContainer = getElement.single('.carousel-inner');
        const slideItems = slideContainer.querySelectorAll('.carousel-item');
        if (!slideContainer && !slideItems?.length) return;

        const nextBtn = document.querySelector('.carousel-control-next');
        const prevtBtn = document.querySelector('.carousel-control-prev');

        sliderCarousel.slidesPosition(slideItems);
        nextBtn.addEventListener('click', (e) => sliderCarousel.goToNextSlideOnClick(e, slideContainer, slideItems));
        prevtBtn.addEventListener('click', (e) => sliderCarousel.goToPrevoiusSlideOnClick(e, slideContainer, slideItems));
    },
    /**
     * Detect current slide index to display
     * @param {Number} slideNum - the target slide index
     * @param {HTMLElement} slideContainer - the carousel html container
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @return {void}
     */
    goToSlide: (slideNum, slideContainer, slideItems) => {
        const slideIndex = Math.min(slideNum, slideItems.length - 1);
        slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
    },
    /**
     * Go to next slider on next button click
     * @param {MouseEvent} e - the target element click event
     * @param {HTMLElement} slideContainer - the carousel html container
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * r@returns {void}
     */
    goToNextSlideOnClick: (e, slideContainer, slideItems) => {
        e.preventDefault();
        if (currentSlide >= slideItems?.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        sliderCarousel.goToSlide(currentSlide, slideContainer, slideItems);
        carouselEventHandler.slideClassState(slideItems, currentSlide);
        carouselEventHandler.buttonState(slideItems, currentSlide);
    },
    /**
     * Go to previous slider on prev button click
     * @param {MouseEvent} e - the target element click event
     * @param {HTMLElement} slideContainer - the carousel html container
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @returns {void}
     */
    goToPrevoiusSlideOnClick: (e, slideContainer, slideItems) => {
        e.preventDefault();
        if (currentSlide <= 0) {
            currentSlide = slideItems?.length - 1;
        } else {
            currentSlide--;
        }

        sliderCarousel.goToSlide(currentSlide, slideContainer, slideItems);

        carouselEventHandler.slideClassState(slideItems, currentSlide);
        carouselEventHandler.buttonState(slideItems, currentSlide);
    },
    /**
     * The initial position of each slide
     * @param {NodeListOf<HTMLElement>} slideItems - the list of slider elements
     * @returns {void}
     */
    slidesPosition: (slideItems) => {
        carouselEventHandler.setClasses(slideItems);
        slideItems.forEach((slide, index) => {
            slide.style.left =  `${index * 100}%`;
        });
    }
}

export { sliderCarousel }
