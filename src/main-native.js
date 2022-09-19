import Vue from 'vue';

Vue.config.productionTip = false;

//-------------------Native Component---------------------
import HippyVueNativeComponents from '@huantv/vue-native-components';

Vue.use(HippyVueNativeComponents);

//-------------------Base Component---------------------
import {
  ESProgressBarViewComponent,
  ESSeekBarViewComponent,
  ESAnimationViewComponent,
  ESLoadingViewComponent,
  ESQRCodeViewComponent,
} from "@extscreen/es-core";

Vue.use(ESAnimationViewComponent)
Vue.use(ESLoadingViewComponent)
Vue.use(ESProgressBarViewComponent)
Vue.use(ESSeekBarViewComponent)
Vue.use(ESQRCodeViewComponent)


//-------------------Config ESRouter---------------------
import VueRouter from "@extscreen/es-router";
import routes from './routes';

Vue.use(VueRouter);
const router = new VueRouter(routes);

import {
  ESPageRootViewComponent,
  ESPageRouterViewComponent,
} from "@extscreen/es-core";

//
Vue.use(ESPageRootViewComponent)
Vue.use(ESPageRouterViewComponent)


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
