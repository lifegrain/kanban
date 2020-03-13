import Vue from "vue"
import App from "./app"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var app = new Vue({
    render: (createElement) => {
        return createElement(App)
    }
}).$mount(`#app`)