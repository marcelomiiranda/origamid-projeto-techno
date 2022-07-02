const { createApp } = Vue

createApp({
    data() {
        return {
            products: {},
            product: {},
            modalHasProduct: false,
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