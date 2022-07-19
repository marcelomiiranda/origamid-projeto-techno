const { createApp } = Vue

createApp({
    data() {
        return {
            productList: {},
            product: {},
            modalHasProduct: false,
            cart: [],
            cartTotal: 0,
            messageAlert: '',
            alertActive: false,
            showCart: false,
        }
    },
    methods: {
        getProducts() {
            fetch('./api/products.json')
                .then(resp => resp.json())
                .then(products => {
                    this.productList = products
                })
        },
        getProduct(id) {
            fetch(`./api/products/${id}/dados.json`)
                .then(resp => resp.json())
                .then(product => {
                    this.product = product
                })
            this.modalHasProduct = true
        },
        closeModal({ target, currentTarget }) {
            if (target === currentTarget) this.modalHasProduct = false
            this.modifyTitleAndUrl(true)
        },
        openModal(id) {
            this.getProduct(id)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        addItemToCart() {
            const { id, name, price } = this.product

            this.product.inventory -= 1
            this.cart.push({ id, name, price })
            this.cartTotal += price

            this.alert(`${name} adicionado ao carrinho.`)
        },
        removeItemFromCart(index) {
            const { name, price } = this.cart[index]

            this.cart.splice(index, 1)
            this.cartTotal -= price

            this.alert(`${name} removido do carrinho.`)
        },
        filterCurrency(currency) {
            if (currency)
                return currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

            return 0
        },
        checkLocalStorage() {
            if (window.localStorage.cart)
                this.cart = JSON.parse(window.localStorage.cart)

            this.cart.map(item => {
                this.cartTotal += item.price
            })
        },
        populateLocalStorage() {
            window.localStorage.cart = JSON.stringify(this.cart)
        },
        alert(message) {
            this.messageAlert = message
            this.alertActive = true
            setInterval(() => {
                this.alertActive = false
            }, 2000)
        },
        modifyTitleAndUrl(home) {
            document.title = !home ? this.product.name || "Techno" : "Techno"
            history.pushState(null, null, `#${!home ? this.product.id || '' : ''}`)
        },
        router() {
            const hash = document.location.hash.replace('#', '')

            if (hash)
                this.getProduct(hash)
        },
        checkProductInventory() {
            if (this.cart && this.product)
                this.product.inventory -= this.cart.filter(product => product.id === this.product.id).length
        },
    },
    watch: {
        cartTotal() {
            this.populateLocalStorage()
        },
        product() {
            this.modifyTitleAndUrl()
            this.checkProductInventory()
        }
    },
    created() {
        this.getProducts()
        this.router()
        this.checkLocalStorage()
    }
}).mount("#app")