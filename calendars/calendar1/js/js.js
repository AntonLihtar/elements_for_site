
function createCalendar(year, month) {
    

    let monthRight = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //принимаем дату
    let d = new Date(year, monthRight);

    let table = `
    <table>
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

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == monthRight) {
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

    // закрыть таблицу
    table += '</tr></table > ';
    document.getElementById('calendar').innerHTML = table;

    let monthYear = document.querySelector('p');
    monthYear.innerHTML = `${year} - ${monthName[monthRight]}`;
}

function getDay(date) {
    let day = date.getDay()
    if (day == 0) day = 7;           // день недели 0 (воскресенье) в европейской нумерации будет 7
    return day - 1;
}

let year = prompt('Введите год');
while (true) {
    if (isNaN(year) || (year < 1970) || (year > 2100)) {
        year = prompt('Введите год корректно');
    }
    else {
        break;
    }
}

let month = prompt('Введите месяц');
while (true) {
    if (isNaN(month) || (month <= 0) || month > 12) {
        month = prompt('Введите месяц корректно');
    }
    else {
        break;
    }
}

createCalendar(year, month);

document.getElementById('yearPrev').onclick = function () {
    year--;
    createCalendar(year, month);
};

document.getElementById('yearNext').onclick = function () {
    year++;
    createCalendar(year, month);
};

document.getElementById('monthPrev').onclick = function () {
    month--;
    if (month < 1) {
        month = 12;
        year--;
    }
    createCalendar(year, month);
};

document.getElementById('monthNext').onclick = function () {
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    createCalendar(year, month);
};

