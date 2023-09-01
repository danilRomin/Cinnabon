// Скролл по нажатию на навбар
const header = document.querySelector(".header-wrapper")
document.querySelector(".nav").addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.closest(".nav__links")) {
        const id = event.target.getAttribute("href")
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }
})

// Клик по ссылке в бургере => скрытие бургера
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
document.querySelectorAll(".nav__links").forEach((value) => {
    value.addEventListener("click", (event) => {
        event.preventDefault()
        menu.classList.remove("active")
        menuBtn.classList.remove("active")
        const id = event.target.getAttribute("href")
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    })
})

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
    }
}

// Вызов функции при загрузке страницы
checkScreenWidth()

// Вызов функции при изменении ширины экрана
window.addEventListener("resize", checkScreenWidth)

// Появление бургер меню при клике на бургер-кнопку
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
})

function getWidth() {
    const docWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - docWidth)
}

getWidth()



//Слайды с едой
const slide = document.querySelectorAll(".menu-section__card")
const slideText = document.querySelectorAll(".menu-section__text")

// Изменение класса при наведении
slide.forEach((value) => {
    value.addEventListener("mouseover", () => {
        removeClasses()
        value.classList.add("card_active")
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
