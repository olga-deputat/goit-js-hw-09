import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataTimePicker = document.querySelector('[date-time-picker]');
const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

let intervalId = null;
let targetDay = null;

dataStart.setAttribute("disabled", '');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        const selectedDate = selectedDates[0] - currentDate;
        if (selectedDate <= 0) {
            dataStart.setAttribute("disabled", '');
            Notify.failure('Будь ласка, оберіть дату з майбутнього');
            return;
        } else {
            dataStart.removeAttribute("disabled", '');
            targetDay = selectedDates[0];
        }
    },
};  
flatpickr(dataTimePicker, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

dataStart.addEventListener('click', StartTimerClick);

function StartTimerClick() {
    intervalId = setInterval(() => {
        const selectedDate = targetDay - new Date();
        if (selectedDate <= 0) {
            clearInterval(intervalId);
            return;
        }
        const date = convertMs(selectedDate);
        updateTextContent(date);
    }, 1000);
}


function updateTextContent(date) {
    Object.entries(date).forEach(([, value], index) => {
        timer.children[index].firstElementChild.textContent = addLeadingZero(value);
    });
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

