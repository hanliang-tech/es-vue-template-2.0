<template>
  <div id="root">
    <keep-alive>
      <router-view class="feature-content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {ESLog} from "@extscreen/es-log";
import {
  ESDevelopManager,
  ESDeviceManager,
  ESNetworkManager,
  getESApp
} from '@extscreen/es-core';
import BuildConfig from "@/build/BuildConfig";
import {RuntimeDeviceManager} from "@extscreen/es-runtime";
import RequestManager from "@/request/RequestManager";

export default {
  name: 'App',
  data() {
    return {
      pageParams: {},
    };
  },
  mounted() {
    this.initLog()
    this.app = getESApp();
    this.init();
  },
  methods: {
    init() {
      this.pageParams = this.app.$options.$superProps
      Promise.resolve()
        .then(() => Promise.all([
          RuntimeDeviceManager.init(),
          ESDevelopManager.init(),
          ESDeviceManager.init(),
          ESNetworkManager.init(),
        ]))
        .then(() => RequestManager.init())
        .then(
          //
          (result) => {
            this.initPage()
          },
          //
          error => {
            this.initPage()
          });
    },
    initLog() {
      if (BuildConfig.DEBUG) {
        ESLog.setMinimumLoggingLevel(ESLog.VERBOSE);
      } else {
        ESLog.setMinimumLoggingLevel(ESLog.ERROR);
      }
    },
    initPage() {
      this.initPageName = this.pageParams.url;
      if (!this.initPageName) {
        this.initPageName = `index`;
      }
      this.$router.push(this.initPageName);
    },
  },
  components: {}
};
</script>

<style scoped>
#root {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
