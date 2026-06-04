import { getElement } from '../helper/helper.js';

const chatbot = {
    /**
     * Initialise the chatbot
     * @returns {void}
     */
    init: () => {
        const chatbotToggle = getElement.single('.chatbot-toggle');
        const chatbotContainer = getElement.single('.chatbot-container');
        const faqButtons = chatbotContainer?.querySelectorAll('.faq-btn');
        const messagesContainer = chatbotContainer?.querySelector('.chatbot-messages');
        const closeChatbotBtn = chatbotContainer.querySelector('.chatbot-close-btn');

        if (
            !chatbotToggle ||
            !chatbotContainer ||
            !faqButtons.length ||
            !messagesContainer
        ) return;

        chatbot.initToggle(chatbotToggle, chatbotContainer);
        chatbot.initFaqButtons(faqButtons, messagesContainer);
        chatbot.closeChat(closeChatbotBtn, chatbotContainer)
    },

    /**
     * Chatbot predefined responses
     */
    responses: {
        services:
            'We offer web development, website maintenance, UI/UX design, and digital solutions for businesses.',
        consultation:
            'We offer an initial consultation to discuss your project requirements and recommend the best solution for your business.',
        contact:
            'You can contact us through the Contact section of the website.',
        quote:
            'Please complete the contact form and we will provide a customised quote.',
        contact:
        'You can contact us through the Contact section of the website and we will respond as soon as possible.',
        hours:
            'Our business hours are Monday to Friday, 9:00 AM to 5:00 PM.',
        responsive:
            'All of our websites are designed to work across desktop, tablet and mobile devices.',
        maintenance:
            'We provide ongoing website maintenance services including updates, content changes, performance improvements, and technical support.',
        seo:
            'We implement SEO best practices to help improve website visibility and search engine rankings.',
        timeline:
            'Project timelines vary depending on complexity and requirements. A detailed timeframe is provided during the quotation process.',
        support:
            'We provide support and guidance throughout the project lifecycle and after website deployment when required.',
        technologies:
            'Our projects are developed using modern web technologies including HTML5, CSS3, JavaScript, and responsive design frameworks.',
        upgrades:
            'Yes, we can review and improve existing websites by updating content, enhancing performance, improving accessibility, and modernising design.',
    },
    /**
     * Toggle chatbot visibility
     * @param {HTMLElement} chatbotToggle - The html element
     * @param {HTMLElement} chatbotContainer - The html element
     * @returns {void}
     */
    initToggle: (chatbotToggle, chatbotContainer) => {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });
    },
    /**
     * Initialise FAQ button events
     * @param {NodeListOf<HTMLElement>} faqButtons - The node list of elements
     * @param {HTMLElement} messagesContainer - The html element
     * @returns {void}
     */
    initFaqButtons: (faqButtons, messagesContainer) => {
        faqButtons.forEach((button) => {
            button.addEventListener('click', () => {
                chatbot.addMessage(button, messagesContainer);
            });
        });
    },
    /**
     * Add user and bot messages
     * @param {HTMLElement} button - The html element
     * @param {HTMLElement} messagesContainer - The html element
     * @returns {void}
     */
    addMessage: (button, messagesContainer) => {
        const question = button.textContent.trim();
        const answer = chatbot.responses[button.dataset.answer];

        if (!answer) return;

        messagesContainer.insertAdjacentHTML(
            'beforeend',
            `
            <div class="user-message">
                ${question}
            </div>

            <div class="answer-message">
                ${answer}
            </div>
            `
        );

        chatbot.scrollToBottom(messagesContainer);
    },
    closeChat: (closeBtn, chatbotContainer) => {
        closeBtn.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    },
    /**
     * Scroll messages container to latest message
     * @param {HTMLElement} messagesContainer - The html element
     * @returns {void}
     */
    scrollToBottom: (messagesContainer) => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

export { chatbot };
