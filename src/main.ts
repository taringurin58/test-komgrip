import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/styles/main.scss";

// Soft UI Dashboard : failed
import "./assets/styles/soft-ui/css/nucleo-icons.css";
import "./assets/styles/soft-ui/css/nucleo-svg.css";
import "./assets/styles/soft-ui/scss/soft-ui-dashboard.scss";
// import "./assets/styles/soft-ui/js/core/popper.min.js";
// import "./assets/styles/soft-ui/js/core/bootstrap.min.js";
// import "./assets/styles/soft-ui/js/soft-ui-dashboard.min.js";

const app = createApp(App);

app.use(store);
app.use(VueAxios, axios);
app.use(router);
app.mount("#app");
