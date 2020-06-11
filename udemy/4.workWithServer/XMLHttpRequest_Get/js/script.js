let rub = document.querySelector('#rub'),
    dollar = document.querySelector('#usd');

rub.addEventListener("input", () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.send(); //[body] of request


    request.addEventListener("load", () => {
        let usdValue = JSON.parse(request.response).current.usd;
        dollar.value = (rub.value / usdValue).toFixed(2);
    });
});