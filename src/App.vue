<template>
  <AppNavbar />
  <router-view />
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
}
</script>

<style>
@media print {
  .navbar {
    display: none !important;
  }
}
</style>
