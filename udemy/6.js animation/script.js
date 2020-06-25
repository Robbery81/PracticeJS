const btn = document.querySelector('.btn'),
      elem = document.querySelector('#field > img');  
let pos = 0;

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  }

  function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
  }

  function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      }
    }
  }

  let bounceEaseOut = makeEaseOut(bounce);
  let cirtEseOut = makeEaseOut(quad);

  btn.onclick = function() {
    animate({
      duration: 3000,
      timing: bounceEaseOut,
      draw: function(progress) {
        elem.style.top = progress * 300 + 'px';
      }
    });
    animate({
        duration: 3000,
        timing: cirtEseOut,
        draw: function(progress) {
          elem.style.left = progress * 300 + 'px';
        }
      });
  };

  function animate({duration, draw, timing}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {timeFraction = 1;}
  
      let progress = timing(timeFraction);
  
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }