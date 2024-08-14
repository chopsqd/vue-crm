<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import messages from "@/utils/messages";

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout
  },
  watch: {
    error(errValue) {
      this.$error(messages[errValue.code] || 'Что-то пошло не так')
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    error() {
      return this.$store.getters["error/error"]
    }
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
