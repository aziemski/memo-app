<template>
  <div class="container mt-3">
    <div class="card p-4">
      <h2 class="mb-3">{{ user.name }}</h2>
      <p class="text-muted mb-2">{{ user.email }}</p>
      <div class="mb-4">
        <p>
          <strong>Joined on:</strong> {{ formatDate(user.createdAt) }}
        </p>
      </div>

      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const loggedUser = AuthService.loggedUser();
      if (loggedUser) {
        this.user = loggedUser;
      } else {
        this.$router.push("/login");
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString({
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    logout() {
      AuthService.logout()
      this.$router.push("/login");
    },
  },
};
</script>
