var i = 0;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show_sc');

            if(entry.target.classList.contains('stat')){
                console.log(entry.target.querySelector('.value'));
                entry.target.querySelector('.value').classList.add('anim');
            }
        }
        else{
            //entry.target.classList.remove('show_sc');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));