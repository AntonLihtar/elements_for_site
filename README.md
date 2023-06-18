#  Табы на сайт
![Screenshot_2](https://github.com/AntonLihtar/tabs_for_site/assets/111772207/7802cb7c-adc0-4d43-b68c-331edf4a41b7)
нажимая на элементы меню (табы) скрывается/открывается контент и изменяется стиль нажатой кнопки меню

**классы для CSS**

    //классы элементам меню (НЕОБЯЗАТЕЛЬНЫЕ нужны для изменения нажатой кнопки)
    const showClassTab = 'show-b-border';
    const hideClassTab = 'hide-b-border';

    //константы классов для контента
    const showClassContent = 'show';
    const hideClassContent = 'hide';


### установка:
1. ***не меняя js файл***
- берем блок .contaier с меню и контентом полностью
- добавляем блоки с аналогичными классами или убираем лишние
- подправляем css

2. ***используя свои классы***

меняем в js на свои классы в круглых скобочках
    
    let infoHeader = document.querySelector('.menu');
    let tabs = document.querySelectorAll('.menu__tab');
    let contents = document.querySelectorAll('.content__item');

