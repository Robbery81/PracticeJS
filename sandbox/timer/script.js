const deadline = "2020-06-09T10:29:35";


function calcTimerEnd(deadline) {
    let t = new Date(deadline).getTime() - Date.now();

    let days = Math.floor(t / (24 * 60 * 60 * 1000)),
        hours = Math.floor((t / (60 * 60 * 1000)) % 24),
        minutes = Math.floor((t / (60 * 1000)) % 60),
        seconds = Math.floor((t / 1000) % 60);
    return {
        total: t,
        days,
        hours,
        minutes,
        seconds
    };

}

function showTimer(timerSelector, endtime) {

    let timer = document.querySelector(timerSelector);
    let $day = timer.querySelector('.days'),
        $hours = timer.querySelector('.hours'),
        $minutes = timer.querySelector('.minutes'),
        $seconds = timer.querySelector('.seconds');

    let deadlineTime = calcTimerEnd(endtime);

    if (deadlineTime.total <= 0) {
        clearInterval(showControl);
        return;
    }

    $day.textContent = deadlineTime.days;
    $hours.textContent = deadlineTime.hours;
    $minutes.textContent = deadlineTime.minutes;
    $seconds.textContent = deadlineTime.seconds;
}

let showControl = setInterval(showTimer, 1000, '.timerOne', deadline);

showTimer('.timerOne', deadline);