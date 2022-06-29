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
  ESNetworkMixin,
  ESUsbDeviceMixin,
  getESApp,
} from '@extscreen/es-core';

export default {
  name: 'App',
  mixins: [
    ESNetworkMixin,
    ESUsbDeviceMixin,
  ],
  data() {
    return {};
  },
  mounted() {
    this.initLog()
    this.app = getESApp();
    this.init();
  },
  methods: {
    init() {
      let params = this.app.$options.$superProps
      this.initPageName = params.url;
      this.initPage()
    },
    initLog() {
      ESLog.setMinimumLoggingLevel(ESLog.VERBOSE);
    },
    initPage() {
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
