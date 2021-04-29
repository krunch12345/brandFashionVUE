'use strict'

const API = 'https://raw.githubusercontent.com/krunch12345/brandFashionVUE/main/src/jsons/'

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        userSearch: '',
        show: false,
        showCart: false,
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://via.placeholder.com/100',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            let find = this.cartItems.find(el => el.id === item.id)
            if (find) {
                find.quantity++
            } else {
                const prod = Object.assign({quantity: 1}, item)
                this.cartItems.push(prod)
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i')
            this.filtered = this.products.filter(el => regexp.test(el.title))
        }
    },

    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item)
                }
            })
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item)
                    this.filtered.push(item)
                }
            })
    }
})

// const app = new Vue({
//     el: '#app',
//     data: {
//         userSearch: '',
//         showCart: false,
//         catalogUrl: '/catalogData.json',
//         cartUrl: '/getBasket.json',
//         cartItems: [],
//         filtered: [],
//         imgCart: 'https://placehold.it/50x100',
//         products: [],
//         imgProduct: 'https://placehold.it/200x150'
//     },
//     methods: {
//         getJson(url) {
//             return fetch(url)
//                 .then(result => result.json())
//                 .catch(error => console.log(error))
//         },
//         addProduct(item) {
//             this.getJson(`${API}/addToBasket.json`)
//                 .then(data => {
//                     if (data.result === 1) {
//                         let find = this.cartItems.find(el => el.id_product === item.id_product)
//                         if (find) {
//                             find.quantity++
//                         } else {
//                             const prod = Object.assign({quantity: 1}, item)//создание нового объекта на основе двух, указанных в параметрах
//                             this.cartItems.push(prod)
//                         }
//                     }
//                 })
//         },
//         remove(item) {
//             this.getJson(`${API}/addToBasket.json`)
//                 .then(data => {
//                     if (data.result === 1) {
//                         if (item.quantity > 1) {
//                             item.quantity--
//                         } else {
//                             this.cartItems.splice(this.cartItems.indexOf(item), 1)
//                         }
//                     }
//                 })
//         },
//         filter() {
//             let regexp = new RegExp(this.userSearch, 'i')
//             this.filtered = this.filtered.filter(el => regexp.test(el.product_name))
//         }
//     },
//     mounted() {
//         this.getJson(`${API + this.cartUrl}`)
//             .then(data => {
//                 for (let item of data.contents) {
//                     this.cartItems.push(item)
//                 }
//             })
//         this.getJson(`${API + this.catalogUrl}`)
//             .then(data => {
//                 for (let item of data) {
//                     this.$data.products.push(item)
//                     this.$data.filtered.push(item)
//                 }
//             })
//         this.getJson(`getProducts.json`)
//             .then(data => {
//                 for (let item of data) {
//                     //this.products.push(item);
//                     this.filtered.push(item)
//                 }
//             })
//     }
//
// })


// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> xhr = new ActiveXObject()
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };
//
// getRequest('tel.json').then(data => {
//
// })

// class List {
//     constructor(url, container, list = list2) {
//         this.container = container
//         this.list = list
//         this.url = url
//         this.goods = []
//         this.allProducts = []
//         this.filtered = []
//         this._init()
//     }
//
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error)
//             })
//     }
//
//     handleData(data) {
//         this.goods = [...data]
//         this.render()
//     }
//
//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0)
//     }
//
//     render() {
//         const block = document.querySelector(this.container)
//         for (let product of this.goods) {
//             const productObj = new this.list[this.constructor.name](product)
//             console.log(productObj)
//             this.allProducts.push(productObj)
//             block.insertAdjacentHTML('beforeend', productObj.render())
//         }
//     }
//
//     filter(value) {
//         const regexp = new RegExp(value, 'i')
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name))
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`)
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('invisible')
//             } else {
//                 block.classList.remove('invisible')
//             }
//         })
//     }
//
//     _init() {
//         return false
//     }
// }
//
// class Item {
//     constructor(product) {
//         this.id = product.id
//         this.title = product.title
//         this.price = product.price
//         this.img = product.img
//         this.description = product.description
//     }
//
//     render() {
//         return `<div class="products-item">
//                     <div class="for-add-cart-btn">
//                         <img class="products-item-photo" src="${this.img}" alt="products-item-${this.id}" height="420">
//                             <button
//                                 class="add-cart-btn"
//                                 data-id="${this.id}"
//                                 data-name="${this.title}"
//                                 data-price="${this.price}"
//                                 data-description="${this.description}"
//                             >
//                                 <svg width="46" height="45" viewBox="0 0 46 45" xmlns="http://www.w3.org/2000/svg">
//                                     <path
//                                         d="M30.2009 37C29.5532 36.9738 28.9415 36.6948 28.4972 36.2227C28.0529 35.7506 27.8114 35.1232 27.8245 34.475C27.8376 33.8269 28.1043 33.2097 28.5673 32.7559C29.0303 32.3022 29.6527 32.048 30.301 32.048C30.9493 32.048 31.5717 32.3022 32.0347 32.7559C32.4977 33.2097 32.7644 33.8269 32.7775 34.475C32.7906 35.1232 32.549 35.7506 32.1047 36.2227C31.6604 36.6948 31.0488 36.9738 30.401 37H30.2009ZM10.7529 34.32C10.7529 33.79 10.9101 33.2718 11.2046 32.8311C11.4991 32.3904 11.9176 32.0469 12.4073 31.844C12.8971 31.6412 13.4359 31.5881 13.9558 31.6915C14.4757 31.7949 14.9532 32.0502 15.328 32.425C15.7028 32.7998 15.9581 33.2773 16.0615 33.7972C16.1649 34.317 16.1118 34.8559 15.9089 35.3456C15.7061 35.8353 15.3626 36.2539 14.9219 36.5483C14.4812 36.8428 13.963 37 13.433 37C13.0809 37.0003 12.7321 36.9311 12.4067 36.7966C12.0814 36.662 11.7857 36.4646 11.5366 36.2158C11.2875 35.9669 11.09 35.6713 10.9552 35.3461C10.8204 35.0208 10.751 34.6721 10.751 34.32H10.7529ZM14.553 28.686C14.2935 28.6868 14.0409 28.6024 13.8341 28.4457C13.6273 28.2891 13.4776 28.0689 13.408 27.819L8.57495 10.364H5.18201C4.86852 10.364 4.56786 10.2395 4.34619 10.0178C4.12452 9.79614 4 9.49549 4 9.18201C4 8.86852 4.12452 8.56787 4.34619 8.3462C4.56786 8.12454 4.86852 8.00001 5.18201 8.00001H9.46301C9.7225 7.99919 9.97504 8.08372 10.1818 8.24057C10.3885 8.39742 10.5378 8.61788 10.6069 8.86801L15.4399 26.323H28.6179L33.001 16.275H18.401C18.2428 16.2796 18.0854 16.2524 17.9379 16.1951C17.7904 16.1377 17.6559 16.0513 17.5424 15.9411C17.4288 15.8308 17.3386 15.6989 17.277 15.5532C17.2154 15.4074 17.1836 15.2508 17.1836 15.0925C17.1836 14.9343 17.2154 14.7776 17.277 14.6319C17.3386 14.4861 17.4288 14.3542 17.5424 14.2439C17.6559 14.1337 17.7904 14.0473 17.9379 13.9899C18.0854 13.9326 18.2428 13.9054 18.401 13.91H34.814C35.0097 13.91 35.2022 13.9587 35.3744 14.0517C35.5465 14.1448 35.6928 14.2793 35.7999 14.443C35.9078 14.6073 35.9734 14.7957 35.9908 14.9914C36.0083 15.1872 35.9771 15.3842 35.9 15.565L30.495 27.977C30.4026 28.1876 30.251 28.3668 30.0585 28.4927C29.866 28.6186 29.641 28.6858 29.411 28.686H14.553Z"/>
//                                 </svg>
//                                 Add to Cart
//                             </button>
//                     </div>
//                     <a href="product.html" class="products-link">
//                         <span class="products-item-title">${this.title}</span>
//                         <p class="products-item-txt">${this.description}</p>
//                         <span class="products-item-price">$${this.price}</span>
//                     </a>
//                 </div>`
//     }
// }
//
// class ProductsList extends List {
//     constructor(cart, container = '.products-block', url = '/catalogData.json') {
//         super(url, container)
//         this.cart = cart
//         this.getJson()
//             .then(data => this.handleData(data))
//     }
//
//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('add-cart-btn')) {
//                 this.cart.addProduct(e.target)
//             }
//         })
//         // document.querySelector('.search-form').addEventListener('submit', e => {
//         //     e.preventDefault()
//         //     this.filter(document.querySelector('.search-field').value)
//         // })
//     }
// }
//
//
// class ProductItem extends Item {
// }
//
// class Cart extends List {
//     constructor(container = '.cart-block', url = '/getBasket.json') {
//         super(url, container)
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents)
//             })
//     }
//
//     addProduct(element) {
//         let productId = +element.dataset['id']
//         let find = this.allProducts.find(product => product.id === productId)
//         if (find) {
//             find.quantity++
//             this._updateCart(find)
//         } else {
//             let product = {
//                 id: productId,
//                 price: +element.dataset['price'],
//                 title: element.dataset['name'],
//                 description: element.dataset['description'],
//                 quantity: 1
//             }
//             this.goods = [product]
//             this.render()
//         }
//     }
//
//     removeProduct(element) {
//         let productId = +element.dataset['id']
//         let find = this.allProducts.find(product => product.id === productId)
//         if (find.quantity > 1) {
//             find.quantity--
//             this._updateCart(find)
//         } else {
//             this.allProducts.splice(this.allProducts.indexOf(find), 1)
//             document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//         }
//     }
//
//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id}"]`)
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`
//         block.querySelector('.product-price').textContent = `$${product.quantity * product.price}`
//     }
//
//     _init() {
//         document.querySelector('.cart-btn').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible')
//         })
//         document.querySelector(this.container).addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target)
//             }
//         })
//     }
//
// }
//
// class CartItem extends Item {
//     constructor(product, img = 'https://via.placeholder.com/100') {
//         super(product, img)
//         this.quantity = product.quantity
//     }
//
//     render() {
//         return `<div class="cart-item" data-id="${this.id}">
//             <div class="product-bio">
//             <img src="https://via.placeholder.com/100" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title-modal">${this.title}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//         <p class="product-single-price">$${this.price} each</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">$${this.quantity * this.price}</p>
//             <button class="del-btn" data-id="${this.id}">&times;</button>
//         </div>
//         </div>`
//     }
// }
//
// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// }
//
// let cart = new Cart()
// let products = new ProductsList(cart)
// products.getJson(`getProducts.json`).then(data => products.handleData(data))

