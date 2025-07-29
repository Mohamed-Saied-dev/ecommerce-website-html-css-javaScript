fetch("products.json")
  .then(response => response.json())
  .then(data => {
    let swiper_items_sale = document.getElementById("swiper_items_sale");
    let swiper_elctronics = document.getElementById("swiper_elctronics");
    let swiper_appliances = document.getElementById("swiper_appliances");
    let swiper_mobiles = document.getElementById("swiper_mobiles");


    const createProductHTML = (product) => {
      let percent_disc_html = "";
      let old_price_html = "";

      if (product.old_price) {
        const percent_disc = Math.round((product.old_price - product.price) / product.old_price * 100);
        percent_disc_html = `<span class="sale_present">%${percent_disc}</span>`;
        old_price_html = `<p class="old_price">$${product.old_price}</p>`;
      }
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let isInCart = cart.some(cartItem => cartItem.id === product.id);
      return `
        <div class="swiper-slide product">
          ${percent_disc_html}
          <div class="img_product">
            <a href="#"><img src="${product.img}" alt=""></a>
          </div>

          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>

          <p class="name_product"><a href="#">${product.name}</a></p>

          <div class="price">
            <p><span>$${product.price}</span></p>
            ${old_price_html}
          </div>

          <div class="icons">
            <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item in cart" : "Add to cart"}
            </span>
            <span class="icon_product"><i class="fa-regular fa-heart"></i></span>
          </div>
        </div>
      `;
    };

    
    let sale_html = '';
    let electronics_html = '';
    let appliances_html = '';
    let mobiles_html = '';


    data.forEach(product => {
      if (product.old_price) {
        sale_html += createProductHTML(product);
      }

      if (product.category === "electronics") {
        electronics_html += createProductHTML(product);
      }

      if (product.category === "appliances") {
        appliances_html += createProductHTML(product);
      }

      if (product.category === "mobiles") {
        mobiles_html += createProductHTML(product);
      }

    });

    swiper_items_sale.innerHTML = sale_html;
    swiper_elctronics.innerHTML = electronics_html;
    swiper_mobiles.innerHTML = mobiles_html;
    swiper_appliances.innerHTML = appliances_html;
  });
