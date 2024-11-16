<template>
  <div class="container my-5">
    <div class="auth-container card p-5 mx-auto" style="max-width: 400px;">
      <h1 class="mb-4 text-center">Signup</h1>

      <div v-if="errors.length" id="error-message" class="alert alert-danger">
        <p v-for="(error, index) in errors" :key="index" class="mb-0">{{ error }}</p>
      </div>

      <form @submit.prevent="handleSignup">
        <div class="mb-3">
          <div class="input-group">
            <span id="name-addon" class="input-group-text">
              <svg height="20" viewBox="0 -960 960 960" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
                />
              </svg>
            </span>
            <input
                v-model="form.name"
                aria-describedby="name-addon"
                class="form-control"
                placeholder="Name"
                required
                type="text"
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="input-group">
            <span id="email-addon" class="input-group-text">@</span>
            <input
                v-model="form.email"
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
              <svg height="20" viewBox="0 -960 960 960" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"
                />
              </svg>
            </span>
            <input
                v-model="form.password"
                aria-describedby="password-addon"
                class="form-control"
                placeholder="Password"
                required
                type="password"
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="input-group">
            <span id="repeat-password-addon" class="input-group-text">
              <svg height="20" viewBox="0 -960 960 960" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"
                />
              </svg>
            </span>
            <input
                v-model="form.passwordConfirmation"
                aria-describedby="repeat-password-addon"
                class="form-control"
                placeholder="Repeat Password"
                required
                type="password"
            />
          </div>
        </div>

        <button class="btn btn-primary w-100" type="submit">Signup</button>
      </form>

      <p class="text-center mt-4">
        Already have an Account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    async handleSignup() {
      this.errors = [];

      if (!this.form.name) this.errors.push("Name is required.");
      if (!this.form.email) {
        this.errors.push("Email is required.");
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.push("Invalid email format.");
      }
      if (AuthService.isEmailTaken(this.form.email)) {
        this.errors.push("Email is already registered.");
      }
      if (!this.form.password) {
        this.errors.push("Password is required.");
      } else if (this.form.password.length < 8) {
        this.errors.push("Password must be at least 8 characters.");
      }
      if (this.form.password !== this.form.passwordConfirmation) {
        this.errors.push("Passwords do not match.");
      }

      if (this.errors.length === 0) {
        await AuthService.signup(this.form);
        this.$router.push("/");
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>
