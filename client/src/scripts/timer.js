export function startTimer(){
  const timer = document.getElementById('timer');
  const repeatBtn = document.querySelector('.repeat-button');
  let time = 300;
  let minutes, seconds;

  repeatBtn.disabled = true;

  let timerInterval = setInterval(function() {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if(timer){
      timer.textContent = minutes + ":" + seconds;
    }

    if (--time < 0) {
      clearInterval(timerInterval);
      window.localStorage.removeItem('code');
      timer.textContent = 'Время вышло. Запросите код восстановления еще раз';
      repeatBtn.disabled = false;
    }
  }, 1000);
}