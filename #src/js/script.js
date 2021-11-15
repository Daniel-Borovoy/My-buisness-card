addEventListener('load', () => {
  document.body.removeAttribute('class')
})

const navbar = document.querySelector('header')
const section1 = document.querySelector('.home-section')
const section2 = document.querySelector('.portfolio-section')
// Header fixing function
const fixingNavbar = () => {
  const offset = section1.getBoundingClientRect().height
  if ((window.pageYOffset || document.documentElement.scrollTop) >= offset) {
    navbar.classList.add('header_fixed')
    section2.style.marginTop = navbar.offsetHeight + 'px'
  } else {
    navbar.removeAttribute('class')
    section2.removeAttribute('style')
  }
}

const counter = document.querySelectorAll('.counter')
let limit = 0 // A variable to stop the function when everything starts
// Account function
const numberCounter = () => {
  if (limit === counter.length) {
    return
  }
  for (let i = 0; i < counter.length; i++) {
    let pos = counter[i].getBoundingClientRect().top // The position of the block, counting from the top of the window
    let win = window.innerHeight - 40 // 40 pixels less than the height of the window
    if (pos < win && counter[i].dataset.stop === '0') {
      counter[i].dataset.stop = 1 // We stop restarting the account in this block
      let x = 0
      limit++ // The counter will be started, we increase the variable by 1
      let interval = setInterval(() => {
        // Every 60 milliseconds, the 50th part of the desired number will be added
        x = x + Math.ceil(counter[i].dataset.to / 50)
        counter[i].innerText = x + '%'
        if (x > counter[i].dataset.to) {
          // As soon as we have counted it, we erase the interval
          counter[i].innerText = counter[i].dataset.to + '%'
          clearInterval(interval)
        }
      }, 60)
    }
  }
}

addEventListener('scroll', () => {
  fixingNavbar()
  numberCounter()
})

const popupLinks = document.querySelectorAll('.popup-link')
const popups = document.querySelectorAll('.popup')
const popup__cancels = document.querySelectorAll('.popup__cancel')

if (popupLinks && popups && popup__cancels) {
  for (let i = 0; i < popups.length; i++) {
    popupLinks[i].addEventListener('click', (e) => {
      e.preventDefault()
      popups[i].classList.add('popup_open')
      
      document.body.classList.add('body_lock')
    })

    popups[i].addEventListener('click', (e) => {
      if (!e.target.closest('.popup__body')) {
        document.body.removeAttribute('class')
        popups[i].classList.remove('popup_open')
      }
    })

    popup__cancels[i].addEventListener('click', () => {
      document.body.removeAttribute('class')
      popups[i].classList.remove('popup_open')
    })
  }
}

const menuLinks = document.querySelectorAll('.header__menu-link[data-goto]')
if (menuLinks.length) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', (e) => onMenuLinkClick(e))
  })

  const onMenuLinkClick = (e) => {
    const menuLink = e.target
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        window.pageYOffset -
        document.querySelector('header').offsetHeight
      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      })
    }
  }
}
