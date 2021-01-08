
// HEADER LOGIC

// search
function pushSearch() {
    document.querySelector("input.user-menu__search").focus()
}

// /search

// sign-in telephone modal
const isNumericInput = (event) => {
    // Allows number line & number pad
    const key = event.keyCode
    return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
}

const isModifierKey = (event) => {
    const key = event.keyCode
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
}

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!isNumericInput(event) && !isModifierKey(event))
        event.preventDefault()
}

const formatToPhone = (event) => {
    if(isModifierKey(event))
        return

    const target = event.target
    const input = target.value.replace(/\D/g,'').substring(0,11) // First ten digits of input only
    const operatorCode = input.substring(1,4)
    const middle = input.substring(4,7)
    const last1 = input.substring(7,9)
    const last2 = input.substring(9,11)

    if (input.length > 8)
        target.value = `+7 ${operatorCode} ${middle} ${last1} ${last2}`
    else if (input.length > 6)
        target.value = `+7 ${operatorCode} ${middle} ${last1}`
    else if (input.length > 3)
        target.value = `+7 ${operatorCode} ${middle}`
    else if(input.length > 0)
        target.value = `+7 ${operatorCode}`
}

// /sign-in telephone modal


function doHeaderLogic() {
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('keydown', enforceFormat);
    phoneInput.addEventListener('keyup', formatToPhone);

}

// /HEADER LOGIC


// CATALOG LOGIC
function showFilters() {
    showFiltersBtn = document.getElementById("show-filters-btn")
    clearBtn = document.getElementById("clear-filters-btn")
    if (showFiltersBtn.innerText === "ПОКАЗАТЬ ФИЛЬТРЫ") {
        showFiltersBtn.innerText = "Скрыть фильтры"
        clearBtn.style.display = "block"
    }
    else {
        showFiltersBtn.innerText = "Показать фильтры"
        clearBtn.style.display = "none"
    }
        
    filters = document.querySelector(".filters")    
    filters.style.display === "" ? filters.style.display = "block" : filters.style.display = ""   
}

function setFilters(target) {
    // Price is a single choice filter, rest of filters are multiple
    if (target.classList.contains('price')) {
        let prices = document.getElementsByClassName('prices')[0].children    
        for (let price of prices) {
            if (target !== price)
                price.classList.remove('active')
        }
    }
    !target.classList.contains('active') ? target.classList.add('active') : target.classList.remove('active')            
}

function clearFilters() {
    filterItems = document.getElementsByClassName('filter__item')
    for (let item of filterItems)
        item.classList.remove('active')
}

function doCatalogLogic() {
    console.log('catalog');

    document.addEventListener('click', function(e) {
        e = e || window.event;
        const target = e.target;
    
        if (target.classList.contains('filter__item'))
            setFilters(target)
    }, false);

}

// /CATALOG LOGIC


// PRODUCT LOGIC
function selectSize(target) {
    // Price is a single choice filter, rest of filters are multiple
    let sizes = document.getElementsByClassName('product__size')
    for (let size of sizes)
        if (size.classList.contains('active')) {
            size.classList.remove('active')
            break
        }
        
    !target.classList.contains('active') ? target.classList.add('active') : target.classList.remove('active')            
}

function doProductLogic() {
    console.log('product');

    document.addEventListener('click', function(e) {
        e = e || window.event;
        const target = e.target;
    
        if (target.classList.contains('product__size'))
            selectSize(target)
    }, false); 

}
// /PRODUCT LOGIC


// CART LOGIC
function changeQuantity(e) {
    let input = e.target.parentNode.parentNode.getElementsByTagName('input')[0]
    let qty = (e.target.parentNode.classList.contains('tm-increment-qty-btn')) ? 1 : -1
    if (parseInt(input.value) + qty > 0)
        input.value = parseInt(input.value) + qty    
}

function deleteFromCart(e) {
    e.target.parentNode.parentNode.parentNode.remove()
}

function recalculateProductPrice () {}
function recalculateCartPrice () {}


function doCartLogic() {
    console.log('cart');

    let changeQtyBtns = document.getElementsByClassName('tm-change-qty-btn');
    Array.prototype.forEach.call(changeQtyBtns, (btn) => { btn.addEventListener('click', changeQuantity)})

    let deleteBtns = document.getElementsByClassName('tm-delete-btn');
    Array.prototype.forEach.call(deleteBtns, (btn) => { btn.addEventListener('click', deleteFromCart)})

}
// /CART LOGIC


// CHECKOUT LOGIC
function doCheckoutLogic() {
    console.log('checkout');

    const checkoutPhoneInput = document.getElementById('checkoutPhoneInput');
    checkoutPhoneInput.addEventListener('keydown', enforceFormat);
    checkoutPhoneInput.addEventListener('keyup', formatToPhone);

}

// /CHECKOUT LOGIC


// ACCOUTN LOGIC
function doAccountLogic() {
    UIkit.tab(document.getElementById('tab')).show(1);

    
    const accountPhoneInput = document.getElementById('accountPhoneInput');
    accountPhoneInput.addEventListener('keydown', enforceFormat);
    accountPhoneInput.addEventListener('keyup', formatToPhone);
}

// /ACCOUTN LOGIC




// LOGIC EXECUTION

doHeaderLogic()

const pageFileName = window.location.pathname.split("/").pop();

switch (pageFileName) {
    case 'catalog.html':
        doCatalogLogic();
        break;
    case 'product.html':
        doProductLogic();
        break;
    case 'cart.html':
        doCartLogic();
        break;
    case 'checkout.html':
        doCheckoutLogic();
        break;
    case 'account.html':
        doAccountLogic();
        break;
}
