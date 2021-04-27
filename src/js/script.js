// blackout banner and dropdown menu

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("dropdown");
    document.getElementById("myBlackout").classList.toggle("blackout");
}

// add products blackout and Add to Cart button

// let addCartBtn = document.querySelectorAll(".products-item");
// addCartBtn.forEach((element,item) => element.addEventListener("mouseover", function() {
//     let cartBtn = document.querySelectorAll(".add-cart-btn")[item];
//     cartBtn.style.visibility = "visible";
//     let darkBack = document.querySelectorAll(".products-item-photo")[item];
//     darkBack.style.filter = "brightness(33%)";
// }))
// addCartBtn = document.querySelectorAll(".products-item");
// addCartBtn.forEach((element,item) => element.addEventListener("mouseout", function() {
//     let cartBtn = document.querySelectorAll(".add-cart-btn")[item];
//     cartBtn.style.visibility = "hidden";
//     let darkBack = document.querySelectorAll(".products-item-photo")[item];
//     darkBack.style.filter = "brightness(100%)";
// }))