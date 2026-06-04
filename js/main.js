import { getElement } from "./helper/helper.js";
import { getNavigationData } from "./controllers/navigation-model.controller.js";
import { displayGelosNavigation } from "./components/display-main-nav-list.js";
import { sliderCarousel } from './components/carousel.js';
import { accordion } from './components/accordion.js';
import { form } from "./controllers/form-validation.js";
import { displayYear } from "./components/display-year.js";
import { displayScrollBtn } from "./components/display-scroll-up-btn.js";
// import { chatbot } from "./components/chatbot.js"

const init = async () => {
    const navListData = await getNavigationData();
    if (!navListData) return;

    displayGelosNavigation.init(navListData);
    displayYear.init();
    displayScrollBtn.init();
    // chatbot.init();

    const homePage = getElement.single('.homepage');
    if (homePage) {
        sliderCarousel.init();
        accordion.init();
        form.init();
    }
}

document.addEventListener("DOMContentLoaded", init);
