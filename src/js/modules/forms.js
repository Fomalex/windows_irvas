import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    //чтобы в инпутах с номером вводились только цифры:
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо, скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                });
        });
    });
};

export default forms;