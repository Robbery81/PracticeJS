function timer(id, deadline) {
//Timer

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

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.min);
        seconds.innerHTML = getZero(t.sec);


    }
}

setTimeRemaining(id, deadline);

}

export default timer;