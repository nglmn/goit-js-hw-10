import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

import { iziTimerError } from "./iziToastCustom";

let daysTimer = document.querySelector('span[data-days]');
let hoursTimer = document.querySelector('span[data-hours]');
let minutesTimer = document.querySelector('span[data-minutes]');
let secondsTimer = document.querySelector('span[data-seconds]');

const startBtn = document.querySelector('button[data-start]');


let userSelectedDate = 0;
const oneSecond = 1000;
let leftTime = 0;

toggleStartButtonDisabledState(true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        if (checkTheValidDate(userSelectedDate)) {
            toggleStartButtonDisabledState(false);
        }
    },
};

flatpickr('#datetime-picker', options);

const checkTheValidDate = (userSelectedDate) => {
    const currentDate = new Date();
    if (userSelectedDate < currentDate.getTime()) {
        iziToast.error(iziTimerError);
        return false;
    } else {
        return true;
    }
}

startBtn.addEventListener('click', handleStartTimer);


function handleStartTimer() {
    startBtn.removeEventListener('click', handleStartTimer);
    toggleStartButtonDisabledState(true);
    leftTime = userSelectedDate - Date.now();

    const intervalID = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(leftTime);

        daysTimer.textContent = formatNumber(days);
        hoursTimer.textContent = formatNumber(hours);
        minutesTimer.textContent = formatNumber(minutes);
        secondsTimer.textContent = formatNumber(seconds);

        if (leftTime > oneSecond) {
            leftTime -= oneSecond;
        } else {
            clearInterval(intervalID);
            toggleStartButtonDisabledState(true);
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

function formatNumber(number) {
    return number >= 10 ? number : `0${number}`
}
function toggleStartButtonDisabledState(res) {
    return res ? startBtn.setAttribute('disabled', '') : startBtn.removeAttribute('disabled');
}



