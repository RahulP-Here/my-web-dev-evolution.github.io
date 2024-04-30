let text = document.getElementById('text');
let light = document.getElementById('light');
document.addEventListener('mousemove', function (event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  // let mouseX = event.clientX - 130;
  // let mouseY = event.clientY - 180;
  light.style.left = mouseX + 'px';
  light.style.top = mouseY + 'px';


  let distanceX = mouseX - text.offsetLeft - text.offsetWidth / 2;
  let distanceY = mouseY - text.offsetTop - text.offsetHeight / 2;

  let newShadow = '';
  for (var i = 0; i < 200; i++) {
    let shadowX = -distanceX * (i / 200);
    let shadowY = -distanceY * (i / 200);
    let opacity = 0.2 - (i / 200);


    // newShadow += (newShadow ? ',' : '') + `${shadowX}px ${shadowY}px 0px rgba(5, 10, 68, ${opacity})`;
    newShadow += (newShadow ? ',' : '') + `${shadowX}px ${shadowY}px 0 rgba(33, 33, 33, ${opacity})`;
    // console.log(newShadow);

    text.style.textShadow = newShadow;
  }
})

function onLoadShadow(light, text) {

  light.style.left = 20 + 'px';
  light.style.top = 20 + 'px';

  let distanceX = 20 - text.offsetLeft - text.offsetWidth / 2;
  let distanceY = 20 - text.offsetTop - text.offsetHeight / 2;

  let newShadow = '';
  for (var i = 0; i < 200; i++) {
    let shadowX = -distanceX * (i / 200);
    let shadowY = -distanceY * (i / 200);
    let opacity = 0.2 - (i / 200);

    newShadow += (newShadow ? ',' : '') + `${shadowX}px ${shadowY}px 0 rgba(33, 33, 33, ${opacity})`;
    text.style.textShadow = newShadow;
  }
}

onLoadShadow(light, text);

