<template>
  <div class="container mt-3">
    <div class="card p-4">
      <h2 class="mb-3">{{ user.name }}</h2>
      <p class="text-muted mb-2">{{ user.email }}</p>
      <div class="mb-4">
        <p><strong>Joined on:</strong> {{ formatDate(user.createdAt) }}</p>
      </div>

      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      user: {},
    }
  },

  computed: {
    authStore() {
      return useAuthStore()
    },
  },

  created() {
    this.loadUser()
  },

  methods: {
    loadUser() {
      const loggedUser = this.authStore.loggedUser()
      if (loggedUser) {
        this.user = loggedUser
      } else {
        this.$router.push('/login')
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString({
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    logout() {
      this.authStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>
