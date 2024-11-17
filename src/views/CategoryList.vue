<template>
  <div class="container my-5">
    <h1>Categories</h1>

    <div
      v-if="successMessage"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {{ successMessage }}
      <button
        aria-label="Close"
        class="btn-close"
        type="button"
        @click="clearMessage('successMessage')"
      ></button>
    </div>

    <div
      v-if="errors.length"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <button
        aria-label="Close"
        class="btn-close"
        type="button"
        @click="clearMessage('errors')"
      ></button>
    </div>

    <form @submit.prevent="addCategory">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="newCategory.name"
          class="form-control"
          required
          type="text"
        />
      </div>

      <div class="form-group d-flex align-items-center mt-3">
        <input
          id="color"
          v-model="newCategory.color"
          :disabled="disableColor"
          class="form-control form-control-color me-2"
          style="width: 50px; height: 35px"
          type="color"
        />
        <div class="form-check">
          <input
            id="disableColor"
            v-model="disableColor"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="disableColor">No Color</label>
        </div>
      </div>

      <button class="btn btn-primary mt-2" type="submit">Add Category</button>
    </form>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>
            <span
              v-if="category.color"
              :style="{
                backgroundColor: category.color,
                padding: '5px 10px',
                borderRadius: '4px',
                color: '#fff',
              }"
            >
              {{ category.color }}
            </span>
            <span v-else>N/A</span>
          </td>
          <td>
            <router-link
              :to="{ name: 'CategoryEdit', params: { id: category.id } }"
              class="btn btn-sm btn-warning me-2"
            >
              Edit
            </router-link>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import EventService from '@/services/eventService';
  import AuthService from '@/services/authService';

  export default {
    data() {
      return {
        categories: [],
        newCategory: {
          name: '',
          color: '#d3d3d3',
        },
        disableColor: false,
        successMessage: null,
        errors: [],
      };
    },

    created() {
      this.auth();
      this.loadCategories();
    },

    methods: {
      auth() {
        if (!AuthService.isAuthenticated()) {
          this.$router.push('/login');
        }
      },

      loadCategories() {
        this.categories = EventService.getCategories();
      },

      addCategory() {
        this.errors = [];

        if (!this.newCategory.name) {
          this.errors.push('Name is required.');
          return;
        }

        const newCategory = {
          ...this.newCategory,
          color: this.disableColor ? null : this.newCategory.color,
          id: Date.now(),
        };

        try {
          EventService.saveCategories([...this.categories, newCategory]);
        } catch (error) {
          this.errors.push(error.message);
          return;
        }

        this.categories.push(newCategory);
        this.newCategory = { name: '', color: '#d3d3d3' };
        this.disableColor = false;
        this.successMessage = 'Category added successfully!';
      },

      deleteCategory(id) {
        this.categories = this.categories.filter((cat) => cat.id !== id);
        try {
          EventService.saveCategories(this.categories);
        } catch (error) {
          this.errors.push(error.message);
          return;
        }

        this.successMessage = 'Category deleted successfully!';
      },

      clearMessage(type) {
        if (type === 'successMessage') this.successMessage = null;
        if (type === 'errors') this.errors = [];
      },
    },
  };
</script>
