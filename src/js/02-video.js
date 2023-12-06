import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const savedTimeKey = 'videoplayer-current-time';

//створюю функцію:час відтворення поточний в сек і зберігаю цей час під ключем
//виношу окремо змінну для відтворення поточного часу(бо юзаю для фіксації часу)
let currentTime;
const onPlay = function (data) {
    currentTime = data.seconds;
    localStorage.setItem(savedTimeKey, currentTime);
};
    
const player = new Player(iframe);
player.on('timeupdate', throttle(onPlay, 1000));

//запитую у локального сховаща чи є час зупинки збережений, фіквую при умові його наявності
const savedTime = localStorage.getItem(savedTimeKey);
if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
}


