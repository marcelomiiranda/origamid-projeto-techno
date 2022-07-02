const { createApp } = Vue

createApp({
    data() {
        return {
            products: {},
            product: {},
            modalHasProduct: false,
            cart: [],
            cartTotal: 0,
        }
    },
    methods: {
        getProducts() {
            fetch('./api/products.json')
                .then(resp => resp.json())
                .then(products => {
                    this.products = products
                })
        },
        getProduct(id){
            fetch(`./api/products/${id}/dados.json`)
            .then(resp => resp.json())
            .then(product => {
                this.product = product
            })
            this.modalHasProduct = true
        },
        closeModal({target, currentTarget}){
            if (target === currentTarget) this.modalHasProduct = false
        },
        openModal(id){
            this.getProduct(id)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        addItemToCart(product){
            const { id, name, price } = product

            this.product.inventory -= 1
            this.cart.push({id, name, price})
            this.cartTotal += price
        },
        removeItemFromCart(product){
            const { id, price } = product

            this.product.inventory += 1
            this.cart.splice(id, 1)
            this.cartTotal -= price
        },
        checkProductInCart(product){
            if (this.cart.length > 0)
            {
                return this.cart.find(item => item.id === product.id)
            }

            return false
        }
    },
    watch: {
        products(){
            this.products.map(item => {
                item.price = item.price.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
            })
        }
    },
    created() {
        this.getProducts()
    }
}).mount("#app")