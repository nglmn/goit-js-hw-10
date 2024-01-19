import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

import { iziTimerError } from "./iziToastCustom";

let daysTimer = document.querySelector('span[data-days]');
let hoursTimer = document.querySelector('span[data-hours]');
let minutesTimer = document.querySelector('span[data-minutes]');
let secondsTimer = document.querySelector('span[data-seconds]');

const startBtn = document.querySelector('button[data-start]');
toggleStartButtonDisabledState(true);

let userSelectedDate = null;
const oneSecond = 1000;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        const currentDate = new Date();
        if (userSelectedDate.getTime() < currentDate) {
            iziToast.error(iziTimerError);
        } else {
            toggleStartButtonDisabledState(false);
            startBtn.addEventListener('click', handleStartTimer);
        }
    },
};

const handleStartTimer = () => {
    toggleStartButtonDisabledState(true);
    let leftTime = userSelectedDate.getTime() - Date.now();

    const intervalID = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(leftTime);

        daysTimer.textContent = checkByZero(days);
        hoursTimer.textContent = checkByZero(hours);
        minutesTimer.textContent = checkByZero(minutes);
        secondsTimer.textContent = checkByZero(seconds);

        if (leftTime > oneSecond) {
            leftTime -= oneSecond;
        } else {
            clearInterval(intervalID);
        }
    }, oneSecond);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = oneSecond;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function checkByZero(number) {
    return number >= 10 ? number : `0${number}`
}
function toggleStartButtonDisabledState(res) {
    return res ? startBtn.setAttribute('disabled', '') : startBtn.removeAttribute('disabled');
}

flatpickr('#datetime-picker', options);

