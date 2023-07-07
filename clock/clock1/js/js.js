let circle = document.querySelector('.clock-circle');


//-------------------создаем табло часов с цифрами---------------
let counter = 30;
for (let i = 1; i < 13; i++) {
    let li = document.createElement('li');
    li.classList.add('clock-circle__item');
    li.style.transform = `rotate(${counter}deg)`;


    let circleLi = document.createElement('div');
    circleLi.classList.add('clock-circle__circle');
    circleLi.textContent = i;
    circleLi.style.transform = `rotate(-${counter}deg)`;
    li.append(circleLi);

    circle.append(li);

    counter += 30;
}

//создаем стрелки
let centerCircle = document.createElement('div');
let secondsArrow = document.createElement('div');
let minutesArrow = document.createElement('div');
let hoursArrow = document.createElement('div');

centerCircle.classList.add('center');
secondsArrow.classList.add('arrow', 'seconds');
minutesArrow.classList.add('arrow', 'minutes');
hoursArrow.classList.add('arrow', 'hours');

circle.append(centerCircle, secondsArrow, minutesArrow, hoursArrow);


function updateclock(){
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();


    let hourRotation = (hour * 30) + (minute / 2); // 360 degrees / 12 hours = 30 degrees per hour
    let minuteRotation = (minute * 6) + (second / 10); // 360 degrees / 60 minutes = 6 degrees per minute
    let secondRotation = second * 6; // 360 degrees / 60 seconds = 6 degrees per second
  
    hoursArrow.style.transform = `translate(-50%) rotate(${hourRotation}deg)`;
    minutesArrow.style.transform = `translate(-50%) rotate(${minuteRotation}deg)`;
    secondsArrow.style.transform = `translate(-50%) rotate(${secondRotation}deg)`;

}

setInterval(updateclock, 1000); // Обновление каждую секунду


