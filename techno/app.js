const { createApp } = Vue

createApp({
    data() {
        return {
            helloWorld: "olá mundo!",
            produtos: {},
        }
    },
    methods: {
        fetchProdutos() {
            fetch('./api/produtos/produtos.json')
                .then(resp => resp.json())
                .then(produtos => {
                    this.produtos = produtos
                })
        }
    }
}).mount("#app")