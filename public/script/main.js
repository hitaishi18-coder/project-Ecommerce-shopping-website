//  1 Select container and template  
//   Yaha par container aur template ko select kar rahe hain
const productContainer = document.querySelector(".productContainer");
const productTemplate = document.querySelector("template.productTemplate");
 


// function handle text
//  Ye function description ka length limit karta hai (short/long handle karne ke liye)
function handleDescLength(fulllength,maxlength = 100) {
  if (!fulllength) return ""; // agar description empty hai to blank return karega
  if(fulllength.length <= maxlength) return fulllength; // agar text chhota hai to pura hi show hoga

  const shortLength =  fulllength.slice(0,maxlength);
  // .slice(0, maxlength) extracts characters from index 0 up to maxlength (default is 100).
  //  Yaha se text ko chhota (short) bana ke 100 chars tak cut kar raha hai

  const remainingText = fulllength.slice(maxlength);
  // This line extracts the remaining part of a string (text) starting from a specific position (maxlength) until the end.
  //  Ye line bacha hua (remaining) text nikalti hai jo hide kiya jayega

  return `
  ${shortLength}<span class="dots">...</span>
  <span class="more-text d-none">
    ${remainingText}
  </span>
   <button class="btn btn-link p-2 m-1 fw-bolder  read-more-btn text-decoration-none" style="color: black ;">Read More</button>
  `;
}

//  2️ Show products using template
//  Product list ko template ke andar inject karke display karta hai
function showProduct(productList) {
  productContainer.innerHTML = ""; // Clear existing
  //  Pehle container empty kar raha hai taaki naye products fresh dikhaye

  for (let i = 0; i < productList.length; i++) {
    const item = productList[i];

    const clone = productTemplate.content.cloneNode(true); 
    //  Template ka clone bana raha hai taaki ek-ek product insert ho sake

    clone.querySelector(".productCategory").textContent = item.category;
    clone.querySelector(".productImage").src = item.image;
    clone.querySelector(".productImage").alt = item.name;
    clone.querySelector(".productName").textContent = item.name;
    clone.querySelector(".productText").innerHTML = handleDescLength(item.description);
    clone.querySelector(".productPrice").textContent = `₹${item.price}`;
    clone.querySelector(".productActualPrice").textContent = `₹${item.actualPrice}`;
    clone.querySelector(".product-stock").textContent = item.stock;

    let stars = "";
    for (let j = 0; j < 5; j++) {
      stars += j < item.rating ? "★" : "☆";
    }
    clone.querySelector(".productRating").textContent = stars;
    //  Rating ko ★ aur ☆ ke form me show kar raha hai

    let quantity = 1;
    const quantityText = clone.querySelector(".quantity");
    quantityText.textContent = quantity;
    const plusBtn = clone.querySelector(".plus");
    const minusBtn = clone.querySelector(".minus");

    //  Quantity increase karne ka logic
    plusBtn.addEventListener("click", () => {
      if (quantity < item.stock) {
        quantity++;
        quantityText.textContent = quantity;
      }
    });

    //  Quantity decrease karne ka logic
    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityText.textContent = quantity;
      }
    });

    //  Add to cart button ka kaam
    const addToCartBtn = clone.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", () => {
      addToCart(item, quantity);
    });

    productContainer.appendChild(clone);
  }
}

// 3  Add to Cart logic
//  Product ko cart me save karta hai localStorage ke andar
function addToCart(product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity += quantity; // agar product already hai to uski qty badhata hai
  } else {
    cart.push({ ...product, quantity }); // naya product add karega
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`); 
  // 👉 User ko alert karega jab cart me add hoga
}



//  5  Fetch and convert API data
//  Fake API se data fetch kar ke products create karta hai
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data =>
     {
    const mapped = data.map(item => ({
      name: item.title,
      category: item.category,
      description: item.description,
      price: item.price,
      actualPrice: (item.price + 30).toFixed(2), // fake discount
      //  Actual price me thoda fake discount dikhata hai
      image: item.image,
      stock: 10, // fixed stock
      //  Stock fix kar diya hai (10 items)
      rating: Math.round(item.rating.rate) // round to nearest
      //  Rating ko round karke integer me convert kiya hai
    }));

    showProduct(mapped); // use your template system
    //  Ab mapped data ko showProduct me bhej diya
  }) 
  .catch(err => {
    console.error("❌ Failed to load product data:", err);
    //  Agar API fail ho jaye to error console me dikhata hai
  });



//   Read More / Show Less logic 

// it must be at the end of the page 
//  Ye hamesha last me hona chahiye taaki products pehle load ho jayein

// bcoz This logic uses event delegation (document.addEventListener) which waits for any click on the page.
//  Kyunki ye event delegation hai, isliye page ke kisi bhi button click par react karega

//    So, it should be after your products are inserted into the DOM — otherwise, the buttons won't exist yet.
//  Agar ye pehle likh diya to products ke buttons exist hi nahi karenge, isliye baad me likhna zaruri hai


document.addEventListener("click",function(event) {

   if (event.target.classList.contains("read-more-btn")) 
   //  Agar read-more button click hua hai
  {

    const card = event.target.closest(".card");
    // .closest(".card") finds the nearest parent element with class card (i.e., the card of the product).
    //  Ye card identify karta hai jisme button click hua hai

    const dots = card.querySelector(".dots")
    //  Dots ( ... ) wale span ko select karta hai

    const moreText = card.querySelector(".more-text")
    //  Extra description jo hide kiya gaya tha usko select karta hai

    const button = event.target;
    //  Button ka reference store kar liya

    const isHidden = moreText.classList.contains("d-none")
    moreText.classList.toggle("d-none")
    //  Agar hidden hai to show karega, agar show hai to hide karega

    dots.style.dispay = isHidden ? "none" : "inline";
    // Shows or hides the extra description.
    //  Dots ko hide/show karne ka kaam

    button.textContent = isHidden ? "Show less" : "Read more"
    // Changes the button text depending on what’s visible
    //  Button ka text "Read more" se "Show less" banata hai aur vice-versa
  } 
});
