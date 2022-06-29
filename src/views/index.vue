<template>
  <div class="index-root-view-css">
    <span class="index-root-text-view-css">{{ text }}</span>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      text: 'Hello World!'
    };
  },
  mounted() {
  },
  methods: {},
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

.index-root-text-view-css {
  font-size: 50px;
  color: black;
}

</style>
