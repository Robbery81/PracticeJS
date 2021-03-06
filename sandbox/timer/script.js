function timer() {
  
  function getTimeRemaining(endtime) {
      let t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (24 * 60 * 60 * 1000)),
          hours = Math.floor((t / (60 * 60 * 1000)) % 24),
          min = Math.floor((t / (60 * 1000)) % 60),
          sec = Math.floor((t / 1000) % 60);
      return {
          'total': t,
          days,
          hours,
          min,
          sec
      };
  }
  
  function setTimeRemaining(selector, endtime) {
      let timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          text = document.querySelector('#text');
          timeInterval = setInterval(updateClock, 1000);
  
      updateClock();
  
      function getZero(num) {
          return num >= 10 ? num : `0${num}`;
      }
  
      function updateClock() {
          const t = getTimeRemaining(endtime);
  
          if (t.total <= 0) {
              clearInterval(timeInterval);
              return;
          }

          switch(days.textContent) {
            case "21": text.innerText = 'Постараюсь скрасить твоє ожиданіє'; break;
            case "20": text.innerText = '20° коли в футболкі не ок, а в світрі жарко'; break;
            case "19": text.innerText = 'Лише 19, як тобі років в 2013'; break;
            case "18": text.innerText = 'Лише 18, як тобі років в 2012'; break;
            case "17": text.innerText = 'Не трогай руками бо посадять, хотя...'; break;
            case "16": text.innerText = 'То значить шо 2 в степені 4'; break;
            case "15": text.innerText = 'Три рази по пять і вона в тебе в руках'; break;
            case "14": text.innerText = 'Два тижні і ти гамаєш на плоєчкі'; break;
            case "13": text.innerText = "Чортова дюжина хоче з тобой випить!"; break;
            case "12": text.innerText = "Апостолів і тринадцятий Іван"; break;
            case "11": text.innerText = "Диви, заборчик :р"; break;
            case "10": text.innerText = "А в двійковій системі це скільки? Липка с*ка так і не прочитав!"; break;
            case "09": text.innerText = 'І от ти на фінішній прямій!'; break;
            case "08": text.innerText = 'Тут було шось про степень двойки, але ну нафіг!'; break;
            case "07": text.innerText = 'Тиждень. Лише неділька осталась!'; break;
            case "06": text.innerText = 'Шестьорка, погана цифра, ждем нову'; break;
            case "05": text.innerText = 'Робочу недільку відпахать і ти в шляпі(і з усами)!'; break;
            case "04": text.innerText = 'Як пальців у хорошого слесаря'; break;
            case "03": text.innerText = 'Я ти і пиво'; break;
            case "02": text.innerText = 'Ну от і настав це день, трошки даже інтімний'; break;
            case "01": text.innerText = 'Відчуй її в себе в руках!'; break;
            case "0": text.innerText = 'АЛЯЯЯРМ! Іван, БІЖИ НА ПОШТУ!'; break;
            default: text.innerText = 'Привіт';
          }
  
          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.min);
          seconds.innerHTML = getZero(t.sec);
      }
  }
  
  setTimeRemaining('.timer', '2020-12-22T18:00:00');
  
}

timer();