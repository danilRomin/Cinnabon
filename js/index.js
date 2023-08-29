// Скролл по нажатию на навбар
document.querySelector(".nav").addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.closest(".nav__links")) {
        const id = event.target.getAttribute("href")
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }
})

const nav = document.querySelector(".nav")
const navIcons = document.querySelector(".nav-icons")
const logoImg = document.querySelector(".logo__img")
const mark = document.querySelector(".mark")
const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const header = document.querySelector(".header")

// Изменение шапки при изменении ширины экрана
function checkScreenWidth() {
    const isMobile = window.innerWidth <= 980
    header.classList.toggle("mobile", isMobile)
    nav.classList.toggle("hide", isMobile)
    navIcons.classList.toggle("hide", isMobile)
    logoImg.classList.toggle("img-sm", isMobile)
    mark.classList.toggle("hide", !isMobile)
    menuBtn.classList.toggle("hide", !isMobile)
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

//Слайды с едой

const slide = document.querySelectorAll(".menu-section__card")

for (let value of slide) {
    value.addEventListener("mouseover", () => {
        removeClasses()
        value.classList.add("card_active")
    })
}
// Сброс активных слайдов
function removeClasses() {
    slide.forEach(function remove(item) {
        item.classList.remove("card_active")
    })
}