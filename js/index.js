const body = document.querySelector("body")

// Лоадер
// window.addEventListener("load", function () {
// const loader = document.querySelector(".loader-wrapper")
// loader.style.display = "none"
// })

// Кроссбраузерная ширина скроллбара
function getWidth() {
    const docWidth = document.documentElement.clientWidth
    return Number(window.innerWidth - docWidth)
}

// Скролл по нажатию на ссылки
document.querySelectorAll(".nav__links").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault()
        const navLinks = event.target
        const gotoBlock = document.querySelector(navLinks.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector(".header-wrapper").offsetHeight
        burgerMenu.classList.remove("active")
        menuBtn.classList.remove("active")
        body.classList.remove("body-overflow")
        body.style.paddingRight = ""
        window.scrollTo({
            top: gotoBlockValue, behavior: "smooth"
        })
    })
})

const iconProfile = document.querySelector(".icon-profile")
const menuBtn = document.querySelector('.menu-btn')
const burgerMenu = document.querySelector('.burger-menu')
const nav = document.querySelector(".nav")
const logoImg = document.querySelector(".logo__img")

// Изменение шапки при изменении ширины экрана
function checkScreenWidth() {
    const isMobile = window.innerWidth <= 980
    nav.classList.toggle("hide", isMobile)
    logoImg.classList.toggle("img-sm", isMobile)
    menuBtn.classList.toggle("hide", !isMobile)
    iconProfile.classList.toggle("hide", isMobile)

    if (!isMobile) {
        burgerMenu.classList.remove("active")
        menuBtn.classList.remove("active")
        body.classList.remove("body-overflow")
        body.style.paddingRight = ""
    }
}

// Вызов функции при загрузке страницы
checkScreenWidth()

// Вызов функции при изменении ширины экрана
window.addEventListener("resize", checkScreenWidth)

// Клик по бургеру, устранение скачка контента
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    console.log(menuBtn.parentNode)
    burgerMenu.classList.toggle("active")
    body.style.paddingRight = `${getWidth()}px`
    body.classList.toggle("body-overflow")
})

//Слайды с едой
const slide = document.querySelectorAll(".menu-section__card")
const slideText = document.querySelectorAll(".menu-section__text")

// Изменение класса слайдов при наведении
slide.forEach((item) => {
    item.addEventListener("mouseover", () => {
        removeClasses()
        item.classList.add("card_active")
        toggleTextClasses()
    })
})

// Сброс активных слайдов
function removeClasses() {
    slide.forEach(function (item) {
        item.classList.remove("card_active")
    })
}

// Изменение классов у текста внутри слайдов
function toggleTextClasses() {
    for (let value of slideText) {
        if (value.closest(".card_active")) {
            removeTextClasses()
            value.classList.add("active")
        }
    }
}

// Сброс активного текста у слайда
function removeTextClasses() {
    slideText.forEach(function (item) {
        item.classList.remove("active")
    })
}

// Табы
let tabHead = document.querySelector(".tabs__head")
let tabNav = document.querySelectorAll(".tabs__tab-btn")
let tabContent = document.querySelectorAll(".tabs__item")

// Активный таб

function changeTabs() {
    const isMobile = window.innerWidth <= 580
    if (isMobile) {
        tabNav.forEach((item) => {
            let activeTab = document.querySelector(".tabs__tab-btn.active-tab")
            item.classList.remove("tabs-order")
            activeTab.classList.add("tabs-order")
        })
    }
}

changeTabs()

window.addEventListener("resize", changeTabs)

tabHead.addEventListener("click", (event) => {

    // Проверка клика по кнопке
    const clicked = event.target.closest(".tabs__tab-btn")
    const isMobile = window.innerWidth <= 580
    if (!clicked) return

    // Убрать активность всех кнопок
    tabNav.forEach((item) => {
        item.classList.remove("active-tab")
        if (isMobile) {
            item.classList.remove("tabs-order")
        }
    })

    // Сделать кнопку активной при клике на неё
    event.target.classList.add("active-tab")
    if (isMobile) {
        event.target.classList.add("tabs-order")

    }
    let tabName = event.target.dataset.tab

    // Дата атрибут = класс контента
    tabContent.forEach((item) => {
        if (item.classList.contains(tabName)) {
            item.classList.add("active-tab")
        } else item.classList.remove("active-tab")
    })
})

// Картинка на фоне у карточек ресторана
let rest = 1

document.querySelectorAll(".address__card-img").forEach((item) => {
    item.style.cssText = `
      background-image:url('img/rests/rest${rest}.jpeg')`
    rest++
})

// Уведомление при клике на кнопку "в корзину"
// const toCartBtn = document.querySelectorAll(".food-card__btn")


// Скролл при нажатии на слайды с едой
document.querySelectorAll(".menu-section__card").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault()
        const sectionCard = event.target
        const gotoBlock = document.querySelector(sectionCard.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector(".header-wrapper").offsetHeight
        window.scrollTo({
            top: gotoBlockValue, behavior: "smooth"
        })
    })
})

//Модальное окно входа, регистрации
const modalProfileBtn = document.querySelector(".icon-profile")
const modalProfile = document.querySelector(".modal-profile")
const modalProfileOverlay = document.querySelector(".modal-profile-overlay")
const modalCloseBtn = document.querySelector(".modal_close")

// Открытие модального окна
modalProfileBtn.addEventListener("click", modalOpen)

// Закрытие
modalProfileOverlay.addEventListener("click", modalHide)
modalCloseBtn.addEventListener("click", modalHide)

function modalOpen() {
    modalProfile.classList.toggle("active")
    modalProfileOverlay.classList.toggle("active")
    body.style.paddingRight = `${getWidth()}px`
    body.style.overflowY = "hidden"
}

function modalHide() {
    modalProfileOverlay.classList.toggle("active")
    modalProfile.classList.toggle("active")
    body.style.paddingRight = `${getWidth()}px`
    body.style.overflowY = "auto"
}

// Прозрачность ссылок в шапке при наведении
nav.addEventListener("mouseover", hoverOnLink.bind(0.8))
nav.addEventListener("mouseout", hoverOnLink.bind(1))

function hoverOnLink(event) {
    if (event.target.closest(".nav__links")) {
        const hovered = event.target
        const links = document.querySelectorAll(".nav__links")

        links.forEach(item => {
            if (item !== hovered) {
                item.style.opacity = this
                item.style.transition = "0.3s"
            }
        })
    }
}

// Анимация шапки при скролле
window.addEventListener("scroll", function () {
    const headerWrapper = document.querySelector(".header-wrapper")
    const section2 = document.querySelector(".page__section_2")
    const section2Offset = section2.offsetTop
    const scrollTop = window.window.scrollY
    const headerHeight = headerWrapper.clientHeight + 1

    if (scrollTop > headerHeight) {
        headerWrapper.style.transform = "translateY(-110%)"
    } else {
        headerWrapper.style.transform = "translateY(0)"
        headerWrapper.style.position = "relative"
    }

    if (scrollTop >= (section2Offset - headerHeight)) {
        headerWrapper.style.transform = "translateY(0)"
        headerWrapper.style.position = "sticky"
    }
})

// Анимация при появлении

// let prevScrollPos = window.scrollY || document.documentElement.scrollTop;
// window.addEventListener('scroll', function() {
//     let currentScrollPos = window.scrollY || document.documentElement.scrollTop;
//     if (prevScrollPos < currentScrollPos) {
//
//         console.log('Скролл вниз');
//     }
//     prevScrollPos = currentScrollPos;
// });

const showElement = document.querySelectorAll(".show-element")

function showElementFunction(entries) {
    entries.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.remove("section-hide_top")
            //  при скролле убирается hide
        }
    })
}

const showObserver = new IntersectionObserver(showElementFunction, {threshold: 0.1})
showElement.forEach(item => {
    showObserver.observe(item)
    item.classList.add("section-hide_top")
})

// Анимация для заголовка в первом блоке
const showElementLeft = document.querySelectorAll(".show-element_left")

function showElementFunctionLeft(entries) {
    entries.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.remove("section-hide_left")
            //  при скролле убирается hide
        }
    })
}

const showObserverLeft = new IntersectionObserver(showElementFunctionLeft, {threshold: 0.1})

showElementLeft.forEach(item => {
    showObserverLeft.observe(item)
    item.classList.add("section-hide_left")
})
