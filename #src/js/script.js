
// Navbar fixed
window.onscroll = function() {fixedNavbar()};
let navbar = document.getElementById("nav");
let offset = navbar.offsetTop;
let indent = document.getElementById("section_2");
function fixedNavbar() {
  if (window.pageYOffset >= offset) {
    navbar.classList.add("fixed");
    indent.style.marginTop = navbar.offsetHeight + "px";
  } else {
    navbar.classList.remove("fixed");
    indent.style.marginTop = 0;
  }
}

// JQUERY
// $(document).ready(function() {
//   $(document).scroll(function () {
//       let y = $(this).scrollTop();
//       let x = $("#section_2").position() + $('#nav').outerHeight() + "px";
//       if (y >= x.top) {
//           $('#nav').addClass("fixed");
//           $("#section_2").css({margin-top: $('#nav').outerHeight() + "px"});
//       } else {
//           $('#nav').removeClass("fixed");
//           $("#section_2").css({margin-top: 0});
//       }
//       });
// });
// 
const menu_Links = document.querySelectorAll(".menu_link[data-goto]");
if (menu_Links.length>0){
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


