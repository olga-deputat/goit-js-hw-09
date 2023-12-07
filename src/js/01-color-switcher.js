function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let colorInterval;

//роблю функцію: задаю кнопки, активність кнопок, інтервал 1сек
function startColorSwitch() {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.disabled = true;
  stopButton.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

//функція для зупинки кольору:кнопки, актиіність кнопок навпаки, зупиняю інтервал
function stopColorSwitch() {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(colorInterval);
}