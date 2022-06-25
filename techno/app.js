const { createApp } = Vue

createApp({
    data() {
        return {
            helloWorld: "olá mundo!",
            produtos: {},
        }
    },
    mounted() {
        fetch('./api/produtos.json')
            .then(resp => resp.json())
            .then(produtos => {
                this.produtos = produtos
            })
    }
}).mount("#app")