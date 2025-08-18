
const productContainer = document.querySelector(".productContainer");
const productTemplate = document.querySelector(".productTemplate");

function showProduct(products) {
  productContainer.innerHTML = ""; // purane products clear karna
  products.forEach(item => {
    const clone = productTemplate.content.cloneNode(true); 
    // template ko clone karke product fill karenge

    clone.querySelector(".productCategory").textContent = item.category;
    clone.querySelector(".productImage").src = item.image;
    clone.querySelector(".productImage").alt = item.name;
    clone.querySelector(".productName").textContent = item.name;
    clone.querySelector(".productText").textContent = item.description;
    clone.querySelector(".productPrice").textContent = `₹${item.price}`;
    clone.querySelector(".productActualPrice").textContent = `₹${item.actualPrice}`;
    clone.querySelector(".product-stock").textContent = item.stock;

    // Ratings banana (5 star system)
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < item.rating ? "★" : "☆";
    }
    clone.querySelector(".productRating").textContent = stars;


    // Quantity plus minus logic
    let quantity = 1 ;
    const quantityText = clone.querySelector(".quantity")
    const pluss = clone.querySelector(".plus")
    const minus = clone.querySelector(".minus")
    
    // plus button click -> quantity badhegi (lekin stock ke andar hi)
    pluss.addEventListener("click",() =>{
      if(quantity < item.stock){
        quantity++;
        quantityText.textContent = quantity;
      }
    })

    // minus button click -> quantity ghatayenge (1 se kam nahi)
    minus.addEventListener("click" , () => {
      if(quantity > 1){
        quantity--;
        quantityText.textContent = quantity;
      }
    })

    //  Add to cart button
    const addtocartBtn  = clone.querySelector(".add-to-cart");
    addtocartBtn.addEventListener("click" , () => {
      addtocart(item,quantity);
    })

    productContainer.appendChild(clone); // container me product add karna
    });
}


//  Add to cart function
function addtocart(product,quantity){
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // localStorage se cart nikalna

  const existing = cart.find((item) => item.name === product.name);
  if(existing){
    existing.quantity += quantity; // agar pehle se hai to qty badh jayegi
  } else {
    cart.push({...product,quantity}) // nahi hai to naya push karega
  }

  localStorage.setItem("cart" , JSON.stringify(cart)) // cart update karega
  alert (`${product.name} added to cart ` ) // user ko dikhayega
}


//  Products search & filter ke liye array
let allProducts = []

// input box me type karte hi search hoga
document.getElementById("searchInput").addEventListener("input" , function(){
  filterProducts()
})

// dropdown se category change karte hi filter hoga
document.getElementById("categoryFilter").addEventListener("change", function(){
  filterProducts();
})

function filterProducts(){
  let searchText = document.getElementById("searchInput").value.toLowerCase();
  let category = document.getElementById("categoryFilter").value;

  // search aur category dono filter apply
  let filteredProducts = allProducts.filter(product => {
    let matchname = product.name.toLowerCase().includes(searchText);
    let matchcategory = category === "" || product.category === category;
    return matchname && matchcategory;
  })

  showProduct(filteredProducts) // sirf filtered products show karna
}


//  MongoDB API se products fetch karna
fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    console.log("Products from MongoDB:", data);
    allProducts = data 
    filterProducts(); // direct filterProducts call kar rahe taaki search/filter sath chale
    // showProduct(data); // agar filter use nahi karna to ye use kar sakte
  })
  .catch(err => {
    console.error("Error loading products:", err);
  });
