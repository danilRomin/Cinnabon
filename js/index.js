const body = document.querySelector("body")

// Кроссбраузерное вычисление ширины скроллбара
function getWidth() {
    const docWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - docWidth)
}

// Клик по бургер-кнопке (скрытие/показ скроллбара и показ/скрытие бургер-меню)
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
menuBtn.addEventListener("click", (event) => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
    body.style.paddingRight = `${getWidth()}px`;
    body.classList.toggle("body-overflow");
})

// Скролл по нажатию на навбар, скрытие бургер меню и показ скроллбара при клике на навбар-ссылку
document.querySelectorAll(".nav__links").forEach((value) => {
    value.addEventListener("click", (event) => {
        event.preventDefault()
        const nav__links = event.target
        const gotoBlock = document.querySelector(nav__links.dataset.goto)
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(".header-wrapper").offsetHeight
        menu.classList.remove("active")
        menuBtn.classList.remove("active")
        body.classList.remove("body-overflow")
        window.scrollTo({
            top: gotoBlockValue, behavior: "smooth"
        })
    })
})

// Адаптивное изменение шапки при изменении ширины экрана
const nav = document.querySelector(".nav")
const navIcons = document.querySelector(".nav-icons")
const logoImg = document.querySelector(".logo__img")
const mark = document.querySelector(".mark")

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

//Слайды (карточки) с едой
const slide = document.querySelectorAll(".menu-section__card")
const slideText = document.querySelectorAll(".menu-section__text")

// Изменение класса слайда (раскрытие) при наведении
slide.forEach((value) => {
    value.addEventListener("mouseover", () => {
        removeClasses()
        value.classList.add("card_active")
        toggleTextClasses()
    })
})

// Сброс активного слайда при наведении на другой
function removeClasses() {
    slide.forEach(function (item) {
        item.classList.remove("card_active")
    })
}

// Изменение классов у текста внутри слайдов (показ)
function toggleTextClasses() {
    for (let value of slideText) {
        if (value.closest(".card_active")) {
            removeTextClasses()
            value.classList.add("active")
        }
    }
}

// Сброс активного класса текста у слайда (скрытие)
function removeTextClasses() {
    slideText.forEach(function (item) {
        item.classList.remove("active")
    })
}