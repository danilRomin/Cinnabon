const body = document.querySelector("body")

function getWidth() {
    const docWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - docWidth)
}

// Скролл по нажатию на ссылки
document.querySelectorAll(".nav__links").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault()
        const nav__links = event.target
        const gotoBlock = document.querySelector(nav__links.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(".header-wrapper").offsetHeight
        menu.classList.remove("active")
        menuBtn.classList.remove("active")
        body.classList.remove("body-overflow")
        body.style.paddingRight = ""
        window.scrollTo({
            top: gotoBlockValue, behavior: "smooth"
        })
    })
})

const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const nav = document.querySelector(".nav")
const navIcons = document.querySelector(".nav-icons")
const logoImg = document.querySelector(".logo__img")
const mark = document.querySelector(".mark")

// Изменение шапки при изменении ширины экрана
function checkScreenWidth() {
    const isMobile = window.innerWidth <= 980
    nav.classList.toggle("hide", isMobile)
    navIcons.classList.toggle("hide", isMobile)
    logoImg.classList.toggle("img-sm", isMobile)
    mark.classList.toggle("hide", !isMobile)
    menuBtn.classList.toggle("hide", !isMobile)

    if (!isMobile) {
        menu.classList.remove("active")
        menuBtn.classList.remove("active")
        body.classList.remove("body-overflow")
        body.style.paddingRight = ""
    }
}

// Вызов функции при загрузке страницы
checkScreenWidth()

// Вызов функции при изменении ширины экрана
window.addEventListener("resize", checkScreenWidth)

// Клик по бургеру
menuBtn.addEventListener("click", (event) => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
    body.style.paddingRight = `${getWidth()}px`;
    body.classList.toggle("body-overflow");
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
let activeTab = document.querySelector(".tabs__tab-btn.active-tab")

function changeTabs() {
    const isMobile = window.innerWidth <= 580
    if (isMobile) {
        tabNav.forEach((item) => {
            item.classList.remove("tabs-order")
            item.classList.add("tabs-order")
        })
    } else {
        activeTab.classList.remove("tabs-order")
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


