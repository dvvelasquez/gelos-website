import { getElement } from "../helper/helper.js";

const form = {
    /**
     * Init the form validation
     * @returns {void}
     */
    init: () => {
        const formEl = getElement.single('.contact-form');
        const inputsEl = formEl?.querySelectorAll('input');

        if (!formEl || !inputsEl.length) return;

        form.validateForm(formEl, inputsEl);
    },
    /**
     * Clears all the error input or form messages
     * @param {HTMLElement} errorEl - The target html element
     * @param {HTMLElement} parentInputEl - The parent html element
     * @returns {void}
     */
    clearErrors: (errorEl, parentInputEl) => {
        errorEl.textContent = '';
        errorEl.classList.remove('is-invalid');
        parentInputEl.classList.remove('is-invalid');
    },
    /**
     * Display the input error messages
     * @param {HTMLElement} errorEl - The target html element
     * @param {HTMLElement} parentInputEl - The parent html element
     * @param {string} message - The error message text to display
     * @returns {void}
     */
    showInputErrorMsg: (errorEl, parentInputEl, message) => {
        errorEl.textContent = message;
        errorEl.classList.add('is-invalid');
        parentInputEl.classList.add('is-invalid');
    },
    /**
     * Checks if the input is valid othwerwise show error message
     * @param {NodeList<HTMLInputElement>} inputsEl - The list of the form inputs
     * @returns {void}
     */
    validateFields: (inputsEl) => {
        if (!inputsEl.length) return;

        inputsEl?.forEach(input => {
            input.addEventListener('input', (e) => {
                if (!e.target) return;

                const currentInputEl = e.target;
                const parentInputEl = currentInputEl.closest('.form-field');
                const errorId = currentInputEl.getAttribute('aria-describedby');
                const errorEl = document.getElementById(errorId);

                const errorMsg = currentInputEl.dataset.errorMessage;
                const emptyErrorMsg = currentInputEl.dataset.missingError;

                if (currentInputEl.value.trim() === '') {
                    form.showInputErrorMsg(errorEl, parentInputEl, emptyErrorMsg);
                    return;
                }

                if (!currentInputEl.checkValidity()) {
                    form.showInputErrorMsg(errorEl, parentInputEl, errorMsg);
                    return;
                }

                form.clearErrors(errorEl, parentInputEl);
            })
        })
    },
    /**
     * Display the form error message
     * @param {HTMLElement} errorEl - The target html element
     * @param {HTMLElement} parentInputEl - The parent html element
     * @param {string} message - The error message text to display
     * @returns {void}
     */
    showFormErrorMsg: (errorMsgEl, parentEl, message) => {
        errorMsgEl.classList.add('is-invalid');
        errorMsgEl.innerHTML = `<p class="feedback">${message}</p>`;
        parentEl.classList.add('is-invalid');
    },
    /**
     * Resets all the iput values after user submits a valid form
     * @param {HTMLElement} formEl - The form html elemtn
     * @param {NodeList<HTMLInputElement>} inputsEl - The list of the form inputs
    * @returns {void}
     */
    resetAllInputs: (formEl, inputsEl) => {
        inputsEl.forEach(input => {
            input.value = '';
        });

        const textArea = formEl.querySelector('textarea');
        textArea.value = '';
    },
    /**
     * Checks if the form is valid othwerwise show error message
     * @param {HTMLElement} formEl - The form html elemtn
     * @param {NodeList<HTMLInputElement>} inputsEl - The list of the form inputs
     * @returns {void}
     */
    validateForm: (formEl, inputsEl) => {
        if (!formEl || !inputsEl) return;

        form.validateFields(inputsEl);

        formEl?.addEventListener('submit', (e) => {
            const isValid = formEl.checkValidity();
            const errorId = formEl.getAttribute('aria-describedby');
            const errorMsgEl = document.getElementById(errorId);

            const errorFormMsg = formEl.dataset.formError;
            e.preventDefault();
            if (!isValid) {
                form.showFormErrorMsg(errorMsgEl, formEl, errorFormMsg);
                return;
            }

            form.resetAllInputs(formEl, inputsEl);
            console.log('Thank you! Your message has been successfully submitted.');
            form.clearErrors(errorMsgEl, formEl);
        });
    }
}

export { form }
