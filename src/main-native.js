import Vue from 'vue';
import VueRouter from 'vue-router';
import HippyVueNativeComponents from '@huantv/vue-native-components';
import App from './App.vue';
import routes from './routes';
import {setESApp} from "@extscreen/es-core";

import {
  ESProgressBarViewComponent,
  ESSeekBarViewComponent,
  ESAnimationViewComponent,
  ESLoadingViewComponent,
  ESQRCodeViewComponent,
} from "@extscreen/es-core";


Vue.config.productionTip = false;
//
Vue.use(HippyVueNativeComponents);
Vue.use(VueRouter);

//
Vue.use(ESAnimationViewComponent)
Vue.use(ESLoadingViewComponent)
Vue.use(ESProgressBarViewComponent)
Vue.use(ESSeekBarViewComponent)
Vue.use(ESQRCodeViewComponent)

const router = new VueRouter(routes);

const app = new Vue({
  appName: 'EsApp',
  rootView: '#root',
  render: h => h(App),
  router,
});

//勿删
app.$start(() => {
});

//ESCore
setESApp(app);
