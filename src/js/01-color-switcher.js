function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let colorInterval;

//роблю функцію: задаю кнопки, активність кнопок, інтервал 1сек
function startColor() {
  startButton.disabled = true;
  stopButton.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
startButton.addEventListener('click', startColor);
//функція для зупинки кольору:кнопки, актиіність кнопок навпаки, зупиняю інтервал
function stopColor() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(colorInterval);
}
stopButton.addEventListener('click', stopColor);
