import calcScroll from "./calcScroll";

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        let isFilled = true;

        //Добавление проверок на валидацию:
        function validateInputs (selector, previousSelector, event) {
            if (modalSelector === selector) {
                let previousModal = document.querySelector(previousSelector);
                let formInputs = previousModal.querySelectorAll('input');
                isFilled = false;
                formInputs.forEach(item => {
                    item.addEventListener(event, () => {
                        if (formInputs[0].value && formInputs[1].value) {
                            isFilled = true;
                        }
                    });
                });
            }
        }

        validateInputs('.popup_calc_profile', '.popup_calc','input');
        validateInputs('.popup_calc_end', '.popup_calc_profile','change');


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                //Для закрытия всех ненужных модальных окон:
                if (isFilled) {
                    windows.forEach(item => {
                        item.style.display = 'none';
                    });

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                } else {
                    alert('Пожалуйста, введите/отметьте все данные');
                }

                // document.body.classList.add('modal-open');
            });
        });


        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = 'initial';
            document.body.style.marginRight = `0`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = 'initial';
                document.body.style.marginRight = `0`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'initial';
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('a.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

    showModalByTime('.main_modal', 60000);
};

export default modals;