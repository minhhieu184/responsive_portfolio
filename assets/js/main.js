
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const toggleBtn = $('#nav-toggle-btn')
const navOption = $('.nav__options')
const navCloseBtn = $('#nav-close-btn')
console.log(navCloseBtn);



// show/hidden nav menu
toggleBtn.addEventListener('click', () =>{
    navOption.style.bottom = '0'
})

navCloseBtn.addEventListener('click', () =>{
    navOption.style.bottom = '-100%'
})


// hidden menu when click nav
const navItems = $$('.nav__item-link')

console.log([navItems]);
navItems.forEach((navItem) => {
    navItem.addEventListener('click', () =>{
        navOption.style.bottom = '-100%'
    })
})




// show hide skills

const skillsList = $('.skills__list')
skillsList.addEventListener('click', e => {
    const skillItem = e.target.closest('.skill__item')
    if(skillItem){
        const wrap = skillItem.children[1]
        const wrapHeight = wrap.offsetHeight
        const iconHeader = skillItem.querySelector('.skill__header-arrow-icon')
    
        if (!e.target.closest('.skill__description-wrap')){
            if(!wrapHeight){
                console.log([wrap.querySelector('.skill__description')]);
                wrap.style.height = wrap.querySelector('.skill__description').offsetHeight + 'px'
            } else {
                wrap.style.height = 0
            }
            if(!iconHeader.style.transform || iconHeader.style.transform == 'rotate(0deg)'){
                iconHeader.style.transform = 'rotate(180deg)'
            } else {
                iconHeader.style.transform = 'rotate(0deg)'
            }
        }
    }
})




// show/hide education and work in qualification
const tabItems = $$('.qlc__tab-item')

tabItems.forEach(tabItem => {
    tabItem.addEventListener('click', () => {
        $('.qlc__tab-item.active').classList.remove('active')
        tabItem.classList.add('active')
        $('.qlc__list.active').classList.remove('active')
        const qlcList = $(`.qlc__list[data-index="${tabItem.dataset.index}"]`)
        qlcList.classList.add('active')

    })
})



// show/hide modal

const serviceList = $('.service__list')
serviceList.addEventListener('click', e => {
    const modalBtn = e.target.closest('.service__item-btn')
    if(modalBtn){
        const modal = e.target.closest('.service__item').querySelector('.service__item-modal')
        Object.assign(modal.style, {
            visibility: 'visible',
            opacity: 1,
        })
    }
})

const closeModalIcons = $$('.service__modal-header-icon')
if(closeModalIcons.length){
    closeModalIcons.forEach(icon => {
        icon.addEventListener('click', e => {
            const modal = e.target.closest('.service__item-modal')
            Object.assign(modal.style, {
                visibility: 'hidden',
                opacity: 0,
            })
        })
    })
}

const modals = $$('.service__item-modal')
if(modals.length){
    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            const modalWrap = e.target.closest('.service__item-modal-wrap')
            if(!modalWrap){
                Object.assign(modal.style, {
                    visibility: 'hidden',
                    opacity: 0,
                })
            }
        })
    })

}



// swiper slide show Projects

let swiperPrj = new Swiper(".pfl__container", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,

    },
    mousewheel: true,
    keyboard: true,
  });


// swiper slide show testimonial

let swiperTmn = new Swiper(".tmn__slide", {
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        740:{
            slidesPerView: 2,
            spaceBetween: 30,
        }
    }
  });



//   Onscroll active 
const navBtns = $$('.nav__item-link')

const sectionsOffsetTop = [...navBtns].map(navBtn => {
    const selector = navBtn.href.split('#')[1]
    return $(`#${selector}`).offsetTop
})
console.log("sectionsOffsetTop", sectionsOffsetTop)
console.log($('.section').getBoundingClientRect())

const scrollTopBtn = $('.scrollTopBtn')

function checkScroll(scrollY, index){

    if ((sectionsOffsetTop[index] || sectionsOffsetTop[index] === 0) 
        && scrollY >= sectionsOffsetTop[index]) return checkScroll(scrollY, index + 1)

    return index - 1 < 0 ? 0 : index - 1
}

// console.log(checkScroll(0,0));

function activeNavBtn(){
    const index = checkScroll(window.scrollY, 0)
    
    $('.nav__item-link.active').classList.remove('active')
    ;[...navBtns][index].classList.add('active')
}

function addBoxShadow(){
    window.scrollY > 100 ? $('.header').style.boxShadow = '0px 1px 13px 0px rgb(0 0 0 / 15%)'
        : $('.header').style.boxShadow = 'unset'
}

function toggleScrollTop(){
    window.scrollY > 500 ? scrollTopBtn.classList.add('show') : scrollTopBtn.classList.remove('show')
}

window.onscroll = (e) => {
    //   active navigation
    activeNavBtn()

    // boxshadow header
    addBoxShadow()

    toggleScrollTop()
}

scrollTopBtn.addEventListener('click', () => {
    window.screenY = 0
})






// toggle theme
const CONFIG_KEY = 'config'
const body = $('body')
const toggleThemeBtn = $('.nav__theme-btn')
const config = JSON.parse(localStorage.getItem(CONFIG_KEY)) || {}

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme') ? config.theme = 'dark-theme' : config.theme = ''
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
})

if(config.theme === 'dark-theme'){
    toggleThemeBtn.click()
}











