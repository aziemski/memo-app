<template>
  <div class="container my-5">
    <h1>Edit Category</h1>

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" @click="clearMessage('successMessage')" aria-label="Close"></button>
    </div>

    <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show" role="alert">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <button type="button" class="btn-close" @click="clearMessage('errors')" aria-label="Close"></button>
    </div>

    <form @submit.prevent="updateCategory">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input
            type="text"
            id="name"
            v-model="category.name"
            class="form-control"
            required
        />
      </div>

      <div class="form-group d-flex align-items-center mt-3">
        <input
            type="color"
            id="color"
            v-model="category.color"
            class="form-control form-control-color me-2"
            style="width: 50px; height: 35px;"
            :disabled="disableColor"
        />
        <div class="form-check">
          <input
              type="checkbox"
              id="disableColor"
              v-model="disableColor"
              class="form-check-input"
          />
          <label class="form-check-label" for="disableColor">No Color</label>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <router-link to="/categories" class="btn btn-secondary me-2">Cancel</router-link>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import eventService from "@/services/EventService";

export default {
  data() {
    return {
      category: {
        id: null,
        name: "",
        color: "#d3d3d3",
      },
      disableColor: false,
      successMessage: null,
      errors: [],
    };
  },
  created() {
    this.loadCategory();
  },
  methods: {
    loadCategory() {
      const categoryId = parseInt(this.$route.params.id, 10);
      const allCategories = eventService.getCategories();
      const foundCategory = allCategories.find((cat) => cat.id === categoryId);

      if (foundCategory) {
        this.category = { ...foundCategory };
        this.disableColor = !this.category.color;
      } else {
        this.errors.push("Category not found.");
      }
    },
    updateCategory() {
      this.errors = [];

      if (!this.category.name.trim()) {
        this.errors.push("Category name is required.");
        return;
      }

      const allCategories = eventService.getCategories();
      const updatedCategories = allCategories.map((cat) =>
          cat.id === this.category.id
              ? { ...this.category, color: this.disableColor ? null : this.category.color }
              : cat
      );

      try{
        eventService.saveCategories(updatedCategories);
      } catch (error) {
        this.errors.push(error.message);
        return;
      }

      this.successMessage = "Category updated successfully!";
    },
    clearMessage(type) {
      if (type === "successMessage") this.successMessage = null;
      if (type === "errors") this.errors = [];
    },
  },
};
</script>
