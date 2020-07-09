var removeCartItemButtons=document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
for(var i=0;i<removeCartItemButtons.length;i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)

}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i=0 ; i< quantityInputs.length;i++){
    var input =quantityInputs[i]
    input.addEventListener('change',quantityChanged)

}

function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value) ||input.value<=0){
        input.value = 1
    }
    updateCartTotal()
}

var addToCartButtons=document.getElementsByClassName('shop-item-button')
for(var i=0; i< addToCartButtons.length;i++){
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}

 function addToCartClicked(event){
     var button = event.target
     var shopItem=button.parentElement.parentElement.parentElement
     var title = shopItem.getElementsByClassName('single-item-text')[0].innerText
    var priceone = shopItem.getElementsByClassName('single-item-price')[0].innerText
     console.log(title,priceone)
     addItemToCart(title,priceone)
     updateCartTotal()


 }

 function addItemToCart(title,priceone)
 {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
           
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${priceone}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
 }

document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
function purchaseClicked(){
    alert("thank you for your purchase, Fill out the form to ensure delivery.")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
var total=0
for(var i=0;i< cartRows.length;i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('Rs',''))
    var quantity = quantityElement.value
    console.log(price * quantity)
    total = total + (price * quantity)
}
total=Math.round(total*100)/100
document.getElementsByClassName('cart-total-price')[0].innerText=total
   

}
