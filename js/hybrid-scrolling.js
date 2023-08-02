
const stickySections = [...document.querySelectorAll('.sticky')]
var body = document.getElementsByTagName('body')[0];
var percentage = 0;
let images = [
    '/images/gallery_img_1.png',
    '/images/gallery_img_2.png',
    '/images/gallery_img_3.png',
    '/images/gallery_img_4.png',
]

images.forEach(img => {
    stickySections.forEach(section => {
        let image = document.createElement('img');
        image.src = img;
        image.classList.add('gallery-img');
        image.alt = "nissan GT-R35 image"
        section.querySelector('.scroll_section').appendChild(image);
    })
})

window.addEventListener('scroll', (e) => {
    for(let i = 0; i < stickySections.length; i++){
        transform(stickySections[i]);
    }
})

function transform(section){
    const scrollSection = section.querySelector('.scroll_section');
    const offsetTop = section.parentElement.offsetTop;
    percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 50 ? 50 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}

const cursor = document.getElementById('cursor');
var gallery = document.getElementsByClassName('gallery-img');
var lightbox = document.getElementById('lightbox');

setTimeout(() => {body.style.overflowY = "auto"; cursor.style.display = "block";}, 3500);

const updateCursorPosition = (event) => {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}
window.addEventListener('mousemove', (event) => {
    updateCursorPosition(event);
    if (gallery[0].matches(':hover') || gallery[1].matches(':hover') || gallery[2].matches(':hover') || gallery[3].matches(':hover') || lightbox.matches(':hover')) {
        if(percentage != 0 && percentage < 50){
            cursor.classList.add('zoom');
        }
    } 
    else {
        cursor.classList.remove('zoom');
    }
})
var _target;
    window.onclick = e => {
        if(percentage != 0 && percentage < 50){
            var target = e.target;
            var cursorTxt = cursor.firstChild;
            if(target.classList.contains('gallery-img')){
                _target = target;
                lightbox.style.display = "block";
                lightbox.src = target.src;
                lightbox.style.width = "400px";
                var bodyRect = document.body.getBoundingClientRect();
                var targetRect = target.getBoundingClientRect();
                var leftOffset = targetRect.left - bodyRect.left;
                var topOffset = (targetRect.top + (document.documentElement.scrollTop || document.body.scrollTo)) - window.pageYOffset;
                console.log("left offset: " + leftOffset);
                console.log("top offset: " + topOffset);
                lightbox.style.marginLeft = leftOffset + "px";
                lightbox.style.paddingTop = topOffset + "px";
                cursorTxt.innerHTML = "-";
                cursorTxt.style.top = "-5.7px";
                cursorTxt.style.left = "2.7px";
                target.style.opacity = "0";
                body.style.pointerEvents = "none";
                body.style.overflowY = "hidden";
                setTimeout(() => {lightbox.style.animationPlayState = "paused"; console.log("pause"); body.style.pointerEvents = "all";}, 500);
            }
            else if(target.id == "lightbox" && lightbox.style.animationPlayState == "paused"){
                cursorTxt.innerHTML = "+";
                cursorTxt.style.top = "-6px";
                cursorTxt.style.left = "1.8px";
                lightbox.style.animationPlayState = "running";
                body.style.pointerEvents = "none";
                setTimeout(() => {lightbox.style.display = "none"; body.style.overflowY = "auto"; _target.style.opacity = "1"; body.style.pointerEvents = "all";}, 500);
            }
        }
    }