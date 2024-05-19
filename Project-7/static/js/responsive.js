// For Open Hamburger Menu
let open = document.getElementsByClassName('phn-ico')[1];
open.addEventListener('click', ()=>{
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    
    // toogle checks if the class is already present on the element. If it is, the method removes the class; if not, it adds the class.
    left.style.transform = 'translateX(-0%)';
    right.style = 'pointer-events: none;';
    right.classList.toggle('clicked');
})

// For Close Hamburger Menu
let close = document.getElementsByClassName('phn-ico')[0];
close.addEventListener('click', ()=>{
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    
    // toogle checks if the class is already present on the element. If it is, the method removes the class; if not, it adds the class.
    left.style.transform = 'translateX(-200%)';
    right.style = 'pointer-events: unset;';
    right.classList.toggle('clicked');
})



