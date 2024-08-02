<template>
  <div class="app-main-layout">
    <Navbar @toggle="isNavbarOpen = !isNavbarOpen"/>

    <Sidebar v-model="isNavbarOpen"/>

    <main class="app-content" :class="{full: !isNavbarOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    isNavbarOpen: false
  })
}
</script>