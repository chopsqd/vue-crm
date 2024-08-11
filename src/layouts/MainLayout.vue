<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="app-main-layout">
      <Navbar @toggle="isNavbarOpen = !isNavbarOpen"/>

      <Sidebar v-model="isNavbarOpen"/>

      <main class="app-content" :class="{full: !isNavbarOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    isNavbarOpen: false,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters["info/info"]).length) {
      await this.$store.dispatch('info/fetchInfo')
    }

    this.loading = false
  }
}
</script>
