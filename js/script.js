window.addEventListener('DOMContentLoaded', function () {
    
    'use strict';

    //элементы меню и контент
    let infoHeader = document.querySelector('.menu');
    let tabs = document.querySelectorAll('.menu__tab');
    let contents = document.querySelectorAll('.content__item');

    //классы элементам меню (НЕОБЯЗАТЕЛЬНЫЕ нужны для изменения нажатой кнопки)
    const showClassTab = 'show-tab';
    const hideClassTab = 'hide-tab';

    //константы классов для контента
    const showClassContent = 'show';
    const hideClassContent = 'hide';


    //функция удаляет класс show ставит всем пунктам класс скрытия hide
    function hideClass(arrElements, showClass, hideClass) {
        for (let i = 0; i < contents.length; i++) {
            arrElements[i].classList.remove(showClass);
            arrElements[i].classList.add(hideClass);
        }
    }

    //ф. устанавливает showClass по индексу
    function showClass(index, arrElements, showClass, hideClass) {
        if (arrElements[index].classList.contains(hideClass)) {
            arrElements[index].classList.remove(hideClass);
            arrElements[index].classList.add(showClass);
        }
    }

    //ф. сначала скрывает все содержимое по hide , потом показыает элементы с классом show по индексу
    function hideAndShow(index) {
        hideClass(tabs, showClassTab, hideClassTab); //рисуем нижний бордер для всех элементов (НЕОБЯЗАТЕЛЬНЫЙ)
        hideClass(contents, showClassContent, hideClassContent); // скрываем все menu_tab

        showClass(index, tabs, showClassTab, hideClassTab); //показываем нижний бордер (НЕОБЯЗАТЕЛЬНЫЙ)
        showClass(index, contents, showClassContent, hideClassContent); //показываем контент
    }

    hideAndShow(0); //показываем 1й элемент при загрузке страницы

    infoHeader.addEventListener('click', function (event) {
        //получаем в переменную нажатый элемент
        let target = event.target;
        //если кликнут элемент меню с классом
        if (target && target.classList.contains('menu__tab')) {
            for (let i = 0; i < tabs.length; i++) {
                //ищем совпадения таргета и элемента в массиве и получаем индекс
                if (target == tabs[i]) {
                    hideAndShow(i); //показываем элементы по индексу
                    break;
                }
            }
        }
    });

});
