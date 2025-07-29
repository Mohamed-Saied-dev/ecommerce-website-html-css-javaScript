const category_nav_list = document.querySelector(".category_nav_list");
const angleRight = document.querySelector(".angle_right")
const cart = document.querySelector('.cart');
const nav_links = document.querySelector(".nav_links")
function open_Menu() {
    nav_links.classList.toggle("active")
}

function open_Categ_list() {
    category_nav_list.classList.toggle("active");
    angleRight.classList.toggle("active");
}

function open_close_cart() {
    cart.classList.toggle("active")
}

fetch("products.json")
    .then(response => response.json())
    .then(data => {


        const addToCartButtons = document.querySelectorAll(".btn_add_cart")

        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {

                const productId = event.target.getAttribute('data-id');
                const selcetedProduct = data.find(product => product.id == productId);



                addToCart(selcetedProduct);
                const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
                allMatchingButtons.forEach(btn => {

                    btn.classList.add("active");
                    btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Item in cart'

                });

            })
        })
    })

function addToCart(product) {
    let cart = getCart();
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();



}
function updateCart() {
    const cartItemsContainer = document.getElementById("cart_items");
    const price_cart_total = document.querySelector(".price_cart_total");
    const count_item_cart = document.querySelector(".count_item_cart")
    const count_item_header = document.querySelector(".count_item_header");
    const checkout_items = document.getElementById("checkout_items");

    let totalPrice = 0;
    let totalCount = 0;
    let cart = getCart();
    cartItemsContainer.innerHTML = "";
    if (checkout_items) {
        checkout_items.innerHTML = "";

    }


    // ===============================================================

    cart.forEach((item, index) => {
        // Append item to the cart container
        cartItemsContainer.appendChild(createCartItemElement(item, index));

        totalPrice += item.price * item.quantity;
       
        totalCount += item.quantity;
        //========================

        if (checkout_items) {

           checkout_items.appendChild(createCartItemElement(item, index, true));

        }


    })


    // =============================================================


    let subtotal_checkout = document.querySelector(".subtotal_checkout");
    let total_checkout = document.querySelector(".total_checkout");
    if (subtotal_checkout) {
        subtotal_checkout.innerText = `$${totalPrice}`;
        total_checkout.innerText = `$${totalPrice + 20}`;
    }


    price_cart_total.innerText = `$${totalPrice}`;
    count_item_cart.innerText = totalCount;
    count_item_header.innerText = totalCount;


}

// ====== Functions ======

function createCartItemElement(item, index, withWrapper = false) {

    let total_Price_item = item.price * item.quantity;
    // Main Item
    let item_cart = document.createElement("div");
    item_cart.classList.add("item_cart");

    // Product Photo
    let img = document.createElement("img");
    img.src = item.img;
    img.alt = "product";

    // Content = (name + price + quantity controls)
    let content = document.createElement("div");
    content.classList.add("content");

    // product name
    let h4 = document.createElement("h4");
    h4.textContent = item.name;
    content.appendChild(h4);

    // product price
    let price = document.createElement("p");
    price.classList.add("price_cart");
    price.textContent = `$${total_Price_item}`;
    content.appendChild(price);

    // Quantity control elements
    let quantityControl = document.createElement("div");
    quantityControl.classList.add("quantity_control");

    // Decrease quantity button
    let decreaseBtn = document.createElement("button");
    decreaseBtn.classList.add("decrease_quantity");
    decreaseBtn.dataset.index = index;
    decreaseBtn.textContent = "-";
    decreaseBtn.addEventListener("click", () => {
        decreaseQuantity(decreaseBtn.dataset.index);
    })

    quantityControl.appendChild(decreaseBtn);
    // Quantity
    let quantitySpan = document.createElement("span");
    quantitySpan.classList.add("quantity");
    quantitySpan.textContent = item.quantity;
    quantityControl.appendChild(quantitySpan);

    // Increase quantity button
    let increaseBtn = document.createElement("button");
    increaseBtn.classList.add("Increase_quantity");
    increaseBtn.dataset.index = index;
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", () => {
        increaseQuantity(increaseBtn.dataset.index);
    })

    quantityControl.appendChild(increaseBtn);

    // Append quantity controls to the content
    content.appendChild(quantityControl);
    // Use wrapper if required
    if (withWrapper) {
        let imageNameDiv = document.createElement("div");
        imageNameDiv.classList.add("image_name");
        imageNameDiv.appendChild(img);
        imageNameDiv.appendChild(content);
        item_cart.appendChild(imageNameDiv);
    } else {
       
        item_cart.appendChild(img);
        item_cart.appendChild(content);
    }
    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_item");
    deleteButton.dataset.index = index;
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    deleteButton.onclick = function () {
        deleteButton.parentElement.remove();
        removeFromCart(index);
    }

    // Append delete button to the main item container
    item_cart.appendChild(deleteButton);


    return item_cart;
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {


        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}
function updateCartCount(count) {
    let cartCount = document.querySelector(".Count_item_cart")
    let shopingCar = document.querySelector(".count_item_header");

    shopingCar.textContent = `${count}`;
    cartCount.innerText = `${count}`;
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let removeProduct = cart.splice(index, 1)[0];
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateButtonState(removeProduct.id);
}

function updateButtonState(productId) {
    let allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
    allMatchingButtons.forEach(button => {
        button.classList.remove("active");
        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to cart';

    })

}
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
updateCart();
