const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);

            //Частные случаи дополнения к цвету ссылок:
            if (item.classList.contains('no_click')) {
                item.firstElementChild.style.color = '#000000';
                item.firstElementChild.style.borderBottom = '1px dotted #000000';
            }
            if (item.classList.contains('glazing_block')) {
                item.lastElementChild.style.color = '#337ab7';
            }
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
        
        //Частные случаи дополнения к цвету ссылок:
        if (tab[i].classList.contains('no_click')) {
            tab[i].firstElementChild.style.color = '#0089cd';
            tab[i].firstElementChild.style.borderBottom = '1px solid transparent';
        }
        if (tab[i].classList.contains('glazing_block')) {
            tab[i].lastElementChild.style.color = '#23527c';
        }
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
            tab.forEach((item, i) => {
                if (target === item || target.parentNode === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;