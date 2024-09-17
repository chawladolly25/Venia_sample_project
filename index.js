document.addEventListener("DOMContentLoaded", initialise);
let allProducts;
var hidden_product_list = [];

async function fetchProducts() {
    try {
      const resp = await fetch("https://fakestoreapi.com/products");
      const data = await resp.json();
      allProducts = data;
      console.log("allProducts", allProducts);
      displayProducts(allProducts);
    } catch (error) {
      console.error(error);
    }
  }

function displayProducts(products) {
    const list = document.querySelector(".product-list");
    const count_title = document.querySelector(".section-title");
    count_title.innerHTML = products.length+' products';
    console.log(list);
    products
      .map((product) => {
        const { image, category, price, title, id } = product;
        list.innerHTML += `
       <li>
              <div class="product-card">

                <figure class="card-banner">

                  <a href="#">
                    <img src=${image} alt="${category}" loading="lazy" width="800"
                      height="1034" class="w-100">
                  </a>

                </figure>

                <div class="card-content">
                  <h3 class="h4 card-title">
                    <a href="#">${title.substring(0, 45)}...</a>
                  </h3>

                  <div class="card-price">
                    <data value="45.00">$${price.toFixed(2)}</data>
                  </div>
                </div>
                <div class="card-actions">

                    <button class="card-action-btn" aria-label="Add to Whishlist">
                      <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                    </button>

                  </div>
              </div>
            </li>
      `;
      })
      .join("");
      // ($("ul.product-list li").length < 10) {
      //   $(".load-more").hide();
      // }
      var prod_list = $("ul.product-list li");
      
      prod_list.each(function(index, elem) {
        if (index >= 10) {
          hidden_product_list.push(elem);
          $(elem).hide();
        }
      });
      console.log(hidden_product_list);
  }




  function filterCategories() {
    const select = document.querySelector(".filter-btn");
    select.addEventListener("change", filterProducts);
  
    function filterProducts(e) {
        document.querySelectorAll('input[type=checkbox]').forEach(temp => temp.checked = false)  
      let list = document.querySelector(".product-list");
      let content;
      let option = e.target.value;
      e.target.checked = true;
      list.innerHTML = "";
  
      switch (option) {
        case "all":
          content = allProducts;
          break;
        case "mensclothing":
          content = allProducts.filter((product) => {
            return product.category === "men's clothing";
          });
          break;
        case "womensclothing":
          content = allProducts.filter((product) => {
            return product.category === "women's clothing";
          });
          break;
        case "jewellery":
          content = allProducts.filter((product) => {
            return product.category === "jewelery";
          });
          break;
        case "electronics":
          content = allProducts.filter((product) => {
            return product.category === "electronics";
          });
          break;
        default:
          content = allProducts;
      }
      const count_title = document.querySelector(".section-title");
      count_title.innerHTML = content.length+' products';
      content
        .map((product) => {
          const { image, category, price, title, id } = product;
          list.innerHTML += `
      <li>
              <div class="product-card">

                <figure class="card-banner">

                  <a href="#">
                    <img src=${image} alt="${category}" loading="lazy" width="800"
                      height="1034" class="w-100">
                  </a>

                </figure>

                <div class="card-content">
                  <h3 class="h4 card-title">
                    <a href="#">${title.substring(0, 45)}...</a>
                  </h3>

                  <div class="card-price">
                    <data value="45.00">$${price.toFixed(2)}</data>
                  </div>
                </div>
                <div class="card-actions">

                    <button class="card-action-btn" aria-label="Add to Whishlist">
                      <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                    </button>

                  </div>
              </div>
            </li>
      
     `;
        })
        .join("");
        // console.log("content", content.length);
        if (content.length < 10) {
      $(".load-more").hide();
    }
    }
    
    
  }

  function sortCategories(products) {
 const select = document.querySelector("#sort-btn");
 select.addEventListener("change", sortProducts);

 function sortProducts(e) {
   let list = document.querySelector(".product-list");
   let content;
   let option = e.target.value;
   list.innerHTML = "";

   switch (option) {
    case "all":
      content = allProducts;
      break;
    case "price_lh":
        content = allProducts.sort((a, b) => a.price > b.price ? 1 : -1);
      break;
    case "price_hl":
        content = allProducts.sort((a, b) => b.price > a.price ? 1 : -1);
      break;
    case "ascending":
        content = allProducts.sort((a, b) => a.title > b.title ? 1 : -1);
      break;
    case "descending":
        content = allProducts.sort((a, b) => b.title > a.title ? 1 : -1);
      break;
    default:
      content = allProducts;
  }
  const count_title = document.querySelector(".section-title");
  count_title.innerHTML = content.length+' products';
  content
    .map((product) => {
      const { image, category, price, title, id } = product;
      list.innerHTML += `
  <li>
          <div class="product-card">

            <figure class="card-banner">

              <a href="#">
                <img src=${image} alt="${category}" loading="lazy" width="800"
                  height="1034" class="w-100">
              </a>

            </figure>

            <div class="card-content">
              <h3 class="h4 card-title">
                <a href="#">${title.substring(0, 45)}...</a>
              </h3>

              <div class="card-price">
                <data value="45.00">$${price.toFixed(2)}</data>
              </div>
            </div>
            <div class="card-actions">

                <button class="card-action-btn" aria-label="Add to Whishlist">
                  <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                </button>

              </div>
          </div>
        </li>
  
 `;
    })
    .join("");
}
  }

  function searchProduct() {
    const searchInput = document.querySelector("#search-input");
    const list = document.querySelector(".product-list");
    searchInput.addEventListener("keyup", (e) => {
      list.innerHTML = "";
      let searchTerm = e.target.value.toLowerCase();
      let content = allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
      });
      content
        .map((product) => {
          const { image, price, category, title, id } = product;
          list.innerHTML += `
      <li>
              <div class="product-card">

                <figure class="card-banner">

                  <a href="#">
                    <img src=${image} alt="${category}" loading="lazy" width="800"
                      height="1034" class="w-100">
                  </a>

                </figure>

                <div class="card-content">
                  <h3 class="h4 card-title">
                    <a href="#">${title.substring(0, 45)}...</a>
                  </h3>

                  <div class="card-price">
                    <data value="45.00">$${price.toFixed(2)}</data>
                  </div>
                </div>
                <div class="card-actions">

                    <button class="card-action-btn" aria-label="Add to Whishlist">
                      <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart outline"></ion-icon>
                    </button>

                  </div>
              </div>
            </li>
      
     `;
        })
        .join("");
    });
  }
  
  $('.load-more').click(function(){
    hidden_product_list.forEach(function(elem) {
        elem.style.display = "list-item";
        $('.load-more').hide();
    });

 });

  function initialise() {
    fetchProducts();
    filterCategories();
    sortCategories();
    searchProduct();
   
  }