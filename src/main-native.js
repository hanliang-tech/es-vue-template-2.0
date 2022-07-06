import Vue from 'vue';
import VueRouter from 'vue-router';
import HippyVueNativeComponents from '@huantv/vue-native-components';
import App from './App.vue';
import routes from './routes';
import {setESApp} from "@extscreen/es-core";

//--------------------------COMPONENT-------------------------------------
import {
  ESProgressBarViewComponent,
  ESSeekBarViewComponent,
  ESAnimationViewComponent,
  ESLoadingViewComponent,
  ESQRCodeViewComponent,
} from "@extscreen/es-core";


import {ESADPlayerViewComponent} from "@extscreen/es-ad-player-view-component";
import {ESIJKPlayerViewComponent} from "@extscreen/es-ijk-player-view-component";
import {ESSohuPlayerViewComponent} from "@extscreen/es-sohu-player-view-component";
import {ESTVBCPlayerViewComponent} from "@extscreen/es-tvbc-player-view-component";
import {ESM1905PlayerViewComponent} from "@extscreen/es-m1905-player-view-component";


import {ESX5WebViewComponent} from "@extscreen/es-x5web-view-component";
import {ESWebViewComponent} from "@extscreen/es-web-view-component";


//--------------------------CSS-------------------------------------
import "@extscreen/es-ijk-player/dist/index.css";
import "@extscreen/es-ad-player/dist/index.css";
import "@extscreen/es-sohu-player/dist/index.css";
import "@extscreen/es-tvbc-player/dist/index.css";
import "@extscreen/es-m1905-player/dist/index.css";

import "@extscreen/es-ad-front-player-manager/dist/index.css";
import "@extscreen/es-ad-paused-player-manager/dist/index.css";
import "@extscreen/es-player-manager/dist/index.css";

//---------------------------------------------------------------

Vue.config.productionTip = false;
//
Vue.use(HippyVueNativeComponents);
Vue.use(VueRouter);

//基础组件
Vue.use(ESAnimationViewComponent)
Vue.use(ESLoadingViewComponent)
Vue.use(ESProgressBarViewComponent)
Vue.use(ESSeekBarViewComponent)
Vue.use(ESQRCodeViewComponent)


//播放器
Vue.use(ESADPlayerViewComponent)
Vue.use(ESIJKPlayerViewComponent)
Vue.use(ESSohuPlayerViewComponent)
Vue.use(ESTVBCPlayerViewComponent)
Vue.use(ESM1905PlayerViewComponent)


//webview
Vue.use(ESX5WebViewComponent)
Vue.use(ESWebViewComponent)

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
