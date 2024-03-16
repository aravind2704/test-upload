const carousel =document.querySelector(".carousel");
const wrapperd =document.querySelector(".wrapperd");
const arrowBtns =document.querySelectorAll(".wrapperd i");
const firstCardWidth= carousel.querySelector(".dcard").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging=false, isAutoPlay = true ,startX, startScrollLeft , timeoutId; 

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); 

carouselChildrens.slice(-cardPerView).reverse().forEach(dcard=>{
    carousel.insertAdjacentHTML("afterbegin", dcard.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(dcard=>{
    carousel.insertAdjacentHTML("beforeend", dcard.outerHTML);
});

arrowBtns.forEach(btns =>{
    btns.addEventListener("click", ()=> {
        carousel.scrollLeft += btns.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart=(e)=>{
    isDragging=true;
    carousel.classList.add("dragging");
    startX= e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging=(e)=>{
    if(!isDragging) return;
    carousel.scrollLeft= startScrollLeft - (e.pageX - startX);

}
const dragStop=()=>{
    isDragging=false;
    carousel.classList.remove("dragging");
}
const autoPlay=()=>{
    if(window.innerWidth<800) return;
    timeoutId = setTimeout(()=>carousel.scrollLeft += firstCardWidth,1500);
}
autoPlay();


const infinteScroll=()=>{
    if(carousel.scrollLeft===0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft)===carousel.scrollWidth-carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft=carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapperd.matches(":hover")) autoPlay();
}
carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infinteScroll);
wrapperd.addEventListener("mouseenter",()=>clearTimeout(timeoutId));
wrapperd.addEventListener("mouseleave",autoPlay);
// scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else{
            entry.target.classList.remove('show');
        }

    });
});
const hiddenElements = document.querySelectorAll('.hiddend');
hiddenElements.forEach((el)=> observer.observe(el));
// navbar
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("activel");
}

