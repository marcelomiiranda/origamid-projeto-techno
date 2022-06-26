const { createApp } = Vue

createApp({
    data() {
        return {
            products: {},
        }
    },
    mounted() {
        fetch('./api/products.json')
            .then(resp => resp.json())
            .then(products => {
                this.products = products
            })
    },
    watch: {
        products(){
            this.products.map(item => {
                item.price = item.price.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
            })
        }
    },
}).mount("#app")