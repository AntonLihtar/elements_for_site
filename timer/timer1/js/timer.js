
//------принимает дату, высчитывает остаток и возвращает часы/минуты/секунды------
function getTimeRemaining(endtime) {

    //вычитаем из конечной даты текущую и получаем милисекунды
    let t = Date.parse(endtime) - Date.parse(new Date());

    //млисекунды преобразуем в секунды (округлаем до целого)
    let seconds = Math.floor((t / 1000) % 60);
    //млисекунды преобразуем в минуты
    let minutes = Math.floor((t / 1000 / 60) % 60);
    //млисекунды преобразуем в часы
    let hours = Math.floor(t / 1000 / 60 / 60);
    //дни
    /* let days = Math.floor((t / 1000 / 60 / 60) % 24) ; */


    //возвращаем обьект с данными
    return { 
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}


//------принимаем ид селектора и дату (датуТвремя)------
function setClock(id, endtime) {

    //вытаскиваем блоки для утсановки туда данных
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');
    
    //вызываем ф updateClock каждую секунду для обновления данных ан странице
    timeInterval = setInterval(updateClock, 1000);


    //------локальная ф. использует дату и парсит через ф getTimeRemaining------ 
    function updateClock() {
        let t = getTimeRemaining(endtime);

        //исользуем атрибуты полученого обьекта для вывода ан сайт
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;

        //когда время выйдет удаляем ф timeInterval(остановим таймер)
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

//устанавливаем будущее время когда будет дедлайн
let deadline = '2023-06-26T14:00:00';

//вызываем
setClock('timer', deadline);
