const cart = document.querySelector(".cart")
const dropdownContent = document.querySelector(".dropdown-content")
const foodCardBtn = document.querySelectorAll(".food-card__btn")
const dropdownCards = document.querySelector(".dropdown-content__cards")
const cartQuantity = document.querySelector(".icon-cart-number")
let fullPrice = document.querySelector(".full-price")
let price = 0
const toCardNotification = document.querySelector(".cart-notification")

window.addEventListener("scroll", () => {
    dropdownContent.classList.remove("show_flex")
})

function disableScrollCart() {
    if (dropdownContent.classList.contains("show_flex")) {
        body.style.paddingRight = `${getWidth()}px`
        body.classList.toggle("body-overflow")
    }
}

// Открытие выпадающего списка
cart.addEventListener("click", () => {
    let length = dropdownCards.children.length;
    if (length > 0) {
        dropdownContent.classList.toggle("show_flex")
    }
})
dropdownContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Закрытие выпадающего списка
window.addEventListener("click", (event) => {
    if (!event.target.closest(".cart") && dropdownContent.classList.contains("show_flex")) {
        dropdownContent.classList.remove("show_flex")
    }
})

// Добавление в корзину
function randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Форматирование текста без пробелов
function priceWithoutSpaces(str) {
    return str.replace(/\s/g, '');
}

// Форматирование текста с пробелами
function normalPrice(str) {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// Сложение цены
function plusFullPrice(currentPrice) {
    return price += currentPrice
}

// Вычитание цены
function minusFullPrice(currentPrice) {
    return price -= currentPrice
}

// Итоговая цена
function printFullPrice() {
    fullPrice.textContent = `${normalPrice(price)} ₽`
}

// Число товаров в корзине
function printQuantity() {
    let length = dropdownCards.children.length;
    cartQuantity.innerHTML = length
    if (length > 0) {
        cart.classList.add("active")
    } else {
        cart.classList.remove("active")
    }
}


function generateCard(img, title, price, id) {
    return `
        <div class="dropdown-content-card__wrapper">
            <div class="dropdown-content__card" data-id='${id}'>
                <div class="dropdown-content__img-wrapper">
                    <img class="dropdown-content__img" src="${img}" alt="">
                </div>
                <div class="dropdown-content__text">
                    <div class="dropdown-content__tittle">
                        ${title}
                    </div>
                    <div class="counter">
                        <button class="decrement-btn">-</button>
                        <div class="counter-value">1</div>
                        <button class="increment-btn">+</button>
                    </div>
                    <div class="dropdown-content__price">
                        ${price} ₽
                    </div>
                </div>
                <button class="dropdown-content__trash-icon" >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7404 9L14.3942 18M9.60577 18L9.25962 9M19.2276 5.79057C19.5696 5.84221 19.9104 5.89747 20.25 5.95629M19.2276 5.79057L18.1598 19.6726C18.0696 20.8448 17.0921 21.75 15.9164 21.75H8.08357C6.90786 21.75 5.93037 20.8448 5.8402 19.6726L4.77235 5.79057M19.2276 5.79057C18.0812 5.61744 16.9215 5.48485 15.75 5.39432M3.75 5.95629C4.08957 5.89747 4.43037 5.84221 4.77235 5.79057M4.77235 5.79057C5.91878 5.61744 7.07849 5.48485 8.25 5.39432M15.75 5.39432V4.47819C15.75 3.29882 14.8393 2.31423 13.6606 2.27652C13.1092 2.25889 12.5556 2.25 12 2.25C11.4444 2.25 10.8908 2.25889 10.3394 2.27652C9.16065 2.31423 8.25 3.29882 8.25 4.47819V5.39432M15.75 5.39432C14.5126 5.2987 13.262 5.25 12 5.25C10.738 5.25 9.48744 5.2987 8.25 5.39432"
                              stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            </div>
    `
}

foodCardBtn.forEach((item) => {
    item.closest(".food-card").setAttribute("data-id", randomId())
    item.addEventListener("click", (event) => {
        let self = event.currentTarget
        let parent = self.closest(".food-card")
        let id = parent.dataset.id
        let img = parent.querySelector(".food-card__img-wrapper img").getAttribute("src")
        let title = parent.querySelector(".food-card__name").textContent
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector(".food-card__cost").textContent))
        //     Сумма
        plusFullPrice(priceNumber)
        //     Итоговая цена
        printFullPrice()
        //     Добавить в корзину
        dropdownCards.insertAdjacentHTML("afterbegin", generateCard(img, title, priceNumber, id))
        //     Количество товара в корзине
        printQuantity()
        //     disabled btn
        self.disabled = true;

        // alert "добавлено"
        toCardNotification.innerHTML = `Добавлено: ${title}`
        toCardNotification.classList.remove("opacity")
        setTimeout(function () {
            toCardNotification.classList.add("opacity")
        }, 1500)
    })
})

function deleteCards(cardParent) {
    // Получить id
    let id = cardParent.querySelector(".dropdown-content__card").dataset.id

    // undisabled button
    document.querySelector(`.food-card[data-id="${id}"]`).querySelector(".food-card__btn").disabled = false

    // Получение цены в карточке
    let currentPrice = parseInt(priceWithoutSpaces(cardParent.querySelector(".dropdown-content__price").textContent))
    minusFullPrice(currentPrice)
    printFullPrice()
    cardParent.remove()
    printQuantity()

    if (dropdownCards.children.length < 1) {
        dropdownContent.classList.remove("show_flex")
    }
}

// Удаление карточки при клике на мусорку
dropdownCards.addEventListener("click", (event) => {
    if (event.target.closest(".dropdown-content__trash-icon")) {
        deleteCards(event.target.closest(".dropdown-content-card__wrapper"))
    }
})
