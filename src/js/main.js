'use strict'

const API = 'https://raw.githubusercontent.com/krunch12345/brandFashionVUE/main/src/jsons/'

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cartShown: false,
        userSearch: '',
        filtered: []
    },
    components: {cart, products, filter_el},
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
        },
    }
})


// const app = new Vue({
//     el: '#app',
//     data: {
//         catalogUrl: '/catalogData.json',
//         products: [],
//         userSearch: '',
//         showCart: false,
//         cartUrl: '/getBasket.json',
//         cartItems: [],
//         filtered: [],
//         imgCart: 'https://via.placeholder.com/100',
//     },
//     methods: {
//         getJson(url) {
//             return fetch(url)
//                 .then(result => result.json())
//                 .catch(error => console.log(error))
//         },
//         addProduct(item) {
//             let find = this.cartItems.find(el => el.id === item.id)
//             if (find) {
//                 find.quantity++
//             } else {
//                 const prod = Object.assign({quantity: 1}, item)
//                 this.cartItems.push(prod)
//             }
//         },
//         remove(item) {
//             if (item.quantity > 1) {
//                 item.quantity--
//             } else {
//                 this.cartItems.splice(this.cartItems.indexOf(item), 1)
//             }
//         },
//         filter() {
//             let regexp = new RegExp(this.userSearch, 'i')
//             this.filtered = this.products.filter(el => regexp.test(el.title))
//         }
//     },
//
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
//                     this.products.push(item)
//                     this.filtered.push(item)
//                 }
//             })
//     }
// })


