import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const storageKey = 'feedback-form-state';
//зберігаю у локальне сховище дані форми через функцію
const saveStateToLocalStorage = throttle(() =>
{const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
    localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

// завантажую стан форми з локального сховища через функцію, якщо є ключ збережений
const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    emailInput.value = parsedState.email || '';
    messageTextarea.value = parsedState.message || '';
  }
};

//викликаю цю функцію
document.addEventListener('DOMContentLoaded', loadStateFromLocalStorage);

//слухач на імпут в тексті форми
form.addEventListener('input', () => {
  saveStateToLocalStorage();
});

//слухач на submit на формі
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log({email: emailInput.value,
                 message: messageTextarea.value,
    });
      localStorage.removeItem(storageKey);
    emailInput.value = '';
    messageTextarea.value = '';
});

