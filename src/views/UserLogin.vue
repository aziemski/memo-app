<template>
  <div class="container my-5">
    <div class="auth-container card p-5 mx-auto" style="max-width: 400px">
      <h1 class="mb-4 text-center">Login</h1>

      <div v-if="errors.length" id="error-message" class="alert alert-danger">
        <p v-for="(error, index) in errors" :key="index" class="mb-0">
          {{ error }}
        </p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <div class="input-group">
            <span id="email-addon" class="input-group-text">@</span>
            <input
              id="email-input"
              v-model="email"
              aria-describedby="email-addon"
              class="form-control"
              placeholder="Email"
              required
              type="email"
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="input-group">
            <span id="password-addon" class="input-group-text">
              <svg
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"
                />
              </svg>
            </span>
            <input
              id="password-input"
              v-model="password"
              aria-describedby="password-addon"
              class="form-control"
              placeholder="Password"
              required
              type="password"
            />
          </div>
        </div>

        <button class="btn btn-primary w-100" type="submit">Login</button>
      </form>

      <p class="text-center mt-4">
        New here?
        <router-link to="/signup">Create an Account</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import AuthService from '@/services/authService';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
      };
    },

    methods: {
      handleLogin() {
        this.errors = [];
        const success = AuthService.login(this.email, this.password);
        if (!success) {
          this.errors.push('Invalid email or password.');
        } else {
          this.$router.push('/');
        }
      },
    },
  };
</script>
