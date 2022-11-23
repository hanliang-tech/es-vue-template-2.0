<template>
  <div id="root">
    <es-router-view/>
  </div>
</template>

<script>
import {ESLog} from "@extscreen/es-log";
import {
  ESApplication,
  ESDevelopManager,
  ESDeviceManager,
  ESNetworkManager,
} from '@extscreen/es-core';
import BuildConfig from "@/build/BuildConfig";
import {RuntimeDeviceManager} from "@extscreen/es-runtime";
import RequestManager from "@/request/RequestManager";

export default {
  name: 'ESApp',
  /**
   * 集成ESApplication
   */
  mixins: [ESApplication],
  data() {
    return {
      pageParams: {},
    };
  },
  methods: {
    /**
     * ESApplication 生命周期: onESCreate();
     */
    onESCreate(props) {
      this.initLog();
      return Promise.resolve()
        .then(() => RuntimeDeviceManager.init())
        .then(() => RequestManager.init())
    },
    /**
     * 初始化ESLog
     */
    initLog() {
      if (BuildConfig.DEBUG) {
        ESLog.setMinimumLoggingLevel(ESLog.VERBOSE);
      } else {
        ESLog.setMinimumLoggingLevel(ESLog.ERROR);
      }
    },
  },
};
</script>

<style scoped>
#root {
  width: 1920px;
  height: 1080px;
}
</style>
