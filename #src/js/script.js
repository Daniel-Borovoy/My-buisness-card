
// Navbar *********************************************
window.onscroll = function() {fixateNavbar()};
let navbar = document.getElementById("nav");
let section2 = document.getElementById("section_2");
let section1 = document.getElementById("section_1");
navbar.addEventListener("scroll", fixateNavbar);
function fixateNavbar(){
  let offset = section1.getBoundingClientRect().height;
  if ((window.pageYOffset || document.documentElement.scrollTop) >= offset) {
    navbar.classList.add("fixed");
    section2.style.paddingTop = navbar.offsetHeight + "px";
  }
  else{
    navbar.classList.remove("fixed");
    section2.style.paddingTop = 0;
  }
}
// *****************************************************

let counter = document.querySelectorAll('.counter');
let limit = 0; // Переменная, чтобы останавливать функцию, когда всё запустится.
window.addEventListener('scroll', function(){  
  if( limit == counter.length ){ return; } 
  for(let i = 0; i < counter.length; i++){
    let pos = counter[i].getBoundingClientRect().top; //Позиция блока, считая сверху окна
    let win = window.innerHeight - 40; // На 40 пикселей меньше, чем высота окна
    if( pos < win && counter[i].dataset.stop === "0" ){
      counter[i].dataset.stop = 1; // Останавливаем перезапуск счета в этом блоке
      let x = 0;
      limit++; // Счетчик будет запущен, увеличиваем переменную на 1
      let int = setInterval(function(){
        // Раз в 60 миллисекунд будет прибавляться 50-я часть нужного числа
        x = x + Math.ceil( counter[i].dataset.to / 50 ); 
        counter[i].innerText = x + "%";
        if( x > counter[i].dataset.to ){
          //Как только досчитали - стираем интервал.
          counter[i].innerText = counter[i].dataset.to + "%";
          clearInterval(int);
        }
      }, 60);
    }
  }
});
// POPUPS **************************************************
const popupLinks = document.querySelectorAll(".popup_link");
const popups = document.querySelectorAll(".popup");
const cancels = document.querySelectorAll(".cancel");
if (popupLinks){
  for (let i = 0; i < popupLinks.length; i++) {
    popupLinks[i].addEventListener("click", function (e) {
      e.preventDefault();
      const currentPopup = popups[i];
      document.body.classList.add("body__lock");
      currentPopup.classList.toggle("popup__open");
    });
  } 
}
for (let i = 0; i < popupLinks.length; i++){
  popups[i].addEventListener("click", function (e) {
        if (!e.target.closest('.popup__body')) {
          document.body.classList.remove("body__lock");
          popups[i].classList.toggle("popup__open");
        }
      });
  cancels[i].addEventListener("click", function (e) {
      document.body.classList.remove("body__lock");
      popups[i].classList.remove("popup__open");
  });
  }

// POPUPS END **************************************************
const menu_Links = document.querySelectorAll(".menu_link[data-goto]");
if (menu_Links.length){
  menu_Links.forEach(menu_link => {
    menu_link.addEventListener("click", onMenuLinkClick)
  });

  function onMenuLinkClick(e){
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.getElementById("nav").offsetHeight;``
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    } 
  }
}
// GALLERY *********************************
let buttonNext = document.querySelector(".next");
let buttonBack = document.querySelector(".back");
let gallery = document.querySelector(".gallery");
let images = document.querySelectorAll(".gallery img");
let valueX = 0;
let imgNumber = 1;
buttonNext.addEventListener("click", function (e) {
  if (imgNumber < images.length){
    imgNumber++;
    valueX -= 400;
    gallery.style.transform = `translateX(${valueX}px)`;
  }
})
buttonBack.addEventListener("click", function (e) {
  if (imgNumber !== 1){
    imgNumber--;
    valueX += 400;
    gallery.style.transform = `translateX(${valueX}px)`;
  }
})
// GALLERY END *********************************


