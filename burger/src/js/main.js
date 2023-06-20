'use strict';

let burgerMenu = document.querySelector('.header-burger');
let headerMenu = document.querySelector('.header-menu');

burgerMenu.addEventListener('click', function () {
    burgerMenu.classList.toggle('active'); //меняем бургер на крест
    headerMenu.classList.toggle('active'); //меняем меню с горизонтального в вертикальный список
});
