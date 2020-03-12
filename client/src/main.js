import Vue from "vue"
import App from "./app"

var app = new Vue({
    render: (createElement) => {
        return createElement(App)
    }
}).$mount(`#app`)