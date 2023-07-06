/* ----------------Календарь III - атака клонов---------------
поехали!

A - настраиваем селекты
    1 - формируем массивы селектов
    2 - получаем переменные селектов
    3 - создаем функцию добавления оптионов в селекты

B - отключаем кнопку
    1 - ищем кнопку
    2 - функция проверки селектов , запускаем
        (вначале селекты не выбраны  -> отключаем кнопку)
    3 - обработчики селектов(при изменения состояния включаем кнопку)

D - создаем календарь
    1 - создаем таблицу
    2 - создаем блок управления /создаем кнопки и блок с выводом / помещаем все в блок управления
    

E - запускаем
    1 - создаем блок обертку и помещаем таблицу и блок управления в него
    2 - кнопка создать календарь
    3 - обработчики кнопок таблиц
 */
//-----------------------------------A---------------------------------
//A1
const monthArr = [
    `Выбрать месяц`, 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const yearArr = [`Выбрать год`];

for (i = 1980; i < 2024; i++) {
    yearArr.push(i)
}

//A2
let selectMonth = document.getElementById('month');
let selectYear = document.getElementById('year');

//A3
function setElBySelect(array, selectElement) {
    array.forEach(function (e) {
        let opt = document.createElement('option');
        opt.textContent = e;
        selectElement.append(opt);
    });
}

setElBySelect(monthArr, selectMonth);
setElBySelect(yearArr, selectYear);

//-----------------------------------B------------------------------------
//B1
const btn1 = document.querySelector('.btn-create');

//B2
function offButton() {
    if (selectMonth.selectedIndex && selectYear.selectedIndex) { //под -1 не настроено
        btn1.disabled = false; //если год и месяц выбраны влючаем кнопку
    } else {
        btn1.disabled = true; //иначе выключаем кнопку
    }
}
offButton();
//B3
const selects = document.querySelectorAll('select');
selects.forEach(function (e) {
    e.addEventListener('change', offButton);
});


//-------------------------------------D------------------------------------------
//D1
function createTable(year, month) {
    //принимаем дату
    let d = new Date(year, month);

    function getDay(date) { // день недели 0 (воскресенье) в европейской нумерации будет 7
        let day = date.getDay()
        if (day == 0) day = 7;
        return day - 1;
    }

    //---------------формируем таблицу из дней это первая срока---------------
    let table = ` 
        <table class="calendar-table">
            <tr>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
                <th>Вс</th>
            </tr>
            <tr>
            `;

    // пробелы для второй строки таблицы с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == month) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }
    // -----------------закрыть таблицу----------------------
    table += '</tr></table > ';
    return table;
}

//D2
function createBlockControl(year, month) {
    let blockControl = document.createElement('div');
    blockControl.classList.add('calendar-control');
    //создает кнопку с вашим текстом и классом calendar-btn
    function createBtn(text, btnClass) {
        let btn = document.createElement('button');
        btn.classList.add('calendar-btn');
        btn.classList.add(btnClass);
        btn.textContent = text;
        return btn;
    }
    //кнопки слева
    blockControl.append(createBtn('<<', 'left-year'));
    blockControl.append(createBtn('<', 'left-month'));

    //добавляем 2 блока вывода месяца и года
    function createOutputDate(classOutput, textCont) {
        let inputDiv = document.createElement('div');
        inputDiv.className = classOutput;
        inputDiv.textContent = textCont;
        return inputDiv;
    }

    let outputMonth = createOutputDate('calendar-out-month', monthArr[month + 1]);
    let outputYear = createOutputDate('calendar-out-year', year);

    blockControl.append(outputMonth);
    blockControl.append(outputYear);

    //кнопки справа
    blockControl.append(createBtn('>', 'right-month'));
    blockControl.append(createBtn('>>', 'right-year'));
    return blockControl;
}

//---------------------------E---------------------------------------------------------------------

//E1
function createCalendar() {
    //получаем с селектов значения и парсим их в цифры
    let monthNumber = monthArr.indexOf(selectMonth.value) - 1; // индекс месяца number (-1 для массива)
    let yearNumber = +selectYear.value; //год number

    //обертка над таблицей
    let tableWrapper = document.createElement('div');
    tableWrapper.className = 'calendar-table-wrap';
    tableWrapper.innerHTML = createTable(yearNumber, monthNumber); //помещаем таблицу в обертку

    //создаем обертку для блока упр и таблицы
    let calendarWrapper = document.createElement('div');
    calendarWrapper.classList.add('calendar-wrapper');

    //добавляем таблицу и управление в обертку
    calendarWrapper.append(createBlockControl(yearNumber, monthNumber));
    calendarWrapper.append(tableWrapper);

    //добавляем обертку на страницу
    document.querySelector('.calendars').append(calendarWrapper);
    btnDel.disabled = false;
}

//E2 
btn1.addEventListener('click', createCalendar);

//E3
window.addEventListener('click', function (el) {
    //проверка что попали на кнопку
    if (el.target.classList.contains('calendar-btn')) {

        const parentEl = el.target.parentNode; //получаем родителя (блок управления)
        let wrapperMonth = parentEl.querySelector('.calendar-out-month'); //получаем блок месяца с текстом
        let wrapperYear = parentEl.querySelector('.calendar-out-year'); //получаем блок года с текстом
        let monthNumber = monthArr.indexOf(wrapperMonth.textContent); // цифра месяца (number) 
        let yearNumber = +wrapperYear.textContent; //достаем год (number)

        const classBtnControl = el.target.classList[1]; //переменная хранит 2рйо класс кнопок

        if (classBtnControl == 'left-year') { //год назад
            yearNumber--; //уменьшаем год
        }

        if (classBtnControl == 'right-year') { //год вперед
            yearNumber++; //увеличиваем год
        }

        if (classBtnControl == 'left-month') { //месяц назад
            monthNumber--;
            if (monthNumber < 1) {
                monthNumber = 12;
                yearNumber--;
            }
        }
        if (classBtnControl == 'right-month') { //месяц вперед
            monthNumber++;
            if (monthNumber > 12) {
                monthNumber = 1;
                yearNumber++;
            }
        }

        wrapperMonth.textContent = monthArr[monthNumber]; //устанавливаем месяц
        wrapperYear.textContent = yearNumber; //устанавливаем год

        const wrapperCal = parentEl.parentNode; //получаем обертку календаря с управлением
        const tableWrapperCal = wrapperCal.querySelector('.calendar-table-wrap'); //получаем обертку таблицы чтобы изменить
        tableWrapperCal.innerHTML = createTable(yearNumber, monthNumber - 1); //помещаем таблицу в обертку
    }
});

//E4
let btnDel = document.querySelector('.btn-delete');
btnDel.disabled = true;
btnDel.addEventListener('click', function () {
    let calendarWrapper = document.getElementsByClassName('calendar-wrapper');
    document.querySelector('.calendars').removeChild(calendarWrapper[0]);
    if (calendarWrapper.length == 0) {
        btnDel.disabled = true; //выкл кнопку
    }
});

//вешаем ховер еффект
window.addEventListener('mouseover', function (el) {
    if (el.target.tagName == 'TD' && el.target.textContent != "" && el.target.textContent != null) {
        el.target.classList.add('back-hover');
    }
});

window.addEventListener('click', function (el) {
    if (el.target.tagName == 'TD' && el.target.textContent != "" && el.target.textContent != null) {
        //получаем tbody
        let tbody = el.target.parentNode.parentNode; 

        //сбрасываем ячейкам цвет в таблице
        tbody.querySelectorAll('td').forEach(function(el){
            el.style.backgroundColor = '#fff'; 
        });
        el.target.style.backgroundColor = 'red';
    }
});






















