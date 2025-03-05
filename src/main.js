import Vue from 'vue';

Vue.config.productionTip = false;

//-------------------Config ESRouter---------------------
import ESRouter from "@extscreen/es-router";
import routes from './routes';

Vue.use(ESRouter);
const router = new ESRouter(routes);
//-------------------Config ESComponent---------------------
import {ESComponent} from "@extscreen/es-component";

Vue.use(ESComponent);
//-------------------New Application---------------------
import App from './App.vue';

const app = new Vue({
  appName: 'EsApp',
  rootView: '#root',
  render: h => h(App),
  router,
});

//勿删
app.$start(() => {
});
//-------------------Set ESApp Instance---------------------
import {setESApp} from "@extscreen/es-core";


setESApp(app);
