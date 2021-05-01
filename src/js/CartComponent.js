const cartItem = {
    props: ['cart_item', 'img'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some image">
                <div class="product-desc">
                    <div class="product-title">{{ cart_item.title }}</div>
                    <div class="product-quantity">Quantity: {{ cart_item.quantity }}</div>
                    <div class="product-single-price">$ {{ cart_item.price }} each</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">$ {{ cart_item.quantity * cart_item.price }}</div>
                <button class="del-btn" @click="$root.$refs.cart.remove(cart_item)">&times;</button>
            </div>
        </div>
    `
}

const cart = {
    components: {'cart-item': cartItem},
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/100',
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id === product.id)
            if (find) {
                find.quantity++
            } else {
                let prod = Object.assign({quantity: 1}, product)
                this.cartItems.push(prod)
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                product.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(product), 1)
            }
        }

    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el)
                    this.cartItems.push(el)
                }
            })
    },
    template: `
        <div class="cart">
            <button class="cart-btn" type="button" @click="cartShown = !cartShown">
                <svg width="46" height="45" viewBox="0 0 46 45" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M30.2009 37C29.5532 36.9738 28.9415 36.6948 28.4972 36.2227C28.0529 35.7506 27.8114 35.1232 27.8245 34.475C27.8376 33.8269 28.1043 33.2097 28.5673 32.7559C29.0303 32.3022 29.6527 32.048 30.301 32.048C30.9493 32.048 31.5717 32.3022 32.0347 32.7559C32.4977 33.2097 32.7644 33.8269 32.7775 34.475C32.7906 35.1232 32.549 35.7506 32.1047 36.2227C31.6604 36.6948 31.0488 36.9738 30.401 37H30.2009ZM10.7529 34.32C10.7529 33.79 10.9101 33.2718 11.2046 32.8311C11.4991 32.3904 11.9176 32.0469 12.4073 31.844C12.8971 31.6412 13.4359 31.5881 13.9558 31.6915C14.4757 31.7949 14.9532 32.0502 15.328 32.425C15.7028 32.7998 15.9581 33.2773 16.0615 33.7972C16.1649 34.317 16.1118 34.8559 15.9089 35.3456C15.7061 35.8353 15.3626 36.2539 14.9219 36.5483C14.4812 36.8428 13.963 37 13.433 37C13.0809 37.0003 12.7321 36.9311 12.4067 36.7966C12.0814 36.662 11.7857 36.4646 11.5366 36.2158C11.2875 35.9669 11.09 35.6713 10.9552 35.3461C10.8204 35.0208 10.751 34.6721 10.751 34.32H10.7529ZM14.553 28.686C14.2935 28.6868 14.0409 28.6024 13.8341 28.4457C13.6273 28.2891 13.4776 28.0689 13.408 27.819L8.57495 10.364H5.18201C4.86852 10.364 4.56786 10.2395 4.34619 10.0178C4.12452 9.79614 4 9.49549 4 9.18201C4 8.86852 4.12452 8.56787 4.34619 8.3462C4.56786 8.12454 4.86852 8.00001 5.18201 8.00001H9.46301C9.7225 7.99919 9.97504 8.08372 10.1818 8.24057C10.3885 8.39742 10.5378 8.61788 10.6069 8.86801L15.4399 26.323H28.6179L33.001 16.275H18.401C18.2428 16.2796 18.0854 16.2524 17.9379 16.1951C17.7904 16.1377 17.6559 16.0513 17.5424 15.9411C17.4288 15.8308 17.3386 15.6989 17.277 15.5532C17.2154 15.4074 17.1836 15.2508 17.1836 15.0925C17.1836 14.9343 17.2154 14.7776 17.277 14.6319C17.3386 14.4861 17.4288 14.3542 17.5424 14.2439C17.6559 14.1337 17.7904 14.0473 17.9379 13.9899C18.0854 13.9326 18.2428 13.9054 18.401 13.91H34.814C35.0097 13.91 35.2022 13.9587 35.3744 14.0517C35.5465 14.1448 35.6928 14.2793 35.7999 14.443C35.9078 14.6073 35.9734 14.7957 35.9908 14.9914C36.0083 15.1872 35.9771 15.3842 35.9 15.565L30.495 27.977C30.4026 28.1876 30.251 28.3668 30.0585 28.4927C29.866 28.6186 29.641 28.6858 29.411 28.686H14.553Z"/>
                </svg>
            </button>
            <div class="cart-block" v-show="cartShown">
                <p v-if="!cartItems.length">
                    Cart is empty
                </p>
                <cart-item
                    v-for="product of cartItems"
                    :img="imgCart"
                    :cart_item="product"
                >
                </cart-item>
            </div>
        </div>
    `
}


// Vue.component('cart', {
//     props: ['cartItems', 'img', 'visibility'],
//     template: `
//         <div class="cart-block" v-show="cartShown">
//             <p v-if="!cartItems.length">
//                 Cart is empty
//             </p>
//             <cart-item
//                 v-for="product of cartItems"
//                 :img="imgCart"
//                 :cart_item="product"
//             >
//             </cart-item>
//         </div>
//     `
// })
//
// Vue.component('cart-item', {
//     props: ['img', 'cartItem'],
//     template: `
//         <div class="cart-item">
//             <div class="product-bio">
//                 <img :src="img" alt="Some image">
//                 <div class="product-desc">
//                     <div class="product-title">{{ cartItem.title }}</div>
//                     <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
//                     <div class="product-single-price">$ {{ cartItem.price }} each</div>
//                 </div>
//             </div>
//             <div class="right-block">
//                 <div class="product-price">$ {{ cartItem.quantity * cartItem.price }}</div>
//                 <button class="del-btn" @click="$root.remove(cartItem)">&times;</button>
//             </div>
//         </div>
//     `
// })