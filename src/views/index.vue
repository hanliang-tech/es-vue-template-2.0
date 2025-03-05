<template>
  <div class="index-root-view-css">
    <img class="index-root-img-css"
         :src="require('../assets/logo.png')">
    <span class="index-root-text-view-css">{{ text }}</span>
  </div>
</template>

<script>

import {ESPage} from "@extscreen/es-core";

export default {
  name: 'index',
  mixins: [ESPage],
  data() {
    return {
      text: 'Quick TV UI'
    };
  },
  methods: {
    onESCreate(params) {

    },
  },
  components: {}
};
</script>

<style scoped>

.index-root-view-css {
  width: 1920px;
  height: 1080px;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.index-root-img-css{
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.index-root-text-view-css {
  font-size: 50px;
  color: black;
}

</style>
