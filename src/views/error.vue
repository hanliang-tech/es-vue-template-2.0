<template>
  <div class="error-root-view-css">
    <span class="error-root-text-view-css">出错了~~</span>
  </div>
</template>

<script>

import {ESPage} from "@extscreen/es-core";

export default {
  name: 'error',
  mixins: [ESPage],
  data() {
    return {};
  },
  methods: {
    onESCreate(params) {

    },
  },
  components: {}
};
</script>

<style scoped>

.error-root-view-css {
  width: 1920px;
  height: 1080px;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-root-text-view-css {
  font-size: 50px;
  color: black;
}

</style>
